import { useMemo, useState } from 'react'
import data from '../data/pokedex-data.json'
import PokemonList from '../components/PokemonList'
import PokemonDetails from '../components/PokemonModal'
import './Favorites.css'

export default function Favorites({ favorites, onNavigateHome }) {
  const [selected, setSelected] = useState(null)
  const { ids, isFavorite, toggleFavorite, loading, error, reload } = favorites

  // Mapeia os ids favoritados de volta para os objetos completos do JSON.
  const favoritePokemon = useMemo(
    () => data.pokemon.filter((p) => ids.has(p.id)),
    [ids]
  )

  return (
    <div className="favorites">
      <div className="favorites-head">
        <h2>❤️ Meus Favoritos</h2>
        <p>{favoritePokemon.length} Pokémon salvos no Supabase</p>
      </div>

      {loading && <p className="favorites-status">Carregando favoritos...</p>}

      {error && (
        <div className="favorites-status favorites-error">
          <p>Não foi possível carregar os favoritos.</p>
          <button type="button" onClick={reload}>
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && favoritePokemon.length === 0 && (
        <div className="favorites-empty">
          <span>🤍</span>
          <p>Você ainda não favoritou nenhum Pokémon.</p>
          <button type="button" onClick={onNavigateHome}>
            Explorar a Pokédex
          </button>
        </div>
      )}

      {!loading && !error && favoritePokemon.length > 0 && (
        <PokemonList
          pokemon={favoritePokemon}
          onSelect={setSelected}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {selected && (
        <PokemonDetails
          pokemon={selected}
          allPokemon={data.pokemon}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </div>
  )
}
