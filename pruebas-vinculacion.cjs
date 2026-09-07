const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const local=new Map(),session=new Map();
const storage=m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)});
function page(files,path='/login.html') {
 const fields={},events={};
 const element=id=>fields[id]??=( {_value:'',get value(){return this._value;},set value(v){this._value=String(v);},style:{},innerHTML:'',scrollIntoView(){},insertAdjacentHTML(){},setAttribute(){},addEventListener(){}} );
 const ctx=vm.createContext({console,URLSearchParams,localStorage:storage(local),sessionStorage:storage(session),alert(){},window:{location:{pathname:path,search:'',href:'',replace(url){this.href=url;}}},document:{getElementById:element,querySelectorAll(){return [];},querySelector(){return element('main');},addEventListener(e,fn){events[e]=fn;},body:{insertAdjacentHTML(){}}}});
 const run=code=>vm.runInContext(code,ctx);
 for(const f of files) run(fs.readFileSync('JS/'+f+'.js','utf8'));
 return {run,fields,set(values){for(const [k,v] of Object.entries(values))element(k).value=v;}};
}
let p=page(['sesion','registro']);
p.set({regRun:'22222222-2',regNombre:'Prueba',regApellidos:'Local',regCorreo:'prueba@example.com',regRegion:'Metropolitana',regComuna:'Santiago',regDireccion:'Prueba 1',regClave:'test1234',regClaveConfirmar:'test1234'});p.run('registrarUsuario()');
assert.equal(JSON.parse(local.get('sonidovivo.usuarios')).length,3);
p.run('registrarUsuario()');assert.equal(JSON.parse(local.get('sonidovivo.usuarios')).length,3);
p=page(['sesion','login']);p.set({correo:'prueba@example.com',clave:'test1234'});p.run('ingresar()');assert.equal(p.run('window.location.href'),'Inicio.html');
p=page(['sesion'],'/admin.html');assert.equal(p.run('window.location.href'),'login.html');
p=page(['sesion','login']);p.set({correo:'adminsonido@vivo.cl',clave:'admin1234'});p.run('ingresar()');assert.equal(p.run('window.location.href'),'admin.html');
p=page(['sesion','productos','mantenedorContenido'],'/mantenedorContenido.html');assert.equal(p.run('productos.length'),51);
p.run('editarProducto(1)');p.set({editNombre:'Guitarra editada',editMarca:'Yamaha',editPrecio:'1000',editStock:'5'});p.run('guardarCambios()');
p.set({nuevoCodigo:'TEST001',nuevoNombre:'Nuevo',nuevoMarca:'Prueba',nuevoPrecio:'2000',nuevoStock:'3',nuevoCategoria:'Accesorios',nuevoImagen:'',nuevoModelo:'Modelo',nuevoDescripcion:'Descripción'});p.run('guardarNuevoProducto()');assert.equal(p.run('productos.length'),52);
p.run('guardarNuevoProducto()');assert.equal(p.run('productos.length'),52);
p=page(['sesion','productos','carrito']);assert.equal(p.run('productos[0].precio'),1000);p.run('agregarCarro(1);agregarCarro(1)');assert.equal(p.run('carrito[0].cantidad'),2);assert.equal(p.fields.totalCarrito.textContent,'$2.000');
p=page(['sesion','productos','mantenedorContenido']);p.run('editarProducto(1)');p.set({editPrecio:'-1'});p.run('guardarCambios()');assert.equal(p.run('productos[0].precio'),1000);
p=page(['sesion','mantenedorUsuarios'],'/mantenedorUsuarios.html');p.set({nuevoRun:'33333333-3',nuevoNombreUsuario:'Nuevo',nuevoApellidos:'Usuario',nuevoCorreoUsuario:'nuevo@example.com',nuevoTipoUsuario:'Cliente',nuevoRegion:'Metropolitana',nuevoComuna:'Santiago',nuevoDireccion:'Dirección',nuevoClave:'test1234'});p.run('guardarNuevoUsuario()');assert.equal(p.run('usuarios.length'),4);
p=page(['sesion','login']);p.set({correo:'nuevo@example.com',clave:'test1234'});p.run('ingresar()');assert.equal(p.run('window.location.href'),'Inicio.html');p.run('cerrarSesion()');assert.equal(session.size,0);
for(const f of fs.readdirSync('JS').filter(f=>f.endsWith('.js')))new vm.Script(fs.readFileSync('JS/'+f,'utf8'),{filename:f});
for(const f of fs.readdirSync('.').filter(f=>f.endsWith('.html'))) {
 const html=fs.readFileSync(f,'utf8');
 for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const target=m[1].split('#')[0].split('?')[0];
  if(target&&!/^(https?:|mailto:|tel:|data:)/.test(target))assert.ok(fs.existsSync(target),f+': '+target);
 }
}
console.log('OK: registro, duplicados, login, roles, sesión, altas de usuarios y productos, edición persistente, carrito, sintaxis y enlaces locales.');
