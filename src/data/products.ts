// Aquí están TODOS los productos con sus categorías
export const productos = [
  // SUCULENTAS
  { 
    id: 1,
    name: "Uña de Señorita", 
    price: "$ 6.990 CLP", 
    category: "Suculentas",
    badge: "", 
    difficulty: "Fácil", 
    diffColor: "bg-[#DDE8D3] text-[#2E5E3E]", 
    light: "Media", 
    water: "Semanal", 
    img: "https://res.cloudinary.com/iyq5rap3/image/upload/v1782939432/unas-de-senorita-suculenta_ik0sgp.jpg",
    description: "Una pequeña y adorable suculenta perfecta para escritorios. Muy resistente y fácil de cuidar."
  },
  { 
    id: 2,
    name: "Dolar Negro", 
    price: "$ 7.990 CLP", 
    category: "Suculentas",
    badge: "", 
    difficulty: "Fácil", 
    diffColor: "bg-[#DDE8D3] text-[#2E5E3E]", 
    light: "Media", 
    water: "Semanal", 
    img: "https://res.cloudinary.com/iyq5rap3/image/upload/v1782939676/dolar-negro_xkye5a.jpg",
    description: "Suculenta de hojas redondas y compactas. Perfecta para decoración minimalista."
  },
  { 
    id: 3,
    name: "Lengua de la Suegra", 
    price: "$ 6.990 CLP", 
    category: "Suculentas",
    badge: "", 
    difficulty: "Fácil", 
    diffColor: "bg-[#DDE8D3] text-[#2E5E3E]", 
    light: "Alta", 
    water: "Escaso", 
    img: "https://res.cloudinary.com/iyq5rap3/image/upload/v1782939716/images_4_wd9tqp.jpg",
    description: "Una clásica suculenta vertical. Requiere muy poco riego y es casi imposible matarla."
  },

  // PLANTAS DE INTERIOR
  { 
    id: 4,
    name: "Monstera Deliciosa", 
    price: "$ 5.990 CLP", 
    category: "Plantas de interior",
    badge: "", 
    difficulty: "Fácil", 
    diffColor: "bg-[#DDE8D3] text-[#2E5E3E]", 
    light: "Media", 
    water: "Semanal", 
    img: "https://res.cloudinary.com/iyq5rap3/image/upload/v1782939679/monstera-deliciosa_y93lw1.jpg",
    description: "La planta favorita de todo plant parent. Hermosas hojas perforadas que crecen rápido."
  },
  { 
    id: 5,
    name: "Monstera", 
    price: "$ 5.990 CLP", 
    category: "Plantas de interior",
    badge: "", 
    difficulty: "Fácil", 
    diffColor: "bg-[#DDE8D3] text-[#2E5E3E]", 
    light: "Media", 
    water: "Semanal", 
    img: "https://res.cloudinary.com/iyq5rap3/image/upload/v1782939682/monstera_za5m92.jpg",
    description: "Variedad compacta de Monstera. Ideal para espacios medianos con luz indirecta."
  },

  // PLANTAS COLGANTES
  { 
    id: 6,
    name: "Oreja de Shrek", 
    price: "$ 7.990 CLP", 
    category: "Plantas colgantes",
    badge: "", 
    difficulty: "Fácil", 
    diffColor: "bg-[#DDE8D3] text-[#2E5E3E]", 
    light: "Alta", 
    water: "Escaso", 
    img: "https://res.cloudinary.com/iyq5rap3/image/upload/v1782939526/Orejas-shrek2-1_yk88ot.jpg",
    description: "Planta colgante peculiar con hojas alargadas. Perfecta para macetas suspendidas."
  },

  // PLANTAS PURIFICADORAS / MEDIA DIFICULTAD
  { 
    id: 7,
    name: "Alegria del Tucan", 
    price: "$ 10.990 CLP", 
    category: "Purificadoras",
    badge: "", 
    difficulty: "Media", 
    diffColor: "bg-[#F7F2E8] text-[#C9794A]", 
    light: "Alta", 
    water: "Moderado", 
    img: "https://res.cloudinary.com/iyq5rap3/image/upload/v1782939685/images_3_asfffr.jpg",
    description: "Planta tropical que purifica el aire. Floraciones coloridas y fragantes."
  }
];

export const categorias = [
  { name: "Plantas de interior", desc: "Verde para tus espacios cerrados", img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80" },
  { name: "Plantas de exterior", desc: "Resistencia a pleno sol", img: "https://images.unsplash.com/photo-1558293842-c0fd3db86157?w=600&q=80" },
  { name: "Suculentas", desc: "Pequeñas y fáciles de cuidar", img: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80" },
  { name: "Cactus", desc: "Mínimo riego, máximo estilo", img: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80" },
  { name: "Plantas colgantes", desc: "Cascadas de naturaleza", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80" },
  { name: "Purificadoras", desc: "Aire limpio garantizado", img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80" }
];
