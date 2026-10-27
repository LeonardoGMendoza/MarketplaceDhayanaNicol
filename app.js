// Lógica del catálogo. Normalmente no necesitas editar este archivo.
(function () {
  const $ = (id) => document.getElementById(id);
  const isAdmin = new URLSearchParams(location.search).has("admin");
  const money = (n) => `${TIENDA.moneda} ${Number(n).toFixed(2).replace(/\.00$/, "")}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---- bolsa (se guarda en el navegador si se puede)
  let bag = {};
  try { bag = JSON.parse(localStorage.getItem("bolsa") || "{}"); } catch (e) {}
  const saveBag = () => { try { localStorage.setItem("bolsa", JSON.stringify(bag)); } catch (e) {} };
  const byId = Object.fromEntries(PRODUCTOS.map((p) => [p.id, p]));
  for (const id in bag) if (!byId[id] || !byId[id].disponible) delete bag[id];

  // ---- cabecera
  document.title = `${TIENDA.nombre} · Catálogo`;
  $("t-nombre").textContent = TIENDA.nombre;
  $("t-eslogan").textContent = TIENDA.eslogan;
  $("avisos").innerHTML = TIENDA.avisos.map((a) => `<span>${esc(a)}</span>`).join("");
  $("pie").textContent = `${TIENDA.nombre} · ${TIENDA.ciudad}`;

  // ---- filtros
  let cat = "Todos", q = "";
  const cats = ["Todos", ...new Set(PRODUCTOS.map((p) => p.categoria))];
  $("chips").innerHTML = cats.map((c) => `<button class="chip" data-c="${esc(c)}" aria-pressed="${c === cat}">${esc(c)}</button>`).join("");
  $("chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    cat = b.dataset.c;
    document.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", x.dataset.c === cat));
    render();
  });
  $("q").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); render(); });

  // ---- modo vendedora: muestra costo y ganancia (abre la página con ?admin al final)
  if (isAdmin) {
    const conCosto = PRODUCTOS.filter((p) => p.costo > 0 && p.precio > 0);
    const prom = conCosto.length ? conCosto.reduce((s, p) => s + (p.precio - p.costo), 0) / conCosto.length : 0;
    $("adminInfo").innerHTML = `<p class="admin">Modo vendedora · ${PRODUCTOS.length} productos · ganancia promedio por venta: <b>${money(prom)}</b> (solo productos con costo)</p>`;
  }

  // ---- tarjetas
  function card(p) {
    const inBag = bag[p.id];
    const precio = p.precio > 0 ? money(p.precio) : "Consultar precio";
    const foto = p.foto ? `<img src="img/${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy">` : "";
    const admin = isAdmin && p.costo > 0 && p.precio > 0
      ? `<span class="admin">Costo ${money(p.costo)} · Ganas <b>${money(p.precio - p.costo)}</b></span>` : "";
    const btn = !p.disponible
      ? `<button class="btn" disabled>Agotado</button>`
      : `<button class="btn btn-add ${inBag ? "in" : ""}" data-add="${esc(p.id)}">${inBag ? `✓ En tu pedido (${inBag})` : "Lo quiero"}</button>`;
    return `<article class="card ${p.disponible ? "" : "out"}">
      <div class="ph">${esc(p.emoji || "🛍️")}${foto}<span class="tag">${esc(p.categoria)}</span></div>
      <div class="body">
        <div class="name">${esc(p.nombre)}</div>
        <div class="desc">${esc(p.descripcion || "")}</div>
        <div class="price ${p.precio > 0 ? "" : "ask"}">${precio}</div>
        ${admin}
        ${btn}
      </div></article>`;
  }

  function render() {
    const list = PRODUCTOS.filter((p) =>
      (cat === "Todos" || p.categoria === cat) &&
      (!q || (p.nombre + " " + (p.descripcion || "")).toLowerCase().includes(q)));
    $("grid").innerHTML = list.length ? list.map(card).join("") : `<p class="empty">No encontramos ese producto. Escríbenos por WhatsApp 😊</p>`;
    renderBar();
  }

  $("grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    const id = b.dataset.add;
    bag[id] = (bag[id] || 0) + 1; saveBag(); render();
  });

  // ---- barra y pedido
  const count = () => Object.values(bag).reduce((a, b) => a + b, 0);
  const total = () => Object.entries(bag).reduce((s, [id, n]) => s + (byId[id].precio || 0) * n, 0);

  function renderBar() {
    const n = count();
    $("bar").classList.toggle("show", n > 0);
    $("barTxt").textContent = `${n} ${n === 1 ? "producto" : "productos"} · ${money(total())}`;
  }

  function renderBag() {
    $("items").innerHTML = Object.entries(bag).map(([id, n]) => {
      const p = byId[id];
      return `<div class="row"><span class="n">${esc(p.nombre)}<br><small>${p.precio > 0 ? money(p.precio) : "Consultar precio"}</small></span>
        <span class="qty"><button data-q="-" data-id="${esc(id)}">−</button><b>${n}</b><button data-q="+" data-id="${esc(id)}">+</button></span></div>`;
    }).join("");
    $("tot").textContent = money(total());
  }

  $("items").addEventListener("click", (e) => {
    const b = e.target.closest("[data-q]"); if (!b) return;
    const id = b.dataset.id;
    bag[id] += b.dataset.q === "+" ? 1 : -1;
    if (bag[id] <= 0) delete bag[id];
    saveBag(); renderBag(); render();
    if (!count()) $("bag").close();
  });

  $("openBag").addEventListener("click", () => { renderBag(); $("bag").showModal(); });
  $("closeBag").addEventListener("click", () => $("bag").close());

  $("send").addEventListener("click", () => {
    const lines = Object.entries(bag).map(([id, n]) => {
      const p = byId[id];
      return `• ${n} × ${p.nombre}${p.precio > 0 ? ` — ${money(p.precio * n)}` : " (consultar precio)"}`;
    });
    const nom = $("nom").value.trim(), dir = $("dir").value.trim();
    const msg = [
      `¡Hola! Vi su catálogo y quiero pedir:`,
      ...lines,
      `*Total productos: ${money(total())}*`,
      nom && `Nombre: ${nom}`,
      dir && `Entrega en: ${dir}`,
      `¿Cuánto sería el delivery?`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  });

  render();
})();
