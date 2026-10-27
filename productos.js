// =============================================================
//  PRODUCTOS  —  para agregar uno, copia un bloque { ... }, y cambia los datos.
//
//  foto:       la foto va en la carpeta "img" con el MISMO nombre que el id:
//              ej. img/zapatero-madera.jpg  → aparece sola, no hay que escribir nada.
//              (Si quieres otro nombre de archivo, ponlo aquí: foto: "mi-foto.png")
//  precio:     tu precio de venta (lo que ve el cliente).
//  costo:      lo que te cuesta en la tienda. NO se muestra al cliente;
//              sirve para calcular tu ganancia en el modo vendedora (?admin).
//  disponible: true = se puede pedir · false = aparece como "Agotado".
// =============================================================
const PRODUCTOS = [
  {
    id: "mesa-auxiliar",
    nombre: "Mesa auxiliar con divisiones",
    categoria: "Hogar",
    precio: 95,
    costo: 70,
    foto: "",
    disponible: true,
    descripcion:
      "Altura ajustable, 2 divisiones para libros y accesorios, 4 ruedas giratorias. Tablero 60 × 40 cm. Ideal para laptop, estudiar o desayunar en la cama.",
  },
  {
    id: "zapatero-madera",
    nombre: "Zapatero de madera",
    categoria: "Hogar",
    precio: 85,
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Organiza tus zapatos y ahorra espacio. Resistente y fácil de armar.",
  },
  {
    id: "ventilador-3en1",
    nombre: "Ventilador 3 en 1",
    categoria: "Hogar",
    precio: 90,
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Ventilador de pie, mesa y pared. Perfecto para el verano.",
  },
  {
    id: "espejo-gato",
    nombre: "Espejo de mesa con orejitas (gato)",
    categoria: "Belleza",
    precio: 0, // ← pon el precio
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Espejo de mesa con luz, diseño de gatito. Práctico, lindo y funcional.",
  },
  {
    id: "parlante-bluetooth",
    nombre: "Parlante Bluetooth",
    categoria: "Tecnología",
    precio: 100,
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Sonido potente, conexión Bluetooth y batería recargable.",
  },
  {
    id: "consola-retro",
    nombre: "Consola retro inalámbrica GameStick",
    categoria: "Tecnología",
    precio: 140,
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Miles de juegos clásicos, 2 mandos inalámbricos. Se conecta a la TV por HDMI.",
  },
  {
    id: "espejo-ovalado-led",
    nombre: "Espejo ovalado con luz LED táctil",
    categoria: "Belleza",
    precio: 150,
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Espejo ovalado con luz LED y botón táctil. Ideal para maquillaje, baño o dormitorio.",
  },
  {
    id: "colchoneta-yoga",
    nombre: "Colchoneta de yoga",
    categoria: "Deporte",
    precio: 22,
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Colchoneta para yoga, pilates y ejercicios en casa. Antideslizante y fácil de llevar.",
  },
  {
    id: "forro-moto",
    nombre: "Forro cobertor para moto lineal",
    categoria: "Motos",
    precio: 15,
    costo: 0,
    foto: "",
    disponible: true,
    descripcion: "Protege tu moto del sol, la lluvia y el polvo.",
  },
];
