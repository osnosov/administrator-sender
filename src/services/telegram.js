import { fetch } from 'undici'

const TELEGRAM_BASE_URL = 'https://api.telegram.org'

const callTelegramMethod = async (token, method, payload = {}) => {
  const res = await fetch(`${TELEGRAM_BASE_URL}/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const json = await res.json()
  return json
}

export default callTelegramMethod
