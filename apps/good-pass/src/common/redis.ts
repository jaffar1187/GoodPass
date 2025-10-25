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
export const setCache = async (
  key: string,
  value: string,
  ttlSeconds = 3600
) => {
  await redis.set(key, value, { ex: ttlSeconds }); // ✅ store as plain string
};

export const getCache = async (key: string): Promise<string | null> => {
  return await redis.get<string>(key); // ✅ return plain string
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};
