## Inspiration  
We’ve all heard the story of Cinderella – she almost missed the ball because her dress was ruined, until her fairy godmother came to the rescue. Haven’t we all had that moment too? When you’re just missing the right outfit for a party, a meeting, or an event?  

That story inspired us to create **WearEver** – a fairytale-themed clothing exchange platform that lets college students trade clothes for free. Users can find the pieces they need while passing on clothes they no longer wear, keeping fashion sustainable and accessible. Each account must use a verified `.edu` email, and all exchanges happen on campus for safety and convenience. By swapping instead of buying, students save money, reduce waste, and build community – turning closets into treasure chests of creativity.  

## What it does  
**WearEver** allows college students to upload their clothing items, browse others’ closets, and trade clothes without money. Our **AI Outfit Matcher**, powered by **AWS Bedrock**, identifies each item’s visual style (like *cottagecore*, *streetwear*, or *minimalist*) to connect users with similar aesthetics. Think of it as *Shazam + Depop*, but cashless and guided by an AI “fairy godmother.”  

The platform brings a touch of magic to sustainability through features like a swipeable “closet carousel,” campus-safe meetups, and notifications for new likes, trade requests, or confirmed exchanges. Every trade feels like discovering a hidden gem in an enchanted wardrobe.  

## How we built it  
We built **WearEver** using **Next.js** for structure and interface design, and **custom CSS modules** for a clean, flexible, fairytale-inspired look.  

- **AI Outfit Matcher:** Built with **AWS Bedrock**, it extracts visual tags (color, fabric, aesthetic style) from uploaded outfit images. These tags help the AI recommend matching clothes or styles users might like.  
- **Clothing Upload System:** Users upload photos, categories, and style tags. The AI can auto-tag new uploads for consistency and accuracy.  
- **Trading System:** Users can propose trades, confirm meetups at safe campus locations, and receive notifications when trades are accepted.  
- **Backend:** We integrated **Supabase** for authentication and database management to handle users, items, and trade records efficiently.  

## Challenges we ran into  
Our biggest challenge was learning to navigate AWS products. Setting up **Bedrock**, **DynamoDB**, and **S3** was difficult for a team new to the ecosystem. We spent a lot of time experimenting with AI models to get reliable and stylistically accurate tags from uploaded clothing images.  

Since our backend team was unfamiliar with AWS S3, we switched to **Supabase** for storage and authentication to speed up progress. Balancing the fairytale-themed UI with technical features also required careful coordination between design and development.  

## Accomplishments that we're proud of  
We’re proud of creating a working prototype that combines AI style recognition with a functional trading system. Our **AI Outfit Matcher** can successfully detect visual themes and aesthetics from user uploads, and our design captures the playful, magical energy of our concept.  

We also began integrating a **reward system** inspired by Visa’s “Play, Pay, Repeat: Reinventing Childhood Joy with Modern Payments” challenge, turning clothing exchange into a gamified, nostalgic experience.  

## What we learned  
We learned how to integrate **AI image recognition** into a modern web app and how **AWS Bedrock’s** generative capabilities can classify visual aesthetics. We deepened our understanding of authentication, database linking, and the balance between creative UI and robust backend design.  

Most importantly, we learned the power of collaboration — blending technical problem-solving, artistic design, and storytelling to create something that feels human and meaningful.  

## What’s next for WearEver – wear ever, whenever, wear whatever  
We aim to expand **WearEver** beyond the University of Washington to students nationwide, with stronger email domain authentication and optional ID verification for added security.  

### Upcoming and Future Features  
- **Borrowing & Lending:** Users will be able to lend clothes temporarily instead of permanent trades.  
- **Reward & Cashout System:** Each successful trade earns **ClothCoins**, digital tokens representing sustainability and generosity. Users can also earn ClothCoins by watching short ads. Once they reach a threshold, they can cash out via **Visa APIs** into a virtual prepaid card or wallet (using Visa sandbox APIs).  
- **Gamification:** Users level up with badges like “Eco Hero” and “Campus Stylist,” and unlock limited-edition avatar items and themes.  
- **Fairy Godmother AI Assistant:** A generative AI that guides users through trades, offers encouragement (“Your dream dress is just a trade away!”), and celebrates milestones.  
- **Security & Verification:** Accounts will require verified `.edu` emails and legal-name verification, and trades will be limited to safe campus zones to ensure trust and safety.  

### The Bigger Vision  
**WearEver** celebrates sustainability, creativity, and community through fashion. Our dream is to make outfit-sharing as easy and magical as borrowing a dress from a fairy godmother — because with WearEver, you can wear ever, whenever, wear whatever.
