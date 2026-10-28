import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './context/ThemeContext';

// Homepage Sections (Eagerly loaded for instant first paint)
import HeroSection from './sections/HeroSection';
import TechMarquee from './sections/TechMarquee';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ServicesTestimonialsSection from './sections/ServicesTestimonialsSection';
import ContactSection from './sections/ContactSection';

// Lazy Loaded Pages for optimal code-splitting and faster initial bundle
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-white/[0.1] border-t-[#C6FF3D] animate-spin" />
    </div>
  );
}

function HomePage({ isLoaded }) {
  return (
    <PageTransition>
      <main className="relative z-10">
        <HeroSection isLoaded={isLoaded} />
        <TechMarquee />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesTestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </PageTransition>
  );
}

function AnimatedRoutes({ preloaderComplete }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage isLoaded={preloaderComplete} />} />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <PageTransition>
                <ProjectDetailPage />
                <Footer />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <PageTransition>
                <NotFoundPage />
                <Footer />
              </PageTransition>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <SmoothScroll>
          <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-[var(--bg)] transition-colors duration-500">
            {/* Subtle Film Grain Noise Texture */}
            <div className="bg-noise" />

            {/* Preloader */}
            <Preloader onComplete={() => setPreloaderComplete(true)} />

            {/* Global Interactive Overlays & Navigation */}
            <ScrollProgressBar />
            <Navbar />

            {/* Animated Route View */}
            <AnimatedRoutes preloaderComplete={preloaderComplete} />
          </div>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}
