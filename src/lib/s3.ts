import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: "auto",
  endpoint: "https://t3.storage.dev",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY ?? "",
    secretAccessKey: process.env.R2_SECRET_KEY ?? "",
  },
});
export async function getUploadUrl(key: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: "audio/mpeg",
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return {
    uploadUrl: signedUrl,
  };
}
type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  contentType?: string;
};

export const uploadAudio = async ({
  contentType = "audio/wav",
  buffer,
  key,
}: UploadAudioOptions) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME ?? "",
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );
};

export const deleteAudio = async (key: string) => {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME ?? "",
      Key: key,
    }),
  );
};

export const getSignedAudioUrl = async (key: string) => {
  const cmd = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME ?? "",
    Key: key,
  });
  return getSignedUrl(s3, cmd, { expiresIn: 36000 });
};
