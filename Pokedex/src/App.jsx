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
        )}
      </main>
    </div>
  )
}
