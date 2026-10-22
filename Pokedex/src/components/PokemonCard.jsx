
import "../css/PokemonCard.css";

function PokemonCard({ pokemon, onClick }) {
	return (
		<div className="pokemon-card" onClick={onClick}>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
				alt={pokemon.name}
			/>

<<<<<<< Updated upstream
			<span>#{pokemon.id}</span>
			<h2>{pokemon.name}</h2>

			<div className="pokemon-types">
				{pokemon.types.map((type) => (
					<span key={type}>{type}</span>
				))}
=======
	export default function PokemonCard({
	pokemon,
	onSelect,
	isFavorite = false,
	onToggleFavorite,
	}) {
	const mainType = pokemon.types[0]?.name.toLowerCase() ?? 'normal'

	return (
		<article
		className={`pokemon-card type-${mainType}`}
		onClick={() => onSelect(pokemon)}
		tabIndex={0}
		onKeyDown={(e) => e.key === 'Enter' && onSelect(pokemon)}
		>
		<span className="pokemon-card-id">
			#{String(pokemon.id).padStart(3, '0')}
		</span>

		{onToggleFavorite && (
			<button
			type="button"
			className={`fav-btn ${isFavorite ? 'is-fav' : ''}`}
			aria-label={
				isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
			}
			aria-pressed={isFavorite}
			onClick={(e) => {
				e.stopPropagation()
				onToggleFavorite(pokemon)
			}}
			>
			{isFavorite ? '❤️' : '🤍'}
			</button>
		)}

		<img
			src={pokemonImage(pokemon.id)}
			alt={pokemon.name}
			loading="lazy"
			onError={(e) => {
			e.currentTarget.onerror = null
			e.currentTarget.src = `${SPRITES}/${pokemon.id}.png`
			}}
		/>

		<h3>{pokemon.name}</h3>

		<div className="pokemon-card-types">
			{pokemon.types.map((t) => (
			<TypeBadge key={t.id} name={t.name} />
			))}
		</div>

		<dl className="pokemon-card-stats">
			{STATS.map(([key, label]) => (
			<div key={key}>
				<dt>{label}</dt>
				<dd>{pokemon.stats[key]}</dd>
>>>>>>> Stashed changes
			</div>
		</div>
	);
}

export default PokemonCard;
