
import "../css/PokemonCard.css";

function PokemonCard({ pokemon, onClick }) {
	return (
		<div className="pokemon-card" onClick={onClick}>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
				alt={pokemon.name}
			/>

			<span>#{pokemon.id}</span>
			<h2>{pokemon.name}</h2>

			<div className="pokemon-types">
				{pokemon.types.map((type) => (
					<span key={type}>{type}</span>
				))}
			</div>
		</div>
	);
}

export default PokemonCard;
