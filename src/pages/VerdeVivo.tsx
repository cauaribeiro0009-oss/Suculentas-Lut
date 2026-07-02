import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, ShoppingBag, Menu, X, ArrowRight, Star, Mail, 
  MapPin, Phone, MessageCircle, Clock, ChevronLeft, ChevronRight,
  Droplets, Sun, Thermometer, Flower2, Sprout, Scissors,
  ChevronUp, Instagram, Facebook, Twitter, Map, Check, Heart, Wind, Smile, Filter
} from 'lucide-react';
import { productos, categorias } from '../data/products';

const WA_NUMBER = "56944302556";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// --- ANIMATION HOOK ---
function useInView(options = { threshold: 0.1, triggerOnce: true }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options.threshold, options.triggerOnce]);

  return { ref, isInView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
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

const beneficios = [
  { title: "Purifican el aire", desc: "Eliminan toxinas y oxigenan tus espacios.", icon: <Wind className="w-8 h-8 text-[#8FAF8B]" /> },
  { title: "Reducen el estrés", desc: "Su presencia disminuye la ansiedad diaria.", icon: <Smile className="w-8 h-8 text-[#8FAF8B]" /> },
  { title: "Mejoran la concentración", desc: "Aumentan la productividad hasta un 15%.", icon: <Check className="w-8 h-8 text-[#8FAF8B]" /> },
  { title: "Aumentan la humedad", desc: "Previenen problemas respiratorios y de piel.", icon: <Droplets className="w-8 h-8 text-[#8FAF8B]" /> },
  { title: "Decoran naturalmente", desc: "Elevan la estética de cualquier rincón.", icon: <Flower2 className="w-8 h-8 text-[#8FAF8B]" /> },
  { title: "Generan bienestar", desc: "Cuidarlas es una terapia mindfulness.", icon: <Heart className="w-8 h-8 text-[#8FAF8B]" /> }
];

const testimonios = [
  { name: "Camila V.", comment: "Las plantas llegaron en perfecto estado. El empaque es hermoso y ecológico. Se nota el amor que le ponen a cada detalle.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" },
  { name: "Andrés M.", comment: "La guía de cuidados me salvó la vida. Antes se me morían hasta los cactus, ahora mi apartamento parece una selva. Recomendadísimos.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Laura G.", comment: "Compré una Monstera y está gigante. El servicio al cliente por WhatsApp fue súper rápido y me ayudaron a elegir la maceta ideal.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" },
  { name: "Esteban R.", comment: "Excelente selección de plantas raras. He conseguido especies que no encontraba en ningún vivero tradicional.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" }
];

const galeria = [
  "https://images.unsplash.com/photo-1416879598555-1416879598555?w=800&q=80",
  "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=800&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
  "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&q=80",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
  "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?w=800&q=80",
  "https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=800&q=80"
];

// --- MAIN COMPONENT ---
export function VerdeVivo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Auto-advance testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonios.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galeria.length));
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galeria.length) % galeria.length));
  };

  return (
    <div className="font-sans text-[#20362A] bg-[#FCFCF8] min-h-screen overflow-x-hidden selection:bg-[#2E5E3E] selection:text-white">
      {/* 1. Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FCFCF8]/95 backdrop-blur-md shadow-sm py-4' : 'bg-gradient-to-b from-black/50 to-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <Leaf className={`w-6 h-6 ${isScrolled ? 'text-[#2E5E3E]' : 'text-white'} transition-colors`} />
            <span className={`font-serif font-bold text-xl tracking-wider ${isScrolled ? 'text-[#2E5E3E]' : 'text-white'} transition-colors`}>SUCULENTAS LUT</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {['Inicio', 'Catálogo', 'Productos', 'Blog', 'Contacto'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium hover:text-[#C9794A] transition-colors ${isScrolled ? 'text-[#20362A]' : 'text-white'}`}>
                {item}
              </a>
            ))}
            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isScrolled ? 'bg-[#F7F2E8] hover:bg-[#DDE8D3] text-[#2E5E3E]' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'}`}>
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>

          <button 
            className={`md:hidden ${isScrolled || mobileMenuOpen ? 'text-[#2E5E3E]' : 'text-white'} z-50 relative p-2`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#FCFCF8] z-40 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          {['Inicio', 'Catálogo', 'Productos', 'Blog', 'Contacto'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="font-serif text-3xl text-[#2E5E3E] hover:text-[#C9794A] transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="flex items-center gap-2 text-[#20362A] mt-4 px-6 py-3 bg-[#F7F2E8] rounded-full">
            <ShoppingBag className="w-5 h-5" /> Ver Carrito
          </button>
        </div>
      </nav>

      {/* 2. Hero */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=1920&q=80" 
            alt="Living room with plants" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1A10]/35 backdrop-brightness-[1.1]" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto pt-20">
          <FadeIn delay={200}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight drop-shadow-lg text-white">
              Llena tu hogar <br/>de vida
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-lg md:text-2xl font-light mb-10 text-white/95 max-w-2xl mx-auto drop-shadow-md">
              Plantas que transforman espacios y mejoran tu bienestar. Curadas cuidadosamente para ti.
            </p>
          </FadeIn>
          <FadeIn delay={600} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink("Hola! Me gustaría comprar una planta 🌿")} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#2E5E3E] hover:bg-[#20362A] text-white rounded-full transition-all hover:scale-105 font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#2E5E3E]/30">
              Comprar ahora <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#catálogo" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/50 hover:bg-white hover:text-[#20362A] text-white rounded-full transition-all hover:scale-105 font-medium shadow-lg flex items-center justify-center">
              Explorar catálogo
            </a>
          </FadeIn>
        </div>

        {/* Floating leaves decoration */}
        <Leaf className="absolute text-white/20 w-12 h-12 top-1/4 left-[15%] rotate-45 animate-[bounce_8s_infinite]" />
        <Leaf className="absolute text-white/20 w-8 h-8 bottom-1/3 right-[20%] -rotate-12 animate-[bounce_6s_infinite_1s]" />
        <Leaf className="absolute text-white/10 w-16 h-16 top-1/3 right-[10%] rotate-90 animate-[bounce_10s_infinite_2s]" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 cursor-pointer" onClick={() => document.getElementById('sobre-nosotros')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-xs tracking-[0.2em] uppercase text-white font-medium">Descubre</span>
          <div className="w-[26px] h-[40px] border border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 3. Sobre Nosotros */}
      <section id="sobre-nosotros" className="py-24 md:py-32 bg-[#FCFCF8]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <span className="text-[#8FAF8B] font-medium tracking-widest uppercase text-sm mb-4 block">Nuestra Historia</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#20362A] mb-8 leading-tight">
                La naturaleza no es un lujo, <span className="italic text-[#2E5E3E]">es una necesidad.</span>
              </h2>
              <div className="space-y-6 text-[#20362A]/70 leading-relaxed text-lg font-light">
                <p>
                  Nacimos de la pasión por transformar espacios fríos en refugios llenos de vida y energía. En Suculentas Lut, creemos que cada hoja cuenta una historia y cada planta es un miembro más de la familia.
                </p>
                <p>
                  Trabajamos directamente con productores locales para asegurar prácticas de cultivo responsable y sostenible. Cada especie que llega a tus manos ha sido cultivada con paciencia, dedicación y un profundo respeto por nuestro entorno.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-12 border-t border-[#DDE8D3]">
                {[
                  { label: "Especies", val: "+100" },
                  { label: "Años", val: "+3" },
                  { label: "Clientes", val: "+1k" },
                  { label: "Cultivo", val: "100%" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="font-serif text-3xl text-[#C9794A] mb-1">{stat.val}</div>
                    <div className="text-xs font-medium text-[#2E5E3E]/60 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={200} className="relative">
              <div className="absolute -inset-4 bg-[#F7F2E8] rounded-tl-[120px] rounded-br-[120px] -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1559181567-c3190e49d42e?w=800&q=80" 
                alt="Myriam Cartes" 
                className="w-full h-auto rounded-tl-[100px] rounded-br-[100px] shadow-2xl object-cover aspect-[4/5]"
                loading="lazy"
              />
              <div className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-12 bg-white p-6 md:p-8 shadow-xl rounded-tr-3xl rounded-bl-3xl max-w-[280px]">
                <p className="font-serif text-2xl text-[#2E5E3E] mb-1">Myriam Cartes</p>
                <p className="text-sm text-[#C9794A] font-medium mb-3">Fundadora & Botánica</p>
                <p className="text-sm text-[#20362A]/60 italic">"Mi misión es devolver el verde a nuestras vidas cotidianas."</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Categorías */}
      <section id="catálogo" className="py-24 bg-[#F7F2E8]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#8FAF8B] font-medium tracking-widest uppercase text-sm mb-4 block">Colecciones</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#20362A] mb-6">Explora nuestro catálogo</h2>
            <p className="text-[#20362A]/70 text-lg font-light">Encuentra la compañera perfecta para tu estilo de vida, la iluminación de tu hogar y tu experiencia con las plantas.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categorias.map((cat, i) => (
              <FadeIn key={i} delay={i * 100}>
                <a href={`/categoria/${encodeURIComponent(cat.name)}`} className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 block">
                  <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:from-[#2E5E3E]/90 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="font-serif text-2xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{cat.name}</h3>
                    <p className="text-white/80 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cat.desc}</p>
                    <span className="flex items-center gap-2 text-white text-sm font-medium w-max border-b border-transparent group-hover:border-white pb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      Ver colección <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Productos Destacados */}
      <section id="productos" className="py-24 bg-[#FCFCF8]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#8FAF8B] font-medium tracking-widest uppercase text-sm mb-4 block">Selección Especial</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#20362A]">Favoritas de la semana</h2>
            </div>
            <a href={waLink("Hola! Me gustaría ver todo el inventario de plantas disponibles 🌿")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#2E5E3E] font-medium hover:text-[#C9794A] transition-colors border-b border-[#2E5E3E] hover:border-[#C9794A] pb-1">
              Ver todo el inventario <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {productos.map((prod, i) => (
              <FadeIn key={i} delay={i * 100}>
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

                    <a href={waLink(`Hola! Me interesa la ${prod.name} (${prod.price}) 🌿`)} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#2E5E3E] hover:bg-[#2E5E3E] hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
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
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-[#F7F2E8]">
                      <div className="flex items-center gap-1.5 text-sm text-[#20362A]/60" title="Nivel de luz">
                        <Sun className="w-4 h-4 text-[#C9794A]" /> {prod.light}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-[#20362A]/60" title="Frecuencia de riego">
                        <Droplets className="w-4 h-4 text-[#8FAF8B]" /> {prod.water}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Guía de Cuidados */}
      <section className="py-24 bg-[#20362A] text-[#FCFCF8]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">El arte de cuidar</h2>
            <p className="text-[#FCFCF8]/70 text-lg font-light">Tener una planta es un compromiso de amor. Aquí están los pilares básicos para que tus compañeras verdes prosperen.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: "💧", title: "Riego Consciente", desc: "Toca la tierra antes de regar. Si los primeros 3cm están secos, es momento de hidratar." },
              { icon: "☀️", title: "Luz Adecuada", desc: "Conoce la diferencia entre luz directa e indirecta. Evita el sol del mediodía en especies tropicales." },
              { icon: "🌡", title: "Temperatura", desc: "La mayoría de las plantas de interior son felices entre 15°C y 25°C. Evita corrientes de aire." },
              { icon: "🌱", title: "Fertilización", desc: "Alimenta tus plantas durante primavera y verano. Durante el invierno, dales un descanso." },
              { icon: "🪴", title: "Trasplante", desc: "Hazlo cuando las raíces salgan por debajo de la maceta. Usa siempre sustrato con buen drenaje." },
              { icon: "✂️", title: "Poda y Limpieza", desc: "Limpia las hojas del polvo con un paño húmedo y corta las hojas amarillas para estimular crecimiento." }
            ].map((guide, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-[#2E5E3E]/40 border border-[#8FAF8B]/20 p-8 rounded-3xl hover:bg-[#2E5E3E]/60 transition-colors h-full">
                  <div className="text-4xl mb-6">{guide.icon}</div>
                  <h3 className="font-serif text-2xl mb-3">{guide.title}</h3>
                  <p className="text-[#FCFCF8]/70 leading-relaxed font-light">{guide.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Galería (Masonry) */}
      <section className="py-24 bg-[#FCFCF8]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <span className="text-[#8FAF8B] font-medium tracking-widest uppercase text-sm mb-4 block">Inspiración</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#20362A]">Nuestra comunidad</h2>
          </FadeIn>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galeria.map((img, i) => (
              <FadeIn key={i} delay={i * 50} className="break-inside-avoid">
                <div 
                  className="relative group rounded-2xl overflow-hidden cursor-pointer cursor-zoom-in"
                  onClick={() => openLightbox(i)}
                >
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-[#20362A]/0 group-hover:bg-[#20362A]/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-[#0A1A10]/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>
          
          <button className="absolute left-4 md:left-12 text-white/50 hover:text-white p-2" onClick={prevImage}>
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img 
            src={galeria[lightboxIndex]} 
            alt="Enlarged" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="absolute right-4 md:right-12 text-white/50 hover:text-white p-2" onClick={nextImage}>
            <ChevronRight className="w-10 h-10" />
          </button>
          
          <div className="absolute bottom-6 text-white/50 font-serif">
            {lightboxIndex + 1} / {galeria.length}
          </div>
        </div>
      )}

      {/* 8. Beneficios */}
      <section className="py-24 bg-[#F7F2E8]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#20362A] mb-6">Por qué tener plantas</h2>
            <p className="text-[#20362A]/70 text-lg font-light">Más allá de la decoración, integrar la naturaleza en tu hogar tiene beneficios probados por la ciencia.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16">
            {beneficios.map((ben, i) => (
              <FadeIn key={i} delay={i * 100} className="text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#2E5E3E]">
                  {ben.icon}
                </div>
                <h3 className="font-serif text-2xl text-[#2E5E3E] mb-3">{ben.title}</h3>
                <p className="text-[#20362A]/70 font-light">{ben.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonios */}
      <section className="py-24 bg-[#FCFCF8] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <span className="text-[#8FAF8B] font-medium tracking-widest uppercase text-sm mb-4 block">Reseñas</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#20362A]">Lo que dicen nuestros clientes</h2>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonios.map((test, i) => (
                  <div key={i} className="w-full shrink-0 px-4">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#F7F2E8] text-center">
                      <div className="flex justify-center gap-1 mb-6 text-[#C9794A]">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                      </div>
                      <p className="font-serif text-xl md:text-2xl text-[#20362A] leading-relaxed mb-8">
                        "{test.comment}"
                      </p>
                      <div className="flex flex-col items-center">
                        <img src={test.avatar} alt={test.name} className="w-16 h-16 rounded-full object-cover mb-3 shadow-md" />
                        <span className="font-medium text-[#2E5E3E]">{test.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-3 mt-8">
              {testimonios.map((_, i) => (
                <button 
                  key={i} 
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'bg-[#2E5E3E] w-8' : 'bg-[#DDE8D3]'}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center gap-6 mt-12 items-center text-sm font-medium text-[#20362A]/50">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#C9794A] fill-current" /> 4.9 en Google
              </span>
              <span className="w-1 h-1 rounded-full bg-[#DDE8D3]" />
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#C9794A] fill-current" /> 4.8 en Facebook
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Newsletter */}
      <section className="py-24 bg-[#2E5E3E] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <FadeIn className="max-w-2xl mx-auto">
            <Mail className="w-12 h-12 mx-auto text-[#DDE8D3] mb-6 opacity-80" />
            <h2 className="font-serif text-4xl md:text-5xl mb-6">El cuidado en tu bandeja</h2>
            <p className="text-white/80 text-lg font-light mb-10">
              Suscríbete a nuestra newsletter y recibe consejos mensuales sobre riego, iluminación y nuevos ingresos al catálogo.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Tu correo electrónico" 
                  required
                  className="flex-1 bg-white/10 border border-white/30 rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
                <button 
                  type="submit"
                  className="bg-[#C9794A] hover:bg-[#A55E35] text-white rounded-full px-8 py-4 font-medium transition-colors shadow-lg whitespace-nowrap"
                >
                  Suscribirme
                </button>
              </form>
            ) : (
              <div className="bg-[#DDE8D3] text-[#2E5E3E] rounded-full py-4 px-6 font-medium inline-flex items-center gap-2 animate-in zoom-in">
                <Check className="w-5 h-5" /> ¡Gracias por suscribirte! Revisa tu bandeja pronto.
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* 11. Contacto */}
      <section id="contacto" className="py-24 bg-[#FCFCF8]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <a href="https://maps.google.com/?q=Sucre+212,+2571547+Valparaíso,+Viña+del+Mar,+Valparaíso,+Chile" target="_blank" rel="noopener noreferrer" className="w-full h-[500px] bg-[#DDE8D3] rounded-3xl overflow-hidden flex flex-col items-center justify-center text-[#20362A] relative group hover:bg-[#c8dcca] transition-colors">
                <Map className="w-12 h-12 mb-4 opacity-50 group-hover:opacity-80 transition-opacity" />
                <p className="font-medium text-lg">Sucre 212, Valparaíso</p>
                <p className="text-sm opacity-70">Haz clic para abrir Google Maps</p>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
              </a>
            </FadeIn>
            
            <FadeIn delay={200} className="flex flex-col justify-center">
              <span className="text-[#8FAF8B] font-medium tracking-widest uppercase text-sm mb-4 block">Contacto</span>
              <h2 className="font-serif text-4xl text-[#20362A] mb-10">Estamos para ayudarte</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#F7F2E8] rounded-full flex items-center justify-center shrink-0 text-[#2E5E3E]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#20362A] mb-1">Dirección</h4>
                    <p className="text-[#20362A]/70 font-light">Sucre 212<br/>2571547 Valparaíso, Viña del Mar</p>
                    <p className="text-xs text-[#C9794A] mt-2 font-medium bg-[#F7F2E8] inline-block px-2 py-1 rounded">🚗 Estacionamiento privado disponible</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#F7F2E8] rounded-full flex items-center justify-center shrink-0 text-[#2E5E3E]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#20362A] mb-1">Horarios</h4>
                    <p className="text-[#20362A]/70 font-light">Miércoles y Sábado: 8:30 a 18:30</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#F7F2E8] rounded-full flex items-center justify-center shrink-0 text-[#2E5E3E]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#20362A] mb-1">Comunicación</h4>
                    <p className="text-[#20362A]/70 font-light">+56 944302556</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="https://maps.google.com/?q=Sucre+212,+2571547+Valparaíso,+Viña+del+Mar,+Valparaíso,+Chile" target="_blank" rel="noopener noreferrer" className="bg-[#2E5E3E] text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-[#20362A] transition-colors">
                  <MapPin className="w-4 h-4" /> Cómo llegar
                </a>
                <a href={waLink("Hola! Quiero consultar sobre sus plantas 🌿")} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-[#128C7E] transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
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
                <a href="https://www.instagram.com/suculentas_lut/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-white transition-colors">
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
              <h4 className="font-serif text-xl text-white mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-4 font-light">
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Inicio</a></li>
                <li><a href="#catálogo" className="hover:text-white hover:translate-x-1 inline-block transition-all">Catálogo de Plantas</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Guía de Cuidados</a></li>
                <li><a href="#sobre-nosotros" className="hover:text-white hover:translate-x-1 inline-block transition-all">Nuestra Historia</a></li>
                <li><a href="#contacto" className="hover:text-white hover:translate-x-1 inline-block transition-all">Contacto</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Preguntas Frecuentes</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-xl text-white mb-6">Horarios de Atención</h4>
              <ul className="space-y-4 font-light">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Miércoles</span>
                  <span className="text-white">8:30 - 18:30</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Sábado</span>
                  <span className="text-white">8:30 - 18:30</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light">
            <p>&copy; 2026 Suculentas Lut. Todos los derechos reservados.</p>
            <div className="flex gap-2">
              {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                <div key={method} className="bg-white/10 px-3 py-1.5 rounded text-xs text-white">
                  {method}
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. Floating Elements */}
      <a 
        href={waLink("Hola! Me gustaría consultar sobre sus plantas 🌿")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 w-12 h-12 bg-[#20362A] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-40 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Volver arriba"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
