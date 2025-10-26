import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "my-fashion-images";

export async function POST(req: NextRequest) {
  const { fileName, fileType } = await req.json();

  if (!fileName || !fileType) {
    return NextResponse.json({ error: "Missing fileName or fileType" }, { status: 400 });
  }

  // Generate presigned URL
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
  });

  // @ts-ignore Presigned URL requires @aws-sdk/s3-request-presigner
  import("@aws-sdk/s3-request-presigner").then(({ getSignedUrl }) => getSignedUrl(s3, command, { expiresIn: 300 }));

  const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return NextResponse.json({ uploadUrl });
}
