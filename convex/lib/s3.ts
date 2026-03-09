import {
  S3Client,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
export const s3 = new S3Client({
  region: "auto",
  endpoint: "https://t3.storage.dev",
  credentials:{
     accessKeyId: process.env.AWS_ACCESS_KEY_ID?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  }
});
export async function getUploadUrl(key:string) {
const { url, fields } = await createPresignedPost(s3, {
    Bucket:"11labs",
    Key: key,
    Expires: 20,
    Conditions: [
      ["content-length-range", 0, 20 * 1024 * 1024], // 20MB HARD LIMIT
      ["starts-with", "$Content-Type", "audio/"]
    ],
  });

  return { url, fields, key };
}

