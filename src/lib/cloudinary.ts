import { auth } from "./firebase";

export type CloudinaryUpload = {
  url: string;
  publicId: string;
};

type SignatureResponse = {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder?: string;
};

async function requestSignature(folder?: string): Promise<SignatureResponse> {
  const token = await auth?.currentUser?.getIdToken();
  const response = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ folder }),
  });

  if (!response.ok) {
    throw new Error(`Could not sign upload (${response.status}).`);
  }

  return (await response.json()) as SignatureResponse;
}

/**
 * Uploads an image through the signed Cloudflare Pages Function, then straight
 * to Cloudinary. The API secret never touches the browser.
 */
export async function uploadImage(file: File, folder = "portfolio"): Promise<CloudinaryUpload> {
  const signature = await requestSignature(folder);

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signature.apiKey);
  form.append("timestamp", String(signature.timestamp));
  form.append("signature", signature.signature);
  if (signature.folder) form.append("folder", signature.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
    { method: "POST", body: form },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Upload failed: ${detail}`);
  }

  const data = (await response.json()) as { secure_url: string; public_id: string };
  return { url: data.secure_url, publicId: data.public_id };
}
