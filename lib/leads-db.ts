import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export interface Lead {
  id: string;
  name: string;
  email: string;
  answers: Record<string, string>;
  profile?: string;
  createdAt: string;
  ip?: string;
  consent: boolean;
  emailsSent?: string[];
}

interface EncryptedData {
  iv: string;
  data: string;
  tag: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.enc.json");
const ALGORITHM = "aes-256-gcm";

function getEncryptionKey(): Buffer {
  const key = process.env.LEADS_ENCRYPTION_KEY;
  if (!key || key === "gere_uma_chave_segura_de_32_chars!") {
    // Fallback: use a derived key from a default (for dev only)
    console.warn("[leads-db] LEADS_ENCRYPTION_KEY not configured. Using dev fallback.");
    return crypto.scryptSync("bstore-dev-key-not-for-production", "salt", 32);
  }
  // Ensure key is exactly 32 bytes
  return crypto.scryptSync(key, "bstore-salt-2024", 32);
}

function encrypt(text: string): EncryptedData {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    data: encrypted,
    tag: tag.toString("hex"),
  };
}

function decrypt(encData: EncryptedData): string {
  const key = getEncryptionKey();
  const iv = Buffer.from(encData.iv, "hex");
  const tag = Buffer.from(encData.tag, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encData.data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }

  // Create .gitignore in data dir to prevent accidental commits
  const gitignorePath = path.join(DATA_DIR, ".gitignore");
  try {
    await fs.access(gitignorePath);
  } catch {
    await fs.writeFile(gitignorePath, "*\n!.gitignore\n", "utf8");
  }
}

async function readLeads(): Promise<Lead[]> {
  try {
    const content = await fs.readFile(LEADS_FILE, "utf8");
    const encData: EncryptedData = JSON.parse(content);
    const decrypted = decrypt(encData);
    return JSON.parse(decrypted);
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  await ensureDataDir();
  const json = JSON.stringify(leads, null, 2);
  const encData = encrypt(json);
  await fs.writeFile(LEADS_FILE, JSON.stringify(encData), "utf8");
}

export async function saveLead(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const leads = await readLeads();

  // Check for duplicate email (update if exists)
  const existingIndex = leads.findIndex(
    (l) => l.email.toLowerCase() === lead.email.toLowerCase()
  );

  const newLead: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...lead,
  };

  if (existingIndex >= 0) {
    // Update existing lead with new quiz answers
    leads[existingIndex] = {
      ...leads[existingIndex],
      ...lead,
      createdAt: leads[existingIndex].createdAt, // keep original date
    };
  } else {
    leads.push(newLead);
  }

  await writeLeads(leads);
  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  return readLeads();
}

export async function getLeadsCount(): Promise<number> {
  const leads = await readLeads();
  return leads.length;
}
