<<<<<<< Updated upstream
import { useMemo, useState } from 'react'
import pokedexData from './data/pokedex-data.json'
import { getSpriteUrl, getTypeColor, formatDexNumber } from './utils/pokemon.js'
import PokemonModal from './components/PokemonModal.jsx'
import TrainersSection from './components/TrainersSection.jsx'
import './App.css'

function App() {
  const allPokemon = pokedexData.pokemon

  // Pokémon atualmente aberto no modal de detalhes (null = modal fechado).
  const [selected, setSelected] = useState(null)

  // Busca simples embutida. Quando o Integrante de busca subir o SearchBar,
  // basta substituir este input pelo componente dele e manter o estado `query`.
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return allPokemon
    return allPokemon.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        String(p.id) === term ||
        formatDexNumber(p.id).includes(term),
    )
  }, [query, allPokemon])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokédex Kanto</h1>
        <p>151 Pokémon · detalhes, treinadores e insígnias</p>
      </header>

      {/* === PONTO DE INTEGRAÇÃO (busca) ===
          Substituir por <SearchBar value={query} onChange={setQuery} /> do
          integrante responsável pela busca. */}
      <div className="search-wrap">
        <input
          type="search"
          className="search-input"
          placeholder="Buscar por nome ou número..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar Pokémon"
        />
      </div>

      {/* === PONTO DE INTEGRAÇÃO (lista/cards) ===
          Substituir por <PokemonList pokemon={filtered} onSelect={setSelected} />
          do integrante da lista. O essencial é chamar setSelected(pokemon)
          ao clicar num card, que é o que dispara o modal de detalhes. */}
      <main className="pokemon-grid">
        {filtered.map((pokemon) => (
          <button
            type="button"
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => setSelected(pokemon)}
          >
            <span className="card-dex">{formatDexNumber(pokemon.id)}</span>
            <img
              className="card-sprite"
              src={getSpriteUrl(pokemon.id)}
              alt={pokemon.name}
              loading="lazy"
            />
            <span className="card-name">{pokemon.name}</span>
            <span className="card-types">
              {pokemon.types.map((t) => (
                <span
                  key={t.id}
                  className="card-type-dot"
                  title={t.name}
                  style={{ backgroundColor: getTypeColor(t.name) }}
                />
              ))}
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="empty-msg">Nenhum Pokémon encontrado.</p>
=======
import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Trainers from './pages/Trainer'
import Favorites from './pages/Favorites'
import useFavorites from './hooks/useFavorites'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [dark, setDark] = useState(true)
  const favorites = useFavorites()

  return (
    <div className={`app ${dark ? 'dark' : 'light'}`}>
      <Header
        page={page}
        onNavigate={setPage}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        favoritesCount={favorites.ids.size}
      />
      <main className="app-main">
        {page === 'home' && <Home favorites={favorites} />}
        {page === 'trainers' && <Trainers />}
        {page === 'favorites' && (
          <Favorites favorites={favorites} onNavigateHome={() => setPage('home')} />
>>>>>>> Stashed changes
        )}
      </main>

      {/* Seção de treinadores e insígnias (Integrante 3). */}
      <TrainersSection allPokemon={allPokemon} onSelectPokemon={setSelected} />

      {/* Modal de detalhes (Integrante 3). */}
      <PokemonModal
        pokemon={selected}
        allPokemon={allPokemon}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </div>
  )
}
<<<<<<< Updated upstream

export default App
=======
>>>>>>> Stashed changes
