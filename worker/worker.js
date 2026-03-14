// Worker service
// Runs background jobs and connects to Redis to simulate async processing

const redis = require("redis")

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
})

async function run() {

  await client.connect()

  console.log("Worker connected to Redis")

  setInterval(async () => {
    console.log("Worker heartbeat")
  }, 5000)

}

run()