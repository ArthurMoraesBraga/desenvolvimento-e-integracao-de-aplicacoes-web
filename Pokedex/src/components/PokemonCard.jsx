	import './PokemonCard.css'

	export const STATS = [
	['hp', 'HP'],
	['attack', 'ATK'],
	['defense', 'DEF'],
	['specialAttack', 'SP.ATK'],
	['specialDefense', 'SP.DEF'],
	['speed', 'SPD'],
	]

	const SPRITES =
	'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

	export function pokemonImage(id) {
	return `${SPRITES}/other/official-artwork/${id}.png`
	}

	export function TypeBadge({ name }) {
	return (
		<span className={`type-badge type-${name.toLowerCase()}`}>{name}</span>
	)
	}

	export default function PokemonCard({ pokemon, onSelect }) {
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
			</div>
			))}
		</dl>
		</article>
	)
	}