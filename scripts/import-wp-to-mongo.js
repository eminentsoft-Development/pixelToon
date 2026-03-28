// import 'dotenv/config';
// import mongoose from 'mongoose';
// import connectDB from '../lib/mongodb.js';
// import Post from '../models/Post.js';

// const WP_URL = 'https://www.pixeltoonzacademy.com';

// async function importPosts() {
//   await connectDB();

//   try {
//     console.log('🔄 Fetching posts from WordPress...');

//     const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=100&status=publish`);

//     if (!res.ok) {
//       throw new Error(`WordPress API returned status: ${res.status}`);
//     }

//     const wpPosts = await res.json();
//     let imported = 0;

//     for (const wpPost of wpPosts) {
//       const featuredImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
//       const author = wpPost._embedded?.author?.[0]?.name || 'PixelToonz Academy';

//       await Post.findOneAndUpdate(
//         { wpId: wpPost.id },
//         {
//           wpId: wpPost.id,
//           slug: wpPost.slug,
//           title: wpPost.title.rendered,
//           content: wpPost.content.rendered,
//           excerpt: wpPost.excerpt?.rendered || '',
//           featuredImage,
//           author,
//           date: new Date(wpPost.date),
//         },
//         { upsert: true, new: true }
//       );

//       imported++;
//       console.log(`✅ Imported: ${wpPost.slug}`);
//     }

//     console.log(`\n🎉 Successfully imported ${imported} posts into MongoDB!`);

//   } catch (error) {
//     console.error('❌ Import failed:', error.message);
//   } finally {
//     await mongoose.disconnect();
//     console.log('✅ Disconnected from MongoDB.');
//     process.exit(0);
//   }
// }

// importPosts().catch(console.error);


import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import connectDB from "../lib/mongodb.js";
import Post from "../models/Post.js";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi(); // Ensure UPLOADTHING_SECRET is in your .env.local
const WP_URL = "https://www.pixeltoonzacademy.com";

async function importPosts() {
  
  await connectDB();

  try {
    console.log("🔄 Fetching posts from WordPress...");
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=100&status=publish`,
    );

    if (!res.ok) throw new Error(`WordPress API status: ${res.status}`);

    const wpPosts = await res.json();
    let imported = 0;

    for (const wpPost of wpPosts) {
      const wpImageUrl =
        wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
      let finalImageUrl = "";

      // --- NEW UPLOADTHING LOGIC ---
      // ... inside the for loop
      if (wpImageUrl) {
        try {
          console.log(`📸 Uploading image for: ${wpPost.slug}...`);

          // UploadThing SDK returns a single object (or array)
          const uploadResponse = await utapi.uploadFilesFromUrl(wpImageUrl);

          // LOG THIS to your console to see the exact structure if it fails
          // console.log('UploadThing Raw Response:', JSON.stringify(uploadResponse, null, 2));

          if (uploadResponse && uploadResponse.data) {
            finalImageUrl = uploadResponse.data.url;
            console.log(`✅ UploadThing URL: ${finalImageUrl}`);
          } else if (uploadResponse.error) {
            console.error(
              `❌ UploadThing Error: ${uploadResponse.error.message}`,
            );
            finalImageUrl = wpImageUrl; // Fallback
          }
        } catch (imgError) {
          console.error(
            `❌ Request failed for ${wpPost.slug}:`,
            imgError.message,
          );
          finalImageUrl = wpImageUrl;
        }
      } // ------------------------------

      const author =
        wpPost._embedded?.author?.[0]?.name || "PixelToonz Academy";

      await Post.findOneAndUpdate(
        { wpId: wpPost.id },
        {
          wpId: wpPost.id,
          slug: wpPost.slug,
          title: wpPost.title.rendered,
          content: wpPost.content.rendered, // NOTE: Content images will still point to WP
          excerpt: wpPost.excerpt?.rendered || "",
          featuredImage: finalImageUrl,
          author,
          date: new Date(wpPost.date),
        },
        { upsert: true, new: true },
      );

      imported++;
      console.log(`🚀 Processed: ${wpPost.slug}`);
    }

    console.log(`\n🎉 Successfully imported ${imported} posts and images!`);
  } catch (error) {
    console.error("❌ Import failed:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

importPosts().catch(console.error);
