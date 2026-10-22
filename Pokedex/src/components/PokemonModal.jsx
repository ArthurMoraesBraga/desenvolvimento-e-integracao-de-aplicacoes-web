import { useEffect } from 'react'
import {
  getArtworkUrl,
  getSpriteUrl,
  getTypeColor,
  STAT_LABELS,
  MAX_STAT,
  formatDexNumber,
  getTotalStats,
  getRelatedPokemon,
} from '../utils/pokemon.js'
import './PokemonModal.css'

/**
 * Modal com os detalhes de um Pokémon: arte, tipos, stats com barras e
 * uma faixa de Pokémon relacionados (clicáveis para navegar entre eles).
 *
 * Props:
 * - pokemon: objeto do Pokémon selecionado (ou null/undefined => não renderiza)
 * - allPokemon: lista completa, usada para calcular os relacionados
 * - onClose: callback para fechar o modal
 * - onSelect: callback(pokemon) para abrir outro Pokémon a partir dos relacionados
 */
function PokemonModal({ pokemon, allPokemon, onClose, onSelect }) {
  // Fecha com a tecla Esc e trava o scroll do fundo enquanto aberto.
  useEffect(() => {
    if (!pokemon) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [pokemon, onClose])

  if (!pokemon) return null

  const related = getRelatedPokemon(pokemon, allPokemon ?? [])
  const total = getTotalStats(pokemon)
  const mainColor = getTypeColor(pokemon.types[0]?.name)

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes de ${pokemon.name}`}
      onClick={onClose}
    >
      {/* stopPropagation para que cliques dentro do card não fechem o modal */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          aria-label="Fechar"
          onClick={onClose}
        >
          ×
        </button>

        <header
          className="modal-header"
          style={{ background: `linear-gradient(160deg, ${mainColor}, #ffffff00)` }}
        >
          <span className="modal-dex">{formatDexNumber(pokemon.id)}</span>
          <img
            className="modal-artwork"
            src={getArtworkUrl(pokemon.id)}
            alt={pokemon.name}
            onError={(e) => {
              // Fallback para o sprite pequeno se a arte oficial não existir.
              e.currentTarget.src = getSpriteUrl(pokemon.id)
            }}
          />
          <h2 className="modal-name">{pokemon.name}</h2>
          <ul className="modal-types">
            {pokemon.types.map((type) => (
              <li
                key={type.id}
                className="type-badge"
                style={{ backgroundColor: getTypeColor(type.name) }}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </header>

        <section className="modal-stats" aria-label="Estatísticas base">
          <h3>Estatísticas base</h3>
          {Object.entries(pokemon.stats).map(([key, value]) => (
            <div className="stat-row" key={key}>
              <span className="stat-label">{STAT_LABELS[key] ?? key}</span>
              <span className="stat-value">{value}</span>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${(value / MAX_STAT) * 100}%`,
                    backgroundColor: mainColor,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="stat-total">
            <span>Total</span>
            <strong>{total}</strong>
          </div>
        </section>

        {related.length > 0 && (
          <section className="modal-related" aria-label="Pokémon relacionados">
            <h3>Pokémon relacionados</h3>
            <div className="related-grid">
              {related.map((rel) => (
                <button
                  type="button"
                  key={rel.id}
                  className="related-card"
                  onClick={() => onSelect?.(rel)}
                >
                  <img
                    src={getSpriteUrl(rel.id)}
                    alt={rel.name}
                    loading="lazy"
                  />
                  <span>{rel.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default PokemonModal
