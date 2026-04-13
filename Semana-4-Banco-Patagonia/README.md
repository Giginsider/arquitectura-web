# Banco Patagonia - Documentación Completa

## 📱 Descripción del Proyecto
Banco Patagonia es una aplicación web de banca digital que implementa un sistema de autenticación seguro basado en JWT (JSON Web Tokens) con httpOnly cookies. La aplicación permite a los clientes iniciar sesión, visualizar su información de cuenta y saldo, además de cerrar sesión de forma segura.

## 🛠️ Tecnologías Utilizadas
- **Backend**: Node.js con Express.js
- **Autenticación**: JWT (jsonwebtoken)
- **Gestión de cookies**: cookie-parser
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Gestión de dependencias**: npm

## 🏗️ Arquitectura
La aplicación sigue una arquitectura modular con separación de responsabilidades:

``` bash
Semana-4-Banco-Patagonia/
├── data/                    # Datos y lista negra de tokens
│   ├── users.js             # Base de datos de usuarios ficticios
│   └── tokenBlacklist.js    # Tokens invalidados por logout
├── middleware/              # Lógica de autenticación
│   └── authMiddleware.js    # Verificación de JWT
├── routes/                  # Definición de endpoints
│   ├── authRoutes.js        # Login y logout
│   └── privateRoutes.js     # Rutas protegidas
├── css/                     # Estilos
│   └── style.css
├── public/                  # Archivos estáticos (logo)
├── server.js                # Punto de entrada del servidor
├── index.html               # Dashboard principal
├── login.html               # Página de login
├── script.js                # Lógica del formulario de login
└── package.json             # Dependencias del proyecto
```

## Flujo de Autenticación
1. **Login**: Usuario envía credenciales → Servidor valida → Genera JWT → Almacena en cookie httpOnly
2. **Acceso a ruta protegida:** Middleware verifica JWT en cookie → Comprueba lista negra → Permite acceso
3. **Logout**: Servidor añade token a lista negra → Limpia cookie → Redirige al login

## 📋 Componentes Principales
### Backend
- **server.js**: Configura Express, middlewares y rutas
- **authRoutes.js**: Endpoints /api/auth/login y /api/auth/logout
- **privateRoutes.js**: Endpoint /api/mi-cuenta (protegido)
- **authMiddleware.js**: Verifica tokens y consulta lista negra
- **tokenBlacklist.js:** Set en memoria para tokens invalidados
- **users.js**: Base de datos con 2 usuarios de prueba

### Frontend
- **login.html**: Formulario de autenticación
- **index.html**: Dashboard con datos de cuenta (protegido)
- **script.js**: Lógica del login y comunicación con servidor

## 🔐 Seguridad
- **JWT en httpOnly cookies**: El token no es accesible por JavaScript, protegiéndolo de ataques XSS
- **Lista negra de tokens**: Invalida tokens en logout (almacenado en memoria)
- **Middleware de verificación**: Todas las rutas protegidas requieren token válido
- **Expiración de tokens**: Los JWT tienen una validez de 1 hora

## 👥 Usuarios de Prueba
| Usuario         | Contraseña     | Nombre Cuenta   | Numero de Cuenta | Saldo       |
|-----------------|----------------|-----------------|------------------|-------------|
| fernando.alonso | Campeon2005    | Fernando Alonso | 001-123456-7     | $ 1.250.000 |
| ayrton.senna    | Magicsenna1991 | Ayrton Senna    | 001-654321-8     | $ 3.480.000 |
## 🚀 Cómo Usar
1. Instalación de Dependencias
    ``` bash
    cd Semana-4-Banco-Patagonia
    npm install
    ```
2. Iniciar el Servidor
    ``` bash
    npm start
    ```

El servidor estará disponible en: http://localhost:3000

3. Flujo de Uso
    1. Accede a http://localhost:3000 (redirecciona automáticamente a login.html)
    2. Inicia sesión con uno de los usuarios de prueba
    3. Se te redirigirá al dashboard (index.html) donde verás tu información
    4. Haz clic en "Cerrar sesión" para logout
    5. El servidor invalidará tu token en la lista negra

## 🔄 Endpoints API
1. Método	Ruta	Descripción	Requiere Autenticación
2. POST	/api/auth/login	Autenticación de usuario	❌ No
3. POST	/api/auth/logout	Cierre de sesión	✅ Sí
4. GET	/api/mi-cuenta	Obtener datos de cuenta	✅ Sí

## 📝 Propósito del Proyecto
Este proyecto educativo demuestra:

- Implementación de autenticación JWT en aplicaciones web
- Uso seguro de cookies httpOnly
- Invalidación de tokens mediante lista negra
- Separación entre frontend y backend
- Middleware de autenticación en Express
- Buenas prácticas de seguridad en aplicaciones web