export const PROTOCOL_WALLET = 'TMEykAzpSaCbiaJWbQ3NLp5MRZC8pAvTVF'
export const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
export const TRONGRID_BASE = 'https://api.trongrid.io'
export const TRONSCAN_TX_URL = 'https://tronscan.org/#/transaction'
export const TRONSCAN_ADDRESS_URL = 'https://tronscan.org/#/address'
export const FIRST_MILESTONE_USD = 100_000
export const MILESTONES_USD = [100_000, 1_000_000, 10_000_000, 100_000_000, 1_000_000_000]

const PAGE_LIMIT = 200
const MAX_PAGES = 20

export function formatUsd(value, { compactCents = false } = {}) {
  if (!Number.isFinite(value)) return '—'
  const hasCents = !compactCents && Math.abs(value % 1) > 0.0005
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasCents || !compactCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatMilestone(value) {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatAmount(value, { maximumFractionDigits = 3 } = {}) {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value)
}

export function formatPercent(value) {
  if (!Number.isFinite(value)) return '—'
  return `${value.toFixed(2)}%`
}

export function truncateHash(hash, length = 10) {
  if (!hash) return ''
  return `${hash.slice(0, length)}...`
}

export function sunToTrx(sun) {
  return Number(sun || 0) / 1e6
}

export function parseUsdtBalance(account) {
  const tokens = account?.trc20 ?? []
  for (const entry of tokens) {
    if (entry && Object.prototype.hasOwnProperty.call(entry, USDT_CONTRACT)) {
      return Number(entry[USDT_CONTRACT]) / 1e6
    }
  }
  return 0
}

export function resolveMilestone(totalUsd) {
  const next = MILESTONES_USD.find((mark) => totalUsd < mark) ?? MILESTONES_USD[MILESTONES_USD.length - 1]
  const complete = Math.min(100, (totalUsd / next) * 100)
  return { next, complete }
}

async function fetchJson(url, { headers } = {}) {
  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }
  return response.json()
}

async function fetchTronPages(path) {
  const items = []
  const joiner = path.includes('?') ? '&' : '?'
  let url = `${TRONGRID_BASE}/v1${path}${joiner}limit=${PAGE_LIMIT}`

  for (let page = 0; page < MAX_PAGES && url; page += 1) {
    const json = await fetchJson(url)
    items.push(...(json.data ?? []))
    url = json.meta?.links?.next ?? null
  }

  return items
}

async function fetchTrxUsdPrice() {
  const sources = [
    async () => {
      const data = await fetchJson('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd')
      return Number(data?.tron?.usd)
    },
    async () => {
      const data = await fetchJson('https://api.coinbase.com/v2/prices/TRX-USD/spot')
      return Number(data?.data?.amount)
    },
    async () => {
      const data = await fetchJson('https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT')
      return Number(data.price)
    },
  ]

  const errors = []
  for (const source of sources) {
    try {
      const price = await source()
      if (Number.isFinite(price) && price > 0) return price
    } catch (error) {
      errors.push(error)
    }
  }

  throw new Error(errors[0]?.message || 'Unable to fetch TRX price')
}

/**
 * Live snapshot of the protocol wallet.
 *
 * Witnesses = confirmed TRON transactions that involve the protocol wallet
 * (the same public activity list shown on explorers). That matches the
 * screenshot: the visible "recent witness" hash is a wallet transaction,
 * and the count tracks on-chain activity rather than a random counter.
 */
export async function fetchProtocolSnapshot(address = PROTOCOL_WALLET) {
  const [accountPayload, transactions, trxPrice] = await Promise.all([
    fetchJson(`${TRONGRID_BASE}/v1/accounts/${address}`),
    fetchTronPages(`/accounts/${address}/transactions?only_confirmed=true`),
    fetchTrxUsdPrice().catch(() => null),
  ])

  const account = accountPayload.data?.[0]
  if (!account) {
    throw new Error('Protocol wallet was not found on TRON')
  }

  const usdt = parseUsdtBalance(account)
  const trx = sunToTrx(account.balance)
  const totalUsd = Number.isFinite(trxPrice) ? usdt + trx * trxPrice : null
  const milestone = resolveMilestone(totalUsd ?? 0)

  const recentWitnesses = transactions.slice(0, 8).map((tx) => {
    const hash = tx.txID
    return {
      hash,
      display: truncateHash(hash),
      url: `${TRONSCAN_TX_URL}/${hash}`,
      timestamp: tx.block_timestamp,
    }
  })

  return {
    address,
    usdt,
    trx,
    trxPrice,
    totalUsd,
    witnesses: transactions.length,
    milestoneUsd: milestone.next,
    milestonePercent: milestone.complete,
    recentWitnesses,
    fetchedAt: Date.now(),
  }
}
