interface Env {
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
  FIREBASE_WEB_API_KEY?: string;
  ALLOWED_ADMIN_EMAIL?: string;
}

type SignContext = {
  request: Request;
  env: Env;
};

type SignBody = {
  folder?: string;
};

async function sha1Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-1", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

/**
 * Verifies a Firebase ID token by asking Google's Identity Toolkit if it is
 * still valid. Only enforced when FIREBASE_WEB_API_KEY is configured.
 */
async function isAuthorized(request: Request, env: Env): Promise<boolean> {
  if (!env.FIREBASE_WEB_API_KEY) return true;

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return false;

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      },
    );
    if (!response.ok) return false;
    const data = (await response.json()) as {
      users?: Array<{ email?: string }>;
    };
    const email = data.users?.[0]?.email;
    if (!email) return false;
    if (env.ALLOWED_ADMIN_EMAIL && email !== env.ALLOWED_ADMIN_EMAIL) return false;
    return true;
  } catch {
    return false;
  }
}

export async function onRequestPost(context: SignContext): Promise<Response> {
  const { request, env } = context;

  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    return json({ error: "Cloudinary is not configured on the server." }, 500);
  }

  if (!(await isAuthorized(request, env))) {
    return json({ error: "Unauthorized" }, 401);
  }

  let body: SignBody = {};
  try {
    body = (await request.json()) as SignBody;
  } catch {
    body = {};
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = body.folder?.trim();

  const params: Record<string, string | number> = { timestamp };
  if (folder) params.folder = folder;

  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const signature = await sha1Hex(`${toSign}${env.CLOUDINARY_API_SECRET}`);

  return json({
    timestamp,
    signature,
    apiKey: env.CLOUDINARY_API_KEY,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    folder,
  });
}

export async function onRequestGet(): Promise<Response> {
  return json({ error: "Method not allowed" }, 405);
}
