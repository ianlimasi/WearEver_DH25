import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, HeadObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
    });

    const listResponse = await s3Client.send(listCommand);

    // Get metadata (tags) for each image
    const images = await Promise.all(
      (listResponse.Contents || []).map(async (item) => {
        try {
          // Get object metadata
          const headCommand = new HeadObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: item.Key,
          });
          
          const headResponse = await s3Client.send(headCommand);
          const tags = headResponse.Metadata?.tags 
            ? JSON.parse(headResponse.Metadata.tags) 
            : [];

          return {
            key: item.Key,
            url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
            lastModified: item.LastModified,
            size: item.Size,
            tags,
          };
        } catch (error) {
          console.error(`Error getting metadata for ${item.Key}:`, error);
          return {
            key: item.Key,
            url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
            lastModified: item.LastModified,
            size: item.Size,
            tags: [],
          };
        }
      })
    );

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    );
  }
}