import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from '../services/favorites'

/**
 * Hook que carrega e gerencia os favoritos no Supabase.
 * Mantém um Set de ids para checagem rápida e expõe um toggle otimista
 * (atualiza a UI na hora e desfaz caso o Supabase retorne erro).
 */
export default function useFavorites() {
  const [ids, setIds] = useState(() => new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchFavorites()
      setIds(new Set(rows.map((r) => r.pokemon_id)))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Dispara o carregamento inicial de forma assíncrona, sem chamar
    // setState de forma síncrona no corpo do efeito.
    let active = true
    ;(async () => {
      if (active) await load()
    })()
    return () => {
      active = false
    }
  }, [load])

  const isFavorite = useCallback((id) => ids.has(id), [ids])

  const toggleFavorite = useCallback(
    async (pokemon) => {
      const wasFavorite = ids.has(pokemon.id)

      // Atualização otimista.
      setIds((prev) => {
        const next = new Set(prev)
        if (wasFavorite) next.delete(pokemon.id)
        else next.add(pokemon.id)
        return next
      })

      try {
        if (wasFavorite) await removeFavorite(pokemon.id)
        else await addFavorite(pokemon)
      } catch (err) {
        // Reverte em caso de falha.
        setIds((prev) => {
          const next = new Set(prev)
          if (wasFavorite) next.add(pokemon.id)
          else next.delete(pokemon.id)
          return next
        })
        setError(err)
      }
    },
    [ids]
  )

  return useMemo(
    () => ({ ids, isFavorite, toggleFavorite, loading, error, reload: load }),
    [ids, isFavorite, toggleFavorite, loading, error, load]
  )
}
