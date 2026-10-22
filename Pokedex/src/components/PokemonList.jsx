<<<<<<< Updated upstream
=======
    import PokemonCard from './PokemonCard'
    import './PokemonList.css'

    export default function PokemonList({
    pokemon,
    onSelect,
    isFavorite,
    onToggleFavorite,
    }) {
    if (pokemon.length === 0) {
        return (
        <div className="pokemon-empty">
            <span>😢</span>
            <p>Nenhum Pokémon encontrado.</p>
            <small>Tente outro nome, ID ou tipo.</small>
        </div>
        )
    }

    return (
        <section className="pokemon-list">
        {pokemon.map((p) => (
            <PokemonCard
            key={p.id}
            pokemon={p}
            onSelect={onSelect}
            isFavorite={isFavorite ? isFavorite(p.id) : false}
            onToggleFavorite={onToggleFavorite}
            />
        ))}
        </section>
    )
    }
>>>>>>> Stashed changes
