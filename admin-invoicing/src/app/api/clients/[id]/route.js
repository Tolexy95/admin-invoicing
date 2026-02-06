import { readClients, writeClients } from '../redisHelpers';

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    console.log('DELETE called for ID:', id); // log the requested ID

    const clients = await readClients();
    console.log('Clients before delete:', clients.map(c => c.id));

    const updatedClients = clients.filter((c) => String(c.id) !== String(id));
    console.log('Clients after delete filter:', updatedClients.map(c => c.id));

    await writeClients(updatedClients);
    console.log('Updated clients written to Redis');

    // Optional: verify Redis directly
    const verify = await readClients();
    console.log('Clients in Redis after write:', verify.map(c => c.id));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Failed to delete client:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to delete client' }),
      { status: 500 }
    );
  }
}
