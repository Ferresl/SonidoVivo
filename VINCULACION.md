# Catálogo y administración

El acceso «Inicia sesión» del sitio lleva a login. Desde allí se puede registrar una cuenta. Al ingresar como administrador, el enlace del sitio cambia a «Administración» y abre el panel. El panel permite volver a la tienda o cerrar la sesión.

Las páginas públicas y el mantenedor usan los productos de `JS/productos.js`. Las modificaciones se guardan en este navegador y se reflejan al recargar catálogo, detalle, novedades y carrito. El mantenedor de usuarios comparte las cuentas con registro y login.

## Probar

Servir la carpeta mediante un servidor HTTP local y abrir `Inicio.html`. Mantener el mismo origen (protocolo, host y puerto) en todas las páginas.

- Administrador de prueba: `adminsonido@vivo.cl` / `admin1234`.
- Cliente de prueba: `clientesonido@vivo.cl` / `cliente123`.
- También se puede registrar un cliente nuevo o crearlo desde el mantenedor.

Las imágenes de productos nuevos deben existir dentro de Images; introducir la ruta no sube un archivo. Sin ruta se usa una imagen de respaldo.

## Alcance del prototipo

No hay backend. Los productos y usuarios se guardan en localStorage y la sesión en sessionStorage. No se comparten entre dispositivos ni se guardan en GitHub. Las contraseñas de demostración se guardan sin cifrar: usar únicamente datos y claves de prueba. La redirección del panel es un control de navegación, no autenticación segura; un sistema publicado para usuarios reales necesita autorización y almacenamiento en servidor.

Se conservaron las regiones disponibles en el original. Los cambios de datos se muestran al recargar las páginas.

## Verificación

`node pruebas-vinculacion.cjs` valida registro, duplicados, login, roles, cierre de sesión, altas de usuarios y productos, edición persistente y totales del carrito; también comprueba sintaxis JS y referencias locales HTML. Usa DOM y almacenamiento simulados, sin modificar datos del navegador. No sustituye una revisión visual en navegador.
