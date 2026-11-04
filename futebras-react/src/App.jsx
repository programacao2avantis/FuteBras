import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Painel from './pages/Painel.jsx'
import Escalacao from './pages/Escalacao.jsx'
import Partida from './pages/Partida.jsx'
import Resultado from './pages/Resultado.jsx'
import Jogador from './pages/Jogador.jsx'

// Cada antigo arquivo .html virou uma rota
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/escalacao" element={<Escalacao />} />
      <Route path="/partida" element={<Partida />} />
      <Route path="/resultado" element={<Resultado />} />
      <Route path="/jogador" element={<Jogador />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
