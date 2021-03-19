
const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Generales
      { path: '/inicio', component: () => import('pages/Home.vue') },
      // Proveedor
      { path: '/perfil_proveedor', component: () => import('pages/Proveedor/Perfil.vue') },
      { path: '/index_app', component: () => import('pages/Proveedor/Index.vue') },
      { path: '/producto', component: () => import('pages/Proveedor/Producto.vue') },
      { path: '/producto/:id', component: () => import('pages/Proveedor/EditarProducto.vue') },
      { path: '/mi_tienda', component: () => import('pages/Proveedor/ListaProductos.vue') },
      { path: '/reporte_tienda', component: () => import('pages/Proveedor/Reporte.vue') },
      { path: '/producto_guardado', component: () => import('pages/Proveedor/ProductoGuardado.vue') }
    ]
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/registro', component: () => import('pages/Registro.vue') },
  { path: '/splash', component: () => import('pages/Splash.vue') },
  {
    path: '/',
    redirect: '/splash'
  },
  {
    path: '*',
    redirect: '/splash'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
