export async function hashPin(pin) {
  const data = new TextEncoder().encode(pin)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPin(pin, storedHash) {
  const hash = await hashPin(pin)
  return hash === storedHash
}
