
import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const userId = currentUser();
    if(!userId) throw new Error("Unauthorizd");
    return {
        userId :userId
    }
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({image : {maxFileSize:"4MB",maxFileCount:1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
    messageFile: f(["image","pdf"])
    .middleware(() => handleAuth() )
    .onUploadComplete(() => {})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;