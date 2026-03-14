import { useState, useEffect } from "react"
import ServiceCard from "./components/ServiceCard"
import ArchitectureDiagram from "./components/ArchitectureDiagram"
import MetricsChart from "./components/MetricsChart"

const API_BASE = "http://localhost"

const INITIAL_SERVICES = {
  nginx:    { name: "Nginx",       type: "GATEWAY",  port: 80,   description: "Reverse proxy / entrypoint",  status: "pending" },
  api:      { name: "API Service", type: "APP",       port: 3000, description: "Node.js REST API",            status: "pending" },
  worker:   { name: "Worker",      type: "APP",       port: null, description: "Background job processor",    status: "pending" },
  redis:    { name: "Redis",       type: "CACHE",     port: 6379, description: "Cache & message queue",       status: "pending" },
  postgres: { name: "PostgreSQL",  type: "DATABASE",  port: 5432, description: "Primary relational database", status: "pending" },
}

export default function App() {
  const [services, setServices] = useState(INITIAL_SERVICES)
  const [metrics, setMetrics]   = useState([])
  const [lastPoll, setLastPoll] = useState(null)

  // Poll /status every 5s
  useEffect(() => {
    const poll = async () => {
      try {
        const res  = await fetch(`${API_BASE}/status`)
        const data = await res.json()

        setServices(prev => ({
          ...prev,
          nginx:    { ...prev.nginx,    status: "healthy" },
          api:      { ...prev.api,      status: data.services.api?.status      ?? "unhealthy" },
          worker:   { ...prev.worker,   status: "healthy" },
          redis:    { ...prev.redis,    status: data.services.redis?.status    ?? "unhealthy" },
          postgres: { ...prev.postgres, status: data.services.postgres?.status ?? "unhealthy" },
        }))

        setLastPoll(new Date().toLocaleTimeString())
      } catch {
        setServices(prev => ({
          ...prev,
          api:      { ...prev.api,      status: "unhealthy" },
          redis:    { ...prev.redis,    status: "unhealthy" },
          postgres: { ...prev.postgres, status: "unhealthy" },
        }))
      }
    }

    poll()
    const interval = setInterval(poll, 5000)
    return () => clearInterval(interval)
  }, [])

  // Poll /metrics every 2s
  useEffect(() => {
    const poll = async () => {
      try {
        const res  = await fetch(`${API_BASE}/metrics`)
        const data = await res.json()

        setMetrics(prev => [...prev.slice(-20), {
          time:     new Date().toLocaleTimeString(),
          requests: data.requests,
          uptime:   data.uptime,
        }])
      } catch {
        // mantém histórico
      }
    }

    const interval = setInterval(poll, 2000)
    return () => clearInterval(interval)
  }, [])

  const healthyCount = Object.values(services).filter(s => s.status === "healthy").length
  const totalCount   = Object.values(services).length

  const stackItems = [
    { label: "Runtime",  value: "Docker Compose"   },
    { label: "Gateway",  value: "Nginx"             },
    { label: "Backend",  value: "Node.js / Express" },
    { label: "Cache",    value: "Redis 7"            },
    { label: "Database", value: "PostgreSQL 15"      },
    { label: "Frontend", value: "React + Vite 8"    },
    { label: "Network",  value: "devops-network"    },
    { label: "Phase",    value: "01 — Foundation"   },
  ]

  return (
    <div className="dashboard">

      {/* ── Header ── */}
      <header className="dashboard-header">
        <div className="header-left">
          <div>
            <p className="dashboard-subtitle">● DevOps Platform Evolution</p>
            <h1 className="dashboard-title">M_RIBEIRO / Phase_01 — Docker Foundation</h1>
          </div>
        </div>
        <div className="header-right">
          <div className="health-summary">
            <span className={`health-count ${healthyCount === totalCount ? "all-healthy" : "partial"}`}>
              {healthyCount}/{totalCount}
            </span>
            <span className="health-label">services online</span>
          </div>
          <span className="phase-badge">SYSTEM STATUS: ACTIVE</span>
        </div>
      </header>

      <main className="dashboard-main">

        {/* 1 ── Platform Services ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Platform Services</h2>
            {lastPoll && <span className="last-poll">Last poll: {lastPoll}</span>}
          </div>
          <div className="services-grid">
            {Object.entries(services).map(([key, svc]) => (
              <ServiceCard
                key={key}
                name={svc.name}
                type={svc.type}
                port={svc.port ?? "—"}
                status={svc.status}
                description={svc.description}
              />
            ))}
          </div>
        </section>

        {/* 2 ── Architecture (horizontal, full width) ── */}
        <ArchitectureDiagram />

        {/* 3 ── Live Metrics (below architecture) ── */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Live Metrics</h2>
            <span className="polling-badge">● polling 2s</span>
          </div>
          <div className="metrics-legend">
            <span className="legend-item green">■ Requests total</span>
            <span className="legend-item blue">■ Uptime (s)</span>
          </div>
          <MetricsChart data={metrics} />
          {metrics.length === 0 && (
            <p className="empty-chart">Aguardando dados da API...</p>
          )}
        </section>

      </main>

      {/* 4 ── Infrastructure Stack — rodapé ── */}
      <footer className="stack-footer">
        {stackItems.map(item => (
          <div className="stack-footer-item" key={item.label}>
            <span className="stack-label">{item.label}</span>
            <span className="stack-value">{item.value}</span>
          </div>
        ))}
      </footer>

    </div>
  )
}
