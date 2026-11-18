import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './lib/smoothScroll.js';
import Navbar from './components/Navbar.jsx';
import Preloader from './components/Preloader.jsx';
import Cursor from './components/Cursor.jsx';
import Grain from './components/Grain.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Works from './pages/Works.jsx';
import Project from './pages/Project.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useSmoothScroll();

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>
      <Cursor />
      <Grain />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home ready={!loading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:slug" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home ready={!loading} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
