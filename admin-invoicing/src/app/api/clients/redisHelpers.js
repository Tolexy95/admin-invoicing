import { redis } from '../../../../redisClient';

export async function readClients() {
  const data = await redis.get('clients');
  console.log('readClients called, raw Redis data:', data); // log raw data
  return data ? JSON.parse(data) : [];
}

export async function writeClients(clients) {
  console.log('writeClients called, data to write:', clients);
  await redis.set('clients', JSON.stringify(clients));
}
