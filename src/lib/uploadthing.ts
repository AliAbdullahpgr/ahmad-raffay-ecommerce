import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);

      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      return { url: file.ufsUrl, key: file.key };
    }),

  categoryImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);

      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Category image upload complete:", file.ufsUrl);

      return { url: file.ufsUrl, key: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
