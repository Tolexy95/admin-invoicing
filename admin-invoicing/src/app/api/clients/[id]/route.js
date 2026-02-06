import { readClients, writeClients } from '../redisHelpers';


// DELETE /api/clients/[id]
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const clients = await readClients();
    const updatedClients = clients.filter((c) => String(c.id) !== String(id));

    await writeClients(updatedClients);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Failed to delete client:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to delete client' }),
      { status: 500 }
    );
  }
}
