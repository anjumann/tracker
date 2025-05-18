import Redis from 'ioredis';

// Ensure we only create one Redis instance
let redis: Redis | null = null;

export const getRedisClient = () => {
  if (!redis) {
    redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL || "redis://localhost:6379");
  }
  return redis;
};

// Helper functions for common Redis operations
export async function set(key: string, value: string) {
  const client = getRedisClient();
  return await client.set(key, value);
}

export async function get(key: string) {
  const client = getRedisClient();
  return await client.get(key);
}

export async function del(key: string) {
  const client = getRedisClient();
  return await client.del(key);
}

export async function setWithExpiry(key: string, value: string, expirySeconds: number) {
  const client = getRedisClient();
  return await client.set(key, value, 'EX', expirySeconds);
} 