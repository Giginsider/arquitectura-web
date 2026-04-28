// Catálogo de productos (3 categorías x 1 producto = 3 mínimo)
const productos = [
    {
      id: 1,
      nombre: "Camiseta Race W15",
      categoria: "Camisetas deportivas",
      descripcion: "Camiseta técnica edición piloto, talla S a XL.",
      precio: 29990,
      img: "../img/camiseta.webp"
    },
    {
      id: 2,
      nombre: "Pantalón Paddock Tech",
      categoria: "Pantalones deportivos",
      descripcion: "Pantalón ligero ideal para entrenar como un F1.",
      precio: 39990,
      img: "../img/pantalon.webp"
    },
    {
      id: 3,
      nombre: "Gorro Pole Position",
      categoria: "Accesorios de deporte",
      descripcion: "Gorro oficial con bordado turquesa Petronas.",
      precio: 14990,
      img: "../img/gorro.webp"
    }
  ];
   
  // Pintar el catálogo en la pantalla
  function pintarCatalogo() {
    const cat = document.getElementById("catalogo");
    cat.innerHTML = productos.map(pr => `
      <article class="producto">
        <img src="${pr.img}" alt="${pr.nombre}">
        <h3>${pr.nombre}</h3>
        <small>${pr.categoria}</small>
        <p>${pr.descripcion}</p>
        <strong>$${pr.precio.toLocaleString("es-CL")}</strong><br>
        <button onclick="agregarAlCarrito(${pr.id})">Agregar al carrito</button>
      </article>`).join("");
  }
   
  // Leer y guardar carrito en sessionStorage
  function leerCarrito() { return JSON.parse(sessionStorage.getItem("carrito") || "[]"); }
  function guardarCarrito(c) { sessionStorage.setItem("carrito", JSON.stringify(c)); }
   
  function agregarAlCarrito(id) {
    const carrito = leerCarrito();
    const existente = carrito.find(p => p.id === id);
    if (existente) existente.cantidad++;
    else {
      const pr = productos.find(p => p.id === id);
      carrito.push({ ...pr, cantidad: 1 });
    }
    guardarCarrito(carrito);
    pintarCarrito();
  }
   
  function pintarCarrito() {
    const carrito = leerCarrito();
    const ul = document.getElementById("lista-carrito");
    ul.innerHTML = carrito.map(i =>
      `<li>${i.nombre} x ${i.cantidad} — $${(i.precio * i.cantidad).toLocaleString("es-CL")}</li>`
    ).join("");
    const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    document.getElementById("total").innerText = total.toLocaleString("es-CL");
  }
   
  pintarCatalogo();
  pintarCarrito();
  