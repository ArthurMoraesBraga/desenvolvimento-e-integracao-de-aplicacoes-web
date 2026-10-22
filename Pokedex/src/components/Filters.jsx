    import './Filters.css'

    export default function Filters({ types, selected, onSelect }) {
    return (
        <div className="filters">
        <button
            className={`filter-btn ${selected === 'all' ? 'active' : ''}`}
            onClick={() => onSelect('all')}
        >
            Todos
        </button>

        {types.map((t) => (
            <button
            key={t.id}
            className={`filter-btn type-${t.name.toLowerCase()} ${
                selected === t.name ? 'active' : ''
            }`}
            onClick={() => onSelect(t.name)}
            >
            {t.name}
            </button>
        ))}
        </div>
    )
    }