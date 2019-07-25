async function test() {
  const Redis = require("ioredis");

  const redis = new Redis(6379, "39.108.50.69");

  const keys = await redis.keys("*");

  keys.forEach(async (key) => {
      const value = await redis.get(key);
      console.log(value);
  });
}

test();
