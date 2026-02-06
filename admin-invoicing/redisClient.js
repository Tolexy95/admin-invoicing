import { createClient } from 'redis';

export const redis = createClient({
  url: process.env.CLIENTS_REDIS_URL,
});

redis.on('error', (err) => console.error('Redis Client Error', err));

await redis.connect();
