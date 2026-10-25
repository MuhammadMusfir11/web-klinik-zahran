import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Booking from './pages/Booking'
import ArticleDetail from './pages/ArticleDetail'

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <PageTransition />
      <Navbar />
      <ErrorBoundary key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/artikel/:slug" element={<ArticleDetail />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </>
  )
}