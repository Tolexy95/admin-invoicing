import { promises as fs } from "fs";
import path from "path";

// Use /tmp folder in Vercel
const filePath =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "clients.json")
    : path.join(process.cwd(), "clients.json");

// Ensure the file exists before reading
async function ensureFileExists() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

async function readClients() {
  await ensureFileExists();
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeClients(clients) {
  await fs.writeFile(filePath, JSON.stringify(clients, null, 2), "utf-8");
}

// DELETE /api/clients/[id] - delete a client
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const clients = await readClients();
    const updatedClients = clients.filter((c) => String(c.id) !== String(id));

    await writeClients(updatedClients);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Failed to delete client:", err);
    return new Response(
      JSON.stringify({ error: "Failed to delete client" }),
      { status: 500 }
    );
  }
}
