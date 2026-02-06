import { redis } from '../../../../redisClient';

export async function readClients() {
  const data = await redis.get('clients');
  return data ? JSON.parse(data) : [];
}

export async function writeClients(clients) {
  await redis.set('clients', JSON.stringify(clients));
}
