    import { useMemo, useState } from 'react'
    import data from '../data/pokedex-data.json'
    import SearchBar from '../components/SearchBar'
    import Filters from '../components/Filters'
    import PokemonList from '../components/PokemonList'
    import PokemonDetails from '../components/PokemonModal'
    import './Home.css'

    const types = data.types.filter((t) => t.name !== 'Typeless')

    export default function Home({ favorites }) {
    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')
    const [selected, setSelected] = useState(null)

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase().replace('#', '')

        return data.pokemon.filter((p) => {
        const matchesType =
            type === 'all' || p.types.some((t) => t.name === type)
        const matchesSearch =
            term === '' ||
            p.name.toLowerCase().includes(term) ||
            String(p.id).includes(term)
        return matchesType && matchesSearch
        })
    }, [search, type])

    const pickRandom = () => {
        const list = filtered.length ? filtered : data.pokemon
        setSelected(list[Math.floor(Math.random() * list.length)])
    }

    return (
        <div className="home">
        <div className="home-toolbar">
            <SearchBar value={search} onChange={setSearch} />
            <button className="random-btn" onClick={pickRandom}>
            🎲 Aleatório
            </button>
        </div>

        <Filters types={types} selected={type} onSelect={setType} />

        <p className="home-count">
            {filtered.length} de {data.pokemon.length} Pokémon
        </p>

        <PokemonList
            pokemon={filtered}
            onSelect={setSelected}
            isFavorite={favorites?.isFavorite}
            onToggleFavorite={favorites?.toggleFavorite}
        />

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
