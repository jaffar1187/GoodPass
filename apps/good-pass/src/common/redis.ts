import { Redis } from "@upstash/redis";
import * as dotenv from "dotenv";

// ✅ Load .env (for standalone use outside Nest DI)
dotenv.config();

// ✅ Initialize Redis instance
export const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

// ✅ Optional helper functions (reusable anywhere)
export const setCache = async (key: string, value: any, ttlSeconds = 3600) => {
  await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
};

export const getCache = async <T = any>(key: string): Promise<T | null> => {
  const data = await redis.get<string>(key);
  return data ? JSON.parse(data) : null;
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};
