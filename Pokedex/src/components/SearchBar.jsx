    import './SearchBar.css'

    export default function SearchBar({ value, onChange }) {
    return (
        <div className="searchbar">
        <span className="searchbar-icon">🔎</span>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Pesquisar Pokémon por nome ou ID..."
        />
        {value && (
            <button className="searchbar-clear" onClick={() => onChange('')}>
            ✕
            </button>
        )}
        </div>
    )
    }