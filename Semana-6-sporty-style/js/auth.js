let auth0Client = null;
 
// 1) Crea el 'guardia' de Auth0 cuando carga la página
async function iniciarAuth0() {
  auth0Client = await auth0.createAuth0Client({
    domain: "dev-em8nnokpr62smj7n.us.auth0.com",     // <-- mi Domain
    clientId: "IPI9R04DwaMeoUY8YiFbAOAuxntoUHgI",             // <-- mi Client ID
    authorizationParams: { redirect_uri: window.location.origin },
    cacheLocation: "localstorage"
  });
 
  // Si volvemos del login, procesamos la respuesta
  if (location.search.includes("code=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }
  await actualizarUI();
}
 
// 2) Muestra u oculta botones según si está logueado
async function actualizarUI() {
  const logueado = await auth0Client.isAuthenticated();
  document.getElementById("btn-login").hidden = logueado;
  document.getElementById("btn-logout").hidden = !logueado;
  if (logueado) {
    const user = await auth0Client.getUser();
    document.getElementById("bienvenida").innerText = "¡Bienvenido al box, " + user.name + "!";
  } else {
    sessionStorage.clear();
  }
}
 
// 3) Conecta los botones
document.getElementById("btn-login").addEventListener("click", () => {
  auth0Client.loginWithRedirect();
});
 
document.getElementById("btn-logout").addEventListener("click", () => {
  sessionStorage.clear();   // borra el carrito al cerrar sesión
  auth0Client.logout({ logoutParams: { returnTo: window.location.origin } });
});
 
iniciarAuth0();
