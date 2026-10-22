import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Trainers from './pages/Trainer'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [dark, setDark] = useState(true)

  return (
    <div className={`app ${dark ? 'dark' : 'light'}`}>
      <Header
        page={page}
        onNavigate={setPage}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
      />
      <main className="app-main">
        {page === 'home' ? <Home /> : <Trainers />}
      </main>
    </div>
  )
}