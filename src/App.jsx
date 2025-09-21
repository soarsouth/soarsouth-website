import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import QuoteWithPricing from './pages/QuoteWithPricing';
import Process from './pages/Process';
import ProjectProgress from './pages/ProjectProgress';
import ProjectAdmin from './pages/ProjectAdmin';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

// REBUILD FORCED - 2025-01-18 - COMMENTS FEATURE INCLUDED - VERSION 2.0
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/quote" element={<QuoteWithPricing />} />
            <Route path="/process" element={<Process />} />
            <Route path="/project/:projectId" element={<ProjectProgress />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/projects" element={<ProjectAdmin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
