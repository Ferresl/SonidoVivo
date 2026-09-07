// Sesión de demostración local; un sitio real requiere autenticación en servidor.
function leerLocal(clave, respaldo) {
    try { const valor = JSON.parse(localStorage.getItem(clave)); return Array.isArray(valor) ? valor : respaldo; }
    catch { return respaldo; }
}
function guardarLocal(clave, datos) {
    try { localStorage.setItem(clave, JSON.stringify(datos)); return true; }
    catch { alert('No se pudieron guardar los cambios en este navegador.'); return false; }
}
function escaparHTML(texto) {
    return String(texto ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
let usuarios = leerLocal('sonidovivo.usuarios', [
    {id:1,nombre:'Administrador',apellidos:'Demo',correo:'adminsonido@vivo.cl',clave:'admin1234',tipoUsuario:'Administrador',run:'12345678-5',region:'Metropolitana',comuna:'Santiago',direccion:'Demo'},
    {id:2,nombre:'Cliente',apellidos:'Demo',correo:'clientesonido@vivo.cl',clave:'cliente123',tipoUsuario:'Cliente',run:'11111111-1',region:'Metropolitana',comuna:'Santiago',direccion:'Demo'}
]);
function usuarioActual() {
    return usuarios.find(u => u.id === Number(sessionStorage.getItem('sonidovivo.sesion')));
}
function cerrarSesion() {
    sessionStorage.removeItem('sonidovivo.sesion');
    window.location.href = 'login.html';
}
if (/\/(admin|mantenedorContenido|mantenedorUsuarios)\.html$/i.test(window.location.pathname) && usuarioActual()?.tipoUsuario !== 'Administrador') {
    window.location.replace('login.html');
}
document.addEventListener('DOMContentLoaded', () => {
    const usuario = usuarioActual();
    document.querySelectorAll('.acceso-sesion a').forEach(a => {
        a.href = usuario?.tipoUsuario === 'Administrador' ? 'admin.html' : 'login.html';
        a.textContent = usuario?.tipoUsuario === 'Administrador' ? 'Administración' : usuario ? 'Cerrar sesión' : 'Inicia sesión';
        if (usuario && usuario.tipoUsuario !== 'Administrador') a.addEventListener('click', e => { e.preventDefault(); cerrarSesion(); });
    });
    document.querySelectorAll('[data-cerrar-sesion]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); cerrarSesion(); }));
});
