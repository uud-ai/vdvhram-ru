import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var __redisClient: Redis | undefined;
}

export function getRedis(): Redis {
  if (!global.__redisClient) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL is not configured");
    global.__redisClient = new Redis(url);
  }
  return global.__redisClient;
}
