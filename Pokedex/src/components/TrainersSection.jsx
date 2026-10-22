import { getSpriteUrl, getTypeColor } from '../utils/pokemon.js'
import trainersData from '../data/trainers-data.json'
import './TrainersSection.css'

/**
 * Seção de treinadores (líderes de ginásio de Kanto), suas insígnias e os
 * Pokémon de cada um. Os Pokémon são resolvidos a partir da lista completa
 * pelos ids em trainers-data.json e, ao clicar, abrem o modal de detalhes.
 *
 * Props:
 * - allPokemon: lista completa de Pokémon
 * - onSelectPokemon: callback(pokemon) para abrir o modal de detalhes
 */
function TrainersSection({ allPokemon, onSelectPokemon }) {
  const pokemonById = new Map((allPokemon ?? []).map((p) => [p.id, p]))

  return (
    <section className="trainers-section" aria-label="Treinadores e insígnias">
      <h2 className="trainers-title">Treinadores &amp; Insígnias</h2>
      <p className="trainers-subtitle">
        Os líderes de ginásio de Kanto e seus Pokémon de confiança.
      </p>

      <div className="trainers-grid">
        {trainersData.trainers.map((trainer) => (
          <article className="trainer-card" key={trainer.id}>
            <header className="trainer-head">
              <div>
                <h3 className="trainer-name">{trainer.name}</h3>
                <span className="trainer-city">{trainer.city}</span>
              </div>
              <span
                className="trainer-badge"
                title={trainer.badge.name}
                style={{ backgroundColor: trainer.badge.color }}
              >
                ★
              </span>
            </header>

            <div className="trainer-meta">
              <span
                className="trainer-type"
                style={{ backgroundColor: getTypeColor(trainer.specialtyType) }}
              >
                {trainer.specialtyType}
              </span>
              <span className="trainer-role">{trainer.role}</span>
            </div>

            <p className="trainer-badge-name">{trainer.badge.name}</p>

            <div className="trainer-team">
              {trainer.pokemonIds.map((pid) => {
                const poke = pokemonById.get(pid)
                if (!poke) return null
                return (
                  <button
                    type="button"
                    key={pid}
                    className="team-member"
                    title={poke.name}
                    onClick={() => onSelectPokemon?.(poke)}
                  >
                    <img src={getSpriteUrl(pid)} alt={poke.name} loading="lazy" />
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrainersSection
