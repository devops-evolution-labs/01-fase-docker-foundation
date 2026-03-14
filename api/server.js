const express = require("express")
const redis = require("redis")
const { Pool } = require("pg")

const app = express()

// CORS — permite que o dashboard (porta 5173) acesse a API via nginx (porta 80)
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET")
  next()
})

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
})

redisClient.connect().catch(() => {})

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: "devops",
  password: "devops",
  database: "appdb",
  port: 5432
})

// Contador de requests para métricas reais
let requestCount = 0
app.use((_req, _res, next) => {
  requestCount++
  next()
})

app.get("/", (_req, res) => {
  res.json({ service: "DevOps Evolution Platform API", phase: "01", version: "1.0.0" })
})

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.get("/redis", async (req, res) => {
  await redisClient.set("message", "hello from redis")
  const value = await redisClient.get("message")
  res.json({ redis: value })
})

app.get("/db", async (req, res) => {
  const result = await pool.query("SELECT NOW()")
  res.json({ time: result.rows[0] })
})

// Endpoint agregado de status de todos os serviços — usado pelo dashboard
app.get("/status", async (_req, res) => {
  const services = {}

  // API
  services.api = { name: "API Service", status: "healthy", port: 3000 }

  // Redis
  try {
    await redisClient.ping()
    services.redis = { name: "Redis", status: "healthy", port: 6379 }
  } catch {
    services.redis = { name: "Redis", status: "unhealthy", port: 6379 }
  }

  // PostgreSQL
  try {
    await pool.query("SELECT 1")
    services.postgres = { name: "PostgreSQL", status: "healthy", port: 5432 }
  } catch {
    services.postgres = { name: "PostgreSQL", status: "unhealthy", port: 5432 }
  }

  res.json({
    services,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  })
})

// Métricas da plataforma — requests reais + estado dos serviços
app.get("/metrics", async (req, res) => {
  let redisStatus = "connected"
  let dbStatus = "connected"

  try { await redisClient.ping() } catch { redisStatus = "disconnected" }
  try { await pool.query("SELECT 1") } catch { dbStatus = "disconnected" }

  res.json({
    requests: requestCount,
    uptime: Math.floor(process.uptime()),
    workers: 1,
    cache: redisStatus,
    database: dbStatus,
    timestamp: new Date().toISOString()
  })
})

app.listen(3000, () => {
  console.log("API running on port 3000")
})
