import { isValidRequest } from "@sanity/webhook";
// import type { NextApiRequest, NextApiResponse } from "next"

// type Data = {
//   message: string
// }

const secret = process.env.SANITY_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.error("Must be a POST request");
    return res.status(401).json({ message: "Must be a POST request" });
  }

  if (!isValidRequest(req, secret)) {
    res.status(401).json({ message: "Invalid signature" });
    return;
  }

  try {
    const {
      body: { slug },
    } = req;

    await res.unstable_revalidate(`/posts/${slug}`);
    await res.unstable_revalidate("/");
    return res.json({
      message: `Revalidated post with slug "${slug}"`,
    });
  } catch (err) {
    return res.status(500).send({ message: "Error revalidating" });
  }
}
