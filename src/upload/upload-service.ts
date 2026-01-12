import cloudinary from ".././lib/cloudinary.js";

export async function uploadImageService(file: File) {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise<{
    url: string;
    public_id: string;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "photos" },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      )
      .end(bytes);
  });
}
