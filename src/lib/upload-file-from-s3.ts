export const uploadFileFromS3 = async (
  url: string,
  fields: Record<string, string>,
  file: File,
) => {
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    form.append(k, v);
  });
  form.append("Content-Type", file.type);
  form.append("file", file);
  const res = await fetch(url, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Error uploading");
  }
};
