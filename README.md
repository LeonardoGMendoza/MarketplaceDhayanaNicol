# Catálogo Dhayana Store

Catálogo web simple: el cliente ve los productos, arma su pedido y lo envía **por WhatsApp** con un toque.
Sirve para pegar el link en Marketplace, en estados de WhatsApp y en grupos.

## Cómo cambiar cosas (sin saber programar)

| Quiero… | Archivo | Qué hago |
|---|---|---|
| Poner mi número de WhatsApp, nombre de la tienda | `config.js` | Cambio `whatsapp: "51…"` y `nombre` |
| Agregar un producto | `productos.js` | Copio un bloque `{ … },` y cambio nombre, precio, descripción |
| Poner foto | carpeta `img/` | Subo la foto (ej. `zapatero.jpg`) y en el producto pongo `foto: "zapatero.jpg"` |
| Producto agotado | `productos.js` | `disponible: false` |
| Ver mi ganancia | navegador | Abro el link con `?admin` al final → muestra costo y ganancia (el cliente no lo ve) |

En GitHub se puede editar desde el celular: abre el archivo → ícono del lápiz ✏️ → cambia → **Commit changes**.

## Publicar gratis (GitHub Pages)

1. En el repositorio: **Settings → Pages**.
2. *Source*: **Deploy from a branch** · Branch: **main** · carpeta **/ (root)** → **Save**.
3. En 1–2 minutos queda en: `https://leonardogmendoza.github.io/MarketplaceDhayanaNicol/`

## Usar en Brasil

En `config.js`: `moneda: "R$"`, `whatsapp: "55…"` y cambiar los avisos (Pix, etc.).
