import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Panel from './pages/Panel';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panel" element={<Panel />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
