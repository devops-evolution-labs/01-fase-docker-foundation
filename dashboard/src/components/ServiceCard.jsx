export default function ServiceCard({ name, type, port, status, description }) {
  const isHealthy = status === "healthy"
  const isPending = status === "pending"

  return (
    <div className={`service-card ${isHealthy ? "healthy" : isPending ? "pending" : "unhealthy"}`}>
      <div className="service-card-header">
        <span className="service-type">{type}</span>
        <span className={`status-dot ${isHealthy ? "dot-healthy" : isPending ? "dot-pending" : "dot-unhealthy"}`} />
      </div>
      <div className="service-name">{name}</div>
      <div className="service-description">{description}</div>
      <div className="service-port">:{port}</div>
    </div>
  )
}
