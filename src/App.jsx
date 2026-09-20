import { useCallback, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import {
  PROTOCOL_WALLET,
  TRONSCAN_ADDRESS_URL,
  fetchProtocolSnapshot,
  formatAmount,
  formatMilestone,
  formatPercent,
  formatUsd,
} from './lib/protocol'
import './App.css'

const POLL_MS = 45_000

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    const field = document.createElement('textarea')
    field.value = value
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.left = '-9999px'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    field.remove()
    return ok
  }
}

function StatCard({ label, value, detail, loading }) {
  return (
    <section className="stat-card">
      <p className="stat-label">{label}</p>
      <p className={`stat-value${loading ? ' is-loading' : ''}`}>{loading ? '—' : value}</p>
      <p className={`stat-detail${loading ? ' is-loading' : ''}`}>{loading ? 'Fetching live TRON data' : detail}</p>
    </section>
  )
}

export default function App() {
  const [snapshot, setSnapshot] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const load = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setStatus((current) => (current === 'ready' ? 'refreshing' : 'loading'))
      setError('')
    }

    try {
      const next = await fetchProtocolSnapshot()
      setSnapshot(next)
      setStatus('ready')
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load protocol data')
      setStatus((current) => (current === 'ready' || current === 'refreshing' ? 'ready' : 'error'))
    }
  }, [])

  useEffect(() => {
    const start = window.setTimeout(() => {
      load()
    }, 0)
    const timer = window.setInterval(() => {
      load({ silent: true })
    }, POLL_MS)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
  }, [load])

  const handleCopy = async () => {
    const ok = await copyText(PROTOCOL_WALLET)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const loading = status === 'loading' && !snapshot
  const breakdown = snapshot
    ? `${formatAmount(snapshot.usdt, { maximumFractionDigits: 3 })} USDT + ${formatAmount(snapshot.trx, { maximumFractionDigits: 3 })} TRX`
    : ''

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Immutable Proof</p>
        <h1 className="title">
          Billion Dollar
          <span className="title-protocol">Protocol</span>
        </h1>
        <p className="tagline">
          One wallet. One mission. Accumulating proof of collective belief in real-time.
        </p>
      </header>

      {status === 'error' && !snapshot ? (
        <section className="stat-card error-card">
          <p className="stat-label">Live feed</p>
          <p className="stat-value">Unavailable</p>
          <p className="stat-detail">{error}</p>
          <button type="button" className="retry" onClick={() => load()}>
            Retry
          </button>
        </section>
      ) : (
        <>
          <StatCard
            label="Total Value (USD)"
            value={formatUsd(snapshot?.totalUsd)}
            detail={breakdown}
            loading={loading}
          />
          <StatCard
            label="Witnesses"
            value={snapshot ? formatAmount(snapshot.witnesses, { maximumFractionDigits: 0 }) : '—'}
            detail="Transactions"
            loading={loading}
          />
          <StatCard
            label="Next Milestone"
            value={formatMilestone(snapshot?.milestoneUsd)}
            detail={`${formatPercent(snapshot?.milestonePercent)} Complete`}
            loading={loading}
          />
        </>
      )}

      <section className="witnesses">
        <p className="stat-label">Recent Witnesses</p>
        {loading ? (
          <p className="witness-empty">Loading transactions…</p>
        ) : snapshot?.recentWitnesses.length ? (
          <ul className="witness-list">
            {snapshot.recentWitnesses.map((tx) => (
              <li key={tx.hash}>
                <a href={tx.url} target="_blank" rel="noreferrer">
                  {tx.display}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="witness-empty">No confirmed transactions yet.</p>
        )}
      </section>

      <section className="contribute">
        <p className="stat-label">Contribute</p>
        <button type="button" className="address" onClick={handleCopy}>
          <code>{PROTOCOL_WALLET}</code>
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
        <div className="qr-wrap">
          <QRCode value={PROTOCOL_WALLET} size={128} level="H" />
        </div>
        <p className="contribute-hint">Scan or copy the TRON wallet to add proof.</p>
        <a
          className="explorer-link"
          href={`${TRONSCAN_ADDRESS_URL}/${PROTOCOL_WALLET}`}
          target="_blank"
          rel="noreferrer"
        >
          View wallet on TronScan
        </a>
      </section>

      {error && snapshot ? (
        <p className="inline-error">Live refresh failed: {error}</p>
      ) : null}
    </div>
  )
}
