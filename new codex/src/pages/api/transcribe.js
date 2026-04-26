import { createRouter } from "next-connect";
import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler = createRouter();

async function parseFormData(req) {
  const uploadDir = path.join(process.cwd(), "uploads/audio");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      const originalExt = part.originalFilename?.split(".").pop() || "webm";
      return `${Date.now()}-${Math.random().toString(36).substring(7)}.${originalExt}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

handler.post(async (req, res) => {
  try {
    const { files } = await parseFormData(req);
    const uploadedFile = files?.file?.[0] || files?.file;

    if (!uploadedFile?.filepath) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const transcription = await openai.audio.translations.create({
      model: "whisper-1",
      file: fs.createReadStream(uploadedFile.filepath),
    });

    // Optionally store transcript to DB here

    // Clean up temp file
    fs.unlinkSync(uploadedFile.filepath);

    return res.status(200).json({ transcript: transcription.text });
  } catch (err) {
    console.error("Transcription Error:", err);
    return res.status(500).json({ error: "Failed to transcribe audio" });
  }
});

export default handler.handler(); // required for next-connect v1+
