# SportyStyle 🏎️

Tienda online de ropa deportiva con temática Mercedes-AMG Petronas F1. Permite al usuario navegar un catálogo, gestionar un carrito de compras, autenticarse y completar un proceso de pago con validación.

---

## Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 (variables, Flexbox, Grid, media queries) |
| Lógica | JavaScript vanilla (ES6+) |
| Autenticación | Auth0 SPA SDK v2.1 |
| Persistencia | `sessionStorage` (carrito) · `localStorage` (sesión Auth0) |

---

## Estructura del proyecto

```
Semana-6-sporty-style/
├── index.html        # Tienda principal con catálogo y carrito
├── pago.html         # Formulario de datos de envío y pago
├── gracias.html      # Confirmación de compra con resumen del pedido
├── css/
│   └── estilos.css   # Estilos globales
├── js/
│   ├── auth.js       # Autenticación con Auth0
│   ├── tienda.js     # Catálogo, carrito y sessionStorage
│   └── pago.js       # Validación del formulario de pago
└── img/              # Imágenes de productos
```

---

## Autenticación

La autenticación está implementada con **Auth0** usando el flujo **Authorization Code + PKCE**, el estándar recomendado para aplicaciones SPA sin backend.

### Configuración

```js
auth0Client = await auth0.createAuth0Client({
  domain: "dev-em8nnokpr62smj7n.us.auth0.com",
  clientId: "IPI9R04DwaMeoUY8YiFbAOAuxntoUHgI",
  authorizationParams: { redirect_uri: window.location.origin },
  cacheLocation: "localstorage"   // persiste la sesión entre páginas
});
```

### Comportamiento

- **Inicio de sesión:** redirige al proveedor de Auth0 y vuelve con un código de autorización que se procesa automáticamente.
- **Sesión persistente:** los tokens se almacenan en `localStorage` (`cacheLocation: "localstorage"`), por lo que la sesión se mantiene activa al navegar entre páginas (tienda → pago → gracias → tienda).
- **Cierre de sesión:** al pulsar el botón "Cerrar sesión" se limpia el `sessionStorage`, se revoca la sesión en Auth0 y se redirige al origen. El usuario es el único que puede cerrar la sesión.
- **Limpieza automática:** si al cargar la página Auth0 confirma que no hay sesión activa, el `sessionStorage` se limpia como medida de seguridad.

### Flujo resumido

```
Usuario pulsa "Iniciar sesión"
  → loginWithRedirect() → Auth0
  → Auth0 redirige de vuelta con ?code=
  → handleRedirectCallback() procesa el código
  → actualizarUI() muestra el nombre del usuario
```

---

## Carrito y proceso de pago

El carrito se gestiona íntegramente en el cliente usando `sessionStorage`, sin necesidad de servidor.

### Carrito (`tienda.js`)

- Los productos se definen en un array local con id, nombre, categoría, precio e imagen.
- Al agregar un producto se guarda en `sessionStorage["carrito"]` como JSON.
- Si el producto ya existe en el carrito, se incrementa la cantidad.
- El total se recalcula en cada actualización.

### Formulario de pago (`pago.html` + `pago.js`)

El formulario valida los datos antes de continuar:

| Campo | Validación |
|---|---|
| Nombre | Requerido |
| Dirección | Requerido |
| Correo | Formato `usuario@dominio.com` (regex) |
| Teléfono | Exactamente 9 dígitos numéricos (regex) |

Si la validación falla, se muestra un mensaje de error inline sin recargar la página. Si todo es correcto, redirige a `gracias.html`.

### Confirmación (`gracias.html`)

- Lee el carrito desde `sessionStorage` y muestra el detalle del pedido con cantidades y precios.
- Calcula y muestra el total pagado.
- Limpia el carrito del `sessionStorage` al terminar (`sessionStorage.removeItem("carrito")`).
- El botón "Volver a la tienda" redirige a `index.html` manteniendo la sesión activa.

---

## Estilos

El diseño sigue la identidad visual de **Mercedes-AMG Petronas F1**:

- `--negro: #000000` — fondo principal
- `--turquesa: #00D2BE` — color de acento oficial del equipo
- `--plata: #C0C0C0` — textos secundarios

El layout de la tienda usa **CSS Grid** (`auto-fit / minmax`) para adaptarse a distintos tamaños de pantalla. El formulario de pago usa **Flexbox** y un grid de dos columnas que colapsa a una en móvil (`max-width: 500px`).
