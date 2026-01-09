import { Redis } from "@upstash/redis";

function redisClientSingleton() {
  const upstash_redis_url = process.env.UPSTASH_REDIS_REST_URL;
  const upstash_redis_rest_token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!upstash_redis_url || !upstash_redis_rest_token) {
    throw new Error(
      "Error from redisClientSingleton :: redist url/token not available"
    );
  }
  return new Redis({
    url: upstash_redis_url,
    token: upstash_redis_rest_token,
  });
}

type RedistClientSingleton = ReturnType<typeof redisClientSingleton>;

const globalForRedis = globalThis as unknown as {
  redis: RedistClientSingleton;
};

export const redis = globalForRedis.redis ?? redisClientSingleton();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
