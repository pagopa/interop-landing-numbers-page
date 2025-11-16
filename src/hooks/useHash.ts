import { useCallback, useSyncExternalStore } from 'react'

function subscribe(callback: () => void): () => void {
  window.addEventListener('hashchange', callback)
  return () => {
    window.removeEventListener('hashchange', callback)
  }
}
function getHashSnapshot(): string | null {
  const hash = window.location.hash.split('#')
  return hash[hash.length - 1]
}
export function useHash(value?: string) {
  const hash = useSyncExternalStore(subscribe, getHashSnapshot) ?? value

  const setHash = useCallback((value: string) => {
    const url = window.location.href.split('#')[0]
    window.location.href = `${url}#${value}`
  }, [])
  return [hash, setHash] as const
}
