import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import ProductsSection from './components/sections/ProductsSection'
import FeatureSection from './components/sections/FeatureSection'
import PromoSection from './components/sections/PromoSection'
import WhySection from './components/sections/WhySection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import NewsletterSection from './components/sections/NewsletterSection'

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection />
        <FeatureSection />
        <PromoSection />
        <WhySection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
