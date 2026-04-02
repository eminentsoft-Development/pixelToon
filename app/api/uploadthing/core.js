import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // This name "imageUploader" must match the endpoint prop in your component
  imageUploader: f({ 
    image: { 
      maxFileSize: "4MB", 
      maxFileCount: 5 
    } 
  })
    .middleware(async ({ req }) => {
      // Logic for auth would go here
      return { userId: "test-user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId };
    }),
};