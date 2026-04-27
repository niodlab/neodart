import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Theme & AI Agent
import { ThemeProvider } from './context/ThemeContext'
import AIChatAgent from './components/AIChatAgent'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import WishlistDrawer from './components/wishlist/WishlistDrawer'

// Pages (Lazy Load)
const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppContent = () => {
  const location = useLocation();
  const isCheckoutRoute = location.pathname.startsWith('/checkout');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {!isCheckoutRoute && <CartDrawer />}
      {!isCheckoutRoute && <WishlistDrawer />}
      <ScrollToTop />
      
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="h-[60vh] flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:artworkId" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      {!isCheckoutRoute && <Footer />}
      {!isCheckoutRoute && <AIChatAgent />}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
