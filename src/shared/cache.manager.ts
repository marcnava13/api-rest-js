import { createClient, type RedisClientType } from "redis";
import { Injectable } from "./decorators";

abstract class CacheManager {
  abstract createConnection: () => Promise<void>;
  abstract close: () => Promise<void>;
  abstract clean: () => Promise<void>;
  abstract isHealthy: () => Promise<boolean>;
  abstract get: (key: string) => Promise<string | null>;
  abstract set: (
    key: string,
    value: string,
    options?: { expirationMs?: number }
  ) => Promise<void>;
}

@Injectable("RedisCacheManager")
export class RedisCacheManager implements CacheManager {
  private readonly client: RedisClientType;
  private readonly url: string;

  constructor(url: string = "redis://localhost:6379") {
    this.client = createClient({ url });
    this.url = url;
  }

  async createConnection(): Promise<void> {
    if (this.client.isReady) return;

    await this.client.connect();
  }

  async close(): Promise<void> {
    if (!this.client.isReady) return;

    await this.client.quit();
  }

  async clean(): Promise<void> {
    await this.createConnection();
    await this.client.flushAll();
    await this.close();
  }

  async isHealthy(): Promise<boolean> {
    try {
      if (!this.client.isReady) {
        await this.createConnection();
      }

      await this.client.ping();

      return true;
    } catch (err) {
      return false;
    }
  }

  async get(key: string): Promise<string | null> {
    await this.createConnection();

    let result = await this.client.get(key);

    if (!result) return null;

    try {
      result = JSON.parse(result);
    } catch (err) {
      // silent error
    }

    await this.close();
    return result;
  }

  async set(
    key: string,
    value: string | object,
    options: { expirationMs?: number } = { expirationMs: 5000 }
  ): Promise<void> {
    await this.createConnection();

    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);

    await this.client.set(key, valueToStore, {
      PX: options.expirationMs,
    });

    await this.close();
  }
}
