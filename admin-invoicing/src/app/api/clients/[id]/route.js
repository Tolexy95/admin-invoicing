import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "clients.json");

// Helper to read clients
async function readClients() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// Helper to write clients
async function writeClients(clients) {
  await fs.writeFile(filePath, JSON.stringify(clients, null, 2), "utf-8");
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    console.log("Deleting client ID:", id);

    const clients = await readClients();

    const updatedClients = clients.filter((c) => String(c.id) !== String(id));

    await writeClients(updatedClients);
    console.log("Updated JSON written successfully");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Failed to delete client:", err);
    return new Response(
      JSON.stringify({ error: "Failed to delete client" }),
      { status: 500 }
    );
  }
}
