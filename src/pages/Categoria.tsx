import React, { useState, useEffect } from 'react';
import { 
  Leaf, ShoppingBag, Menu, X, ArrowRight, Sun, Droplets, ChevronUp,
  MessageCircle, MapPin, Clock, Phone, Map, Check, Instagram, Facebook, Twitter
} from 'lucide-react';
import { productos, categorias } from '../data/products';

const WA_NUMBER = "56944302556";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

function useInView(options = { threshold: 0.1, triggerOnce: true }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isInView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const { ref, isInView } = useInView();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function CategoriaPage({ categoria }: { categoria: string }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const categoryData = categorias.find(c => c.name === categoria);
  const plantasEnCategoria = productos.filter(p => p.category === categoria);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-[#20362A] bg-[#FCFCF8] min-h-screen overflow-x-hidden selection:bg-[#2E5E3E] selection:text-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FCFCF8]/95 backdrop-blur-md shadow-sm py-4' : 'bg-gradient-to-b from-black/50 to-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 group">
            <Leaf className={`w-6 h-6 ${isScrolled ? 'text-[#2E5E3E]' : 'text-white'} transition-colors`} />
            <span className={`font-serif font-bold text-xl tracking-wider ${isScrolled ? 'text-[#2E5E3E]' : 'text-white'} transition-colors`}>SUCULENTAS LUT</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/#inicio" className={`text-sm font-medium hover:text-[#C9794A] transition-colors ${isScrolled ? 'text-[#20362A]' : 'text-white'}`}>
              Volver al inicio
            </a>
            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isScrolled ? 'bg-[#F7F2E8] hover:bg-[#DDE8D3] text-[#2E5E3E]' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'}`}>
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>

          <button 
            className={`md:hidden ${isScrolled || mobileMenuOpen ? 'text-[#2E5E3E]' : 'text-white'} z-50 relative p-2`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#FCFCF8] z-40 transition-transform duration-500 flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <a 
            href="/#inicio" 
            className="font-serif text-3xl text-[#2E5E3E] hover:text-[#C9794A] transition-colors" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Volver al inicio
          </a>
          <button className="flex items-center gap-2 text-[#20362A] mt-4 px-6 py-3 bg-[#F7F2E8] rounded-full">
            <ShoppingBag className="w-5 h-5" /> Ver Carrito
          </button>
        </div>
      </nav>

      {/* Hero Section - Categoría */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src={categoryData?.img || "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1920&q=80"} 
            alt={categoria} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1A10]/50 backdrop-brightness-[1.1]" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <FadeIn delay={200}>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight drop-shadow-lg text-white">
              {categoria}
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-lg md:text-xl font-light text-white/95 drop-shadow-md mb-6">
              {categoryData?.desc}
            </p>
            <p className="text-sm text-white/70">
              {plantasEnCategoria.length} {plantasEnCategoria.length === 1 ? 'producto disponible' : 'productos disponibles'}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Productos de la Categoría */}
      <section className="py-24 bg-[#FCFCF8]">
        <div className="container mx-auto px-6 md:px-12">
          {plantasEnCategoria.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {plantasEnCategoria.map((prod, i) => (
                <FadeIn key={prod.id} delay={i * 100}>
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#F7F2E8]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F2E8]">
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {prod.badge && (
                          <span className="bg-[#C9794A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {prod.badge}
                          </span>
                        )}
                        <span className={`${prod.diffColor} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm`}>
                          {prod.difficulty}
                        </span>
                      </div>

                      {/* Botón de compra */}
                      <a href={waLink(`¡Hola! Me interesa la ${prod.name} (${prod.price}) 🌿`)} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#2E5E3E] hover:bg-[#2E5E3E] hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
                        <ShoppingBag className="w-5 h-5" />
                      </a>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-serif text-2xl text-[#20362A] mb-1 group-hover:text-[#2E5E3E] transition-colors">{prod.name}</h3>
                          <p className="text-[#8FAF8B] font-medium">{prod.price}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-[#20362A]/60 mb-4 leading-relaxed">
                        {prod.description}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-[#F7F2E8]">
                        <div className="flex items-center gap-1.5 text-sm text-[#20362A]/60">
                          <Sun className="w-4 h-4 text-[#C9794A]" /> {prod.light}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[#20362A]/60">
                          <Droplets className="w-4 h-4 text-[#8FAF8B]" /> {prod.water}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Leaf className="w-16 h-16 text-[#DDE8D3] mx-auto mb-4 opacity-50" />
              <h3 className="font-serif text-3xl text-[#20362A] mb-2">Sin productos en esta categoría</h3>
              <p className="text-[#20362A]/60 mb-8">Pronto agregaremos más plantas a esta colección.</p>
              <a href="/#catálogo" className="inline-flex items-center gap-2 text-[#2E5E3E] font-medium hover:text-[#C9794A] transition-colors border-b border-[#2E5E3E] hover:border-[#C9794A] pb-1">
                Explorar otras categorías <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2E5E3E] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">¿No encuentras lo que buscas?</h2>
          <a href={waLink("¡Hola! Tengo una consulta sobre las plantas disponibles 🌿")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full font-medium transition-colors">
            <MessageCircle className="w-5 h-5" /> Contacta por WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#20362A] pt-20 pb-8 text-[#FCFCF8]/70 border-t-4 border-[#C9794A]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-2 text-white mb-6">
                <Leaf className="w-8 h-8 text-[#8FAF8B]" />
                <span className="font-serif font-bold text-2xl tracking-wider">SUCULENTAS LUT</span>
              </div>
              <p className="font-light leading-relaxed max-w-xs mb-8">
                Cultivando bienestar a través del diseño botánico. Transforma tus espacios con naturaleza seleccionada.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-xl text-white mb-6">Contacto</h4>
              <ul className="space-y-4 font-light text-sm">
                <li className="flex gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-1" />
                  <span>Sucre 212, Valparaíso</span>
                </li>
                <li className="flex gap-2">
                  <Phone className="w-4 h-4 shrink-0 mt-1" />
                  <span>+56 944302556</span>
                </li>
                <li className="flex gap-2">
                  <Clock className="w-4 h-4 shrink-0 mt-1" />
                  <span>Miércoles y Sábado<br/>8:30 - 18:30</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-xl text-white mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3 font-light text-sm">
                <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="/#catálogo" className="hover:text-white transition-colors">Catálogo</a></li>
                <li><a href="/#contacto" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light">
            <p>&copy; 2026 Suculentas Lut. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href={waLink("¡Hola! Me gustaría consultar sobre sus plantas 🌿")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
      {/* Botón Scroll to Top */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 w-12 h-12 bg-[#20362A] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-40 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
