export default function ArchitectureDiagram() {
  return (
    <div className="arch-section">
      <h2 className="section-title" style={{ marginBottom: "20px" }}>Architecture</h2>
      <div className="arch-diagram-h">

        <div className="arch-node external">
          <span className="arch-icon">🌐</span>
          <span>Internet</span>
        </div>

        <span className="arch-arrow-h">→</span>

        <div className="arch-node gateway">
          <span className="arch-icon">⚡</span>
          <span>Nginx</span>
          <span className="arch-label">Reverse Proxy · :80</span>
        </div>

        <span className="arch-arrow-h">→</span>

        <div className="arch-node app">
          <span className="arch-icon">🟢</span>
          <span>API Service</span>
          <span className="arch-label">Node.js · :3000</span>
        </div>

        <span className="arch-arrow-h">→</span>

        {/* Fork vertical: Redis+Worker / Postgres */}
        <div className="arch-fork-h">
          <div className="arch-branch-h">
            <div className="arch-node infra">
              <span className="arch-icon">🔴</span>
              <span>Redis</span>
              <span className="arch-label">Cache · :6379</span>
            </div>
            <span className="arch-arrow-v">↓</span>
            <div className="arch-node app">
              <span className="arch-icon">⚙️</span>
              <span>Worker</span>
              <span className="arch-label">background</span>
            </div>
          </div>
          <div className="arch-branch-h" style={{ justifyContent: "center" }}>
            <div className="arch-node infra">
              <span className="arch-icon">🐘</span>
              <span>PostgreSQL</span>
              <span className="arch-label">Primary DB · :5432</span>
            </div>
          </div>
        </div>

      </div>

      <div className="arch-network" style={{ marginTop: "16px" }}>
        <span className="network-badge">devops-network · bridge</span>
      </div>
    </div>
  )
}
