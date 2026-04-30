import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import CookieNotice from './components/CookieNotice.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

const SpaceBackground = lazy(() => import('./components/SpaceBackground.jsx'))

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.removeItem('theme')
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-void/75 text-white">
      <Suspense fallback={<div className="pointer-events-none fixed inset-0 z-0 bg-radial-space" />}>
        <SpaceBackground />
      </Suspense>
      <CustomCursor />
      <Navbar />
      <CookieNotice />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
