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

// import dotenv from 'dotenv';
// dotenv.config();
// import mongoose from "mongoose";
// import connectDB from "../lib/mongodb.js";
// import Post from "../models/Post.js";
// import { UTApi } from "uploadthing/server";

// const utapi = new UTApi(); // Ensure UPLOADTHING_SECRET is in your .env.local
// const WP_URL = "https://www.pixeltoonzacademy.com";

// async function importPosts() {

//   await connectDB();

//   try {
//     console.log("🔄 Fetching posts from WordPress...");
//     const res = await fetch(
//       `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=100&status=publish`,
//     );

//     if (!res.ok) throw new Error(`WordPress API status: ${res.status}`);

//     const wpPosts = await res.json();
//     let imported = 0;

//     for (const wpPost of wpPosts) {
//       const wpImageUrl =
//         wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
//       let finalImageUrl = "";

//       // --- NEW UPLOADTHING LOGIC ---
//       // ... inside the for loop
//       if (wpImageUrl) {
//         try {
//           console.log(`📸 Uploading image for: ${wpPost.slug}...`);

//           // UploadThing SDK returns a single object (or array)
//           const uploadResponse = await utapi.uploadFilesFromUrl(wpImageUrl);

//           // LOG THIS to your console to see the exact structure if it fails
//           // console.log('UploadThing Raw Response:', JSON.stringify(uploadResponse, null, 2));

//           if (uploadResponse && uploadResponse.data) {
//             finalImageUrl = uploadResponse.data.url;
//             console.log(`✅ UploadThing URL: ${finalImageUrl}`);
//           } else if (uploadResponse.error) {
//             console.error(
//               `❌ UploadThing Error: ${uploadResponse.error.message}`,
//             );
//             finalImageUrl = wpImageUrl; // Fallback
//           }
//         } catch (imgError) {
//           console.error(
//             `❌ Request failed for ${wpPost.slug}:`,
//             imgError.message,
//           );
//           finalImageUrl = wpImageUrl;
//         }
//       } // ------------------------------

//       const author =
//         wpPost._embedded?.author?.[0]?.name || "PixelToonz Academy";

//       await Post.findOneAndUpdate(
//         { wpId: wpPost.id },
//         {
//           wpId: wpPost.id,
//           slug: wpPost.slug,
//           title: wpPost.title.rendered,
//           content: wpPost.content.rendered, // NOTE: Content images will still point to WP
//           excerpt: wpPost.excerpt?.rendered || "",
//           featuredImage: finalImageUrl,
//           author,
//           date: new Date(wpPost.date),
//         },
//         { upsert: true, new: true },
//       );

//       imported++;
//       console.log(`🚀 Processed: ${wpPost.slug}`);
//     }

//     console.log(`\n🎉 Successfully imported ${imported} posts and images!`);
//   } catch (error) {
//     console.error("❌ Import failed:", error.message);
//   } finally {
//     await mongoose.disconnect();
//     process.exit(0);
//   }
// }

// importPosts().catch(console.error);

// import dotenv from 'dotenv';
// dotenv.config();
// const WP_URL = "https://www.pixeltoonzacademy.com";

// async function testDataFetch() {
//   try {
//     console.log("🔍 Fetching 1 post from WordPress for validation...\n");

//     // We use _embed to get featured media and author info
//     const res = await fetch(
//       `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=1&status=publish`,
//     );

//     if (!res.ok) throw new Error(`Status: ${res.status}`);

//     const posts = await res.json();
//     if (posts.length === 0) return console.log("No posts found.");

//     const post = posts[0];

//     // --- Data Extraction Logic ---
//     const data = {
//       title: post.title.rendered,
//       slug: post.slug,
//       // Mapping for your 'description' field (stripping HTML tags)
//       description: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim(),
//       content: post.content.rendered,
//       // Finding the featured image URL
//       wpImageUrl: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "No image found",
//       // SEO Fields (using Yoast data if available, otherwise fallback)
//       metaTitle: post.yoast_head_json?.title || post.title.rendered,
//       metaDescription: post.yoast_head_json?.og_description || post.yoast_head_json?.description || "No meta description",
//       canonicalUrl: post.link,
//     };

