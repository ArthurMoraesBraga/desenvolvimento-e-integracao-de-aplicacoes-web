    import './Header.css'

    export default function Header({
    page,
    onNavigate,
    dark,
    onToggleTheme,
    favoritesCount = 0,
    }) {
    return (
        <header className="header">
        <div className="header-brand">
            <span className="header-ball" />
            <h1>Pokédex</h1>
        </div>

        <nav className="header-nav">
            <button
            className={page === 'home' ? 'active' : ''}
            onClick={() => onNavigate('home')}
            >
            Pokémon
            </button>
            <button
            className={page === 'trainers' ? 'active' : ''}
            onClick={() => onNavigate('trainers')}
            >
            Treinadores
            </button>
            <button
            className={page === 'favorites' ? 'active' : ''}
            onClick={() => onNavigate('favorites')}
            >
            ❤️ Favoritos
            {favoritesCount > 0 && (
                <span className="header-badge">{favoritesCount}</span>
            )}
            </button>
        </nav>

        <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Alternar tema"
        >
            {dark ? '☀️' : '🌙'}
        </button>
        </header>
    )
    }
