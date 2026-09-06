import { Routes, Route } from 'react-router-dom'
import CreatorDashboard from './components/CreatorDashboard'
import ViewerExperience from './components/ViewerExperience'
import FloatingHearts from './components/FloatingHearts'

function App() {
  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden">
      <FloatingHearts />
      <Routes>
        <Route path="/" element={<CreatorDashboard />} />
        <Route path="/view/:id" element={<ViewerExperience />} />
      </Routes>
    </div>
  )
}

export default App
