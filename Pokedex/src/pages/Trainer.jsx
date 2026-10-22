    import data from '../data/pokedex-data.json'
    import { TypeBadge, pokemonImage } from '../components/PokemonCard'
    import './Trainer.css'

    const trainers = data.trainers ?? []
    const byId = new Map(data.pokemon.map((p) => [p.id, p]))
    const byName = new Map(data.pokemon.map((p) => [p.name.toLowerCase(), p]))

    // --- ajuste aqui se o JSON usar outros nomes de campo ---
    function getBadges(trainer) {
    const b = trainer.badges ?? trainer.badgeCount ?? trainer.insignias ?? 0
    return Array.isArray(b) ? b.length : b
    }

    function findPokemon(item) {
    if (item && typeof item === 'object') {
        return (
        byId.get(Number(item.pokemonId ?? item.id)) ??
        byName.get(String(item.name ?? '').toLowerCase())
        )
    }
    return byId.get(Number(item)) ?? byName.get(String(item).toLowerCase())
    }

    function getTeam(trainer) {
    const raw =
        trainer.pokemon ?? trainer.pokemons ?? trainer.pokemonIds ?? trainer.team
    if (raw) return raw.map(findPokemon).filter(Boolean)

    // relação em lista separada (trainerId -> pokemonId)
    const rel =
        data.trainerPokemon ?? data.trainer_pokemon ?? data.relations ?? []
    return rel
        .filter((r) => r.trainerId === trainer.id)
        .map((r) => findPokemon(r.pokemonId ?? r.pokemon))
        .filter(Boolean)
    }
    // --------------------------------------------------------

    export default function Trainers() {
    if (trainers.length === 0) {
        return <p className="trainers-empty">Nenhum treinador encontrado nos dados.</p>
    }

    return (
        <div className="trainers">
        <h2>🧑‍🚀 Treinadores</h2>

        <div className="trainers-grid">
            {trainers.map((trainer) => {
            const team = getTeam(trainer)
            return (
                <article key={trainer.id ?? trainer.name} className="trainer-card">
                <header>
                    <h3>{trainer.name}</h3>
                    <span className="trainer-badges">🏅 {getBadges(trainer)}</span>
                </header>

                {team.length === 0 ? (
                    <p className="trainer-none">Sem Pokémon registrados.</p>
                ) : (
                    <ul className="trainer-team">
                    {team.map((p) => (
                        <li key={p.id} title={p.types.map((t) => t.name).join(' / ')}>
                        <img src={pokemonImage(p.id)} alt={p.name} loading="lazy" />
                        <span>{p.name}</span>
                        <div>
                            {p.types.map((t) => (
                            <TypeBadge key={t.id} name={t.name} />
                            ))}
                        </div>
                        </li>
                    ))}
                    </ul>
                )}
                </article>
            )
            })}
        </div>
        </div>
    )
    }