//     // --- Console Output ---
//     console.log("📊 --- DATA PREVIEW ---");
//     console.log(`📌 Title:       ${data.title}`);
//     console.log(`🔗 Slug:        ${data.slug}`);
//     console.log(`📝 Description: ${data.description.substring(0, 100)}...`);
//     console.log(`🖼️ WP Image:   ${data.wpImageUrl}`);
//     console.log(`🎯 Meta Title:  ${data.metaTitle}`);
//     console.log(`📄 Meta Desc:   ${data.metaDescription}`);
//     console.log(`🌐 Canonical:   ${data.canonicalUrl}`);
//     console.log("------------------------\n");

//     console.log("✅ Data check complete. If this looks correct, you can run the full import script.");

//   } catch (error) {
//     console.error("❌ Fetch failed:", error.message);
//   }
// }

// testDataFetch();

// import mongoose from "mongoose";
// import connectDB from "../lib/mongodb.js";
// import Blog from "../models/Blog.js"; // Ensure this matches your schema file path
// import { UTApi } from "uploadthing/server";

// const utapi = new UTApi();
// const WP_URL = "https://www.pixeltoonzacademy.com";

// async function importSinglePost() {
//   await connectDB();

//   const cleanText = (str) => {
//     return str
//       .replace(/&nbsp;/g, " ") // Remove non-breaking spaces
//       .replace(/\[&hellip;\]/g, "...") // Replace WP ellipsis
//       .replace(/<[^>]*>?/gm, "") // Strip any remaining HTML tags
//       .trim();
//   };

//   try {
//     console.log("🔄 Fetching latest post from WordPress...");
//     // Fetching only 1 post for testing
//     const res = await fetch(
//       `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=1&status=publish`,
//     );

//     if (!res.ok) throw new Error(`WordPress API status: ${res.status}`);

//     const wpPosts = await res.json();
//     if (wpPosts.length === 0) {
//       console.log("No posts found.");
//       return;
//     }

//     const wpPost = wpPosts[0];
//     const wpImageUrl =
//       wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
//     let finalImageUrl = "";

//     // 1. Handle UploadThing for the featured image
//     if (wpImageUrl) {
//       try {
//         console.log(`📸 Uploading image to UploadThing: ${wpImageUrl}`);
//         const uploadResponse = await utapi.uploadFilesFromUrl(wpImageUrl);

//         if (uploadResponse && uploadResponse.data) {
//           finalImageUrl = uploadResponse.data.url;
//           console.log(`✅ UploadThing URL: ${finalImageUrl}`);
//         } else {
//           console.error("❌ Upload failed, using fallback.");
//           finalImageUrl = wpImageUrl;
//         }
//       } catch (err) {
//         console.error("❌ Image upload error:", err.message);
//         finalImageUrl = wpImageUrl;
//       }
//     }

//     // 2. Prepare Data for your 'Blog' Schema
//     // Mapping WP fields to your specific schema fields
//     const blogData = {
//       title: wpPost.title.rendered,
//       slug: wpPost.slug,
//       description: cleanText(wpPost.excerpt.rendered),
//       content: wpPost.content.rendered,
//       images: finalImageUrl
//         ? [{ url: finalImageUrl, alt: wpPost.title.rendered }]
//         : [],
//       isPublished: true,
//       isFeatured: false,
//       isNewPost: false,
//       // SEO Mapping
//       metaTitle: wpPost.yoast_head_json?.title || wpPost.title.rendered,
//       metaDescription: wpPost.yoast_head_json?.description || "",
//       metaKeywords: "", // WP doesn't provide this by default
//       canonicalUrl: wpPost.link,
//     };

