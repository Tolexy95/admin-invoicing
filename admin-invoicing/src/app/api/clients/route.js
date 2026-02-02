import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const filePath = path.join(process.cwd(), "clients.json");

// Helper to read clients from the JSON file
async function readClients() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// Helper to write clients to the JSON file
async function writeClients(clients) {
  await fs.writeFile(filePath, JSON.stringify(clients, null, 2));
}

// GET /api/clients - fetch all clients
export async function GET() {
  try {
    const clients = await readClients();
    return new Response(JSON.stringify(clients), { status: 200 });
  } catch (err) {
    console.error("Failed to fetch clients:", err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

// POST /api/clients - create a new client
export async function POST(req) {
  try {
    const newClient = await req.json();
    const clients = await readClients();

    // Assign a unique ID using nanoid
    const clientWithId = {
      ...newClient,
      id: nanoid(),
      createdAt: newClient.createdAt || new Date().toISOString(),
    };

    clients.unshift(clientWithId); // keep newest first
    await writeClients(clients);

    return new Response(JSON.stringify(clientWithId), { status: 201 });
  } catch (err) {
    console.error("Failed to create client:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create client" }),
      { status: 500 }
    );
  }
}

// PUT /api/clients - update an existing client
export async function PUT(req) {
  try {
    const updatedData = await req.json();
    const clients = await readClients();

    const updatedClients = clients.map((c) =>
      c.id === updatedData.id ? updatedData : c
    );

    await writeClients(updatedClients);

    return new Response(JSON.stringify(updatedData), { status: 200 });
  } catch (err) {
    console.error("Failed to update client:", err);
    return new Response(
      JSON.stringify({ error: "Failed to update client" }),
      { status: 500 }
    );
  }
}

// DELETE /api/clients - delete a client
export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    if (!id) throw new Error("Missing client ID");

    const clients = await readClients();
    const updatedClients = clients.filter((c) => c.id !== id);

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