//     // 3. Save to MongoDB
//     const updatedBlog = await Blog.findOneAndUpdate(
//       { slug: blogData.slug },
//       blogData,
//       { upsert: true, new: true },
//     );

//     console.log(`\n🎉 Successfully imported: "${updatedBlog.title}"`);
//     console.log(`🔗 DB ID: ${updatedBlog._id}`);
//   } catch (error) {
//     console.error("❌ Import failed:", error.message);
//   } finally {
//     await mongoose.disconnect();
//     process.exit(0);
//   }
// }

// importSinglePost();


import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import connectDB from "../lib/mongodb.js";
import Blog from "../models/Blog.js";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
const WP_URL = "https://www.pixeltoonzacademy.com";

// Helper to prevent rate limiting (waits 500ms between uploads)
const delay = (ms) => new Promise(res => setTimeout(res, ms));



async function importAllPosts() {
  await connectDB();

  const cleanText = (str) => {
    if (!str) return "";
    return str
      .replace(/&nbsp;/g, " ")
      .replace(/\[&hellip;\]/g, "...")
      .replace(/<[^>]*>?/gm, "")
      .trim();
  };

  try {
    let page = 1;
    let hasMore = true;
    let totalImported = 0;

    console.log("🚀 Starting Full Migration (Oldest to Newest)...");

    while (hasMore) {
      console.log(`\n📄 Fetching Page ${page}...`);
      
      // ADDED: orderby=date&order=asc 
      // This ensures newest blogs are at the end of the process
      const res = await fetch(
        `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=${page}&status=publish&orderby=date&order=asc`
      );

      if (!res.ok) {
        if (res.status === 400) {
          hasMore = false;
          break;
        }
        throw new Error(`WordPress API status: ${res.status}`);
      }

      const wpPosts = await res.json();
      
      if (wpPosts.length === 0) {
        hasMore = false;
        break;
      }

      for (const wpPost of wpPosts) {
        console.log(`📦 [${totalImported + 1}] Processing: ${wpPost.slug}`);

        const wpImageUrl = wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
        let finalImageUrl = "";

        if (wpImageUrl) {
          try {
            const uploadResponse = await utapi.uploadFilesFromUrl(wpImageUrl);
            if (uploadResponse && uploadResponse.data) {
              finalImageUrl = uploadResponse.data.url;
            } else {
              finalImageUrl = wpImageUrl; 
            }
          } catch (err) {
            console.error(`   ❌ Image Upload Failed:`, err.message);
            finalImageUrl = wpImageUrl;
          }
          await delay(300);
        }

        const excerptClean = cleanText(wpPost.excerpt.rendered);
        
        const blogData = {
          title: wpPost.title.rendered,
          slug: wpPost.slug,
          description: excerptClean,
          content: wpPost.content.rendered,
          images: finalImageUrl ? [{ url: finalImageUrl, alt: wpPost.title.rendered }] : [],
          isPublished: true,
          isFeatured: false,
          isNewPost: false,
          // CRITICAL: Save the actual WP date
          createdAt: new Date(wpPost.date), 
          metaTitle: wpPost.yoast_head_json?.title || wpPost.title.rendered,
          metaDescription: wpPost.yoast_head_json?.description || excerptClean.substring(0, 160),
          metaKeywords: "",
          canonicalUrl: wpPost.link,
        };

        await Blog.findOneAndUpdate(
          { slug: blogData.slug },
          blogData,
          { upsert: true, new: true }
        );

        totalImported++;
      }

      const totalPages = parseInt(res.headers.get("X-WP-TotalPages"));
      if (page >= totalPages) {
        hasMore = false;
      } else {
        page++;
      }
    }

    console.log(`\n🎉 SUCCESS! Newest blogs were processed last.`);

  } catch (error) {
    console.error("\n❌ FATAL ERROR:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

importAllPosts();