<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated v-if="!$q.platform.is.mobile">
      <q-toolbar class="bg-white q-px-xl q-py-md row justify-between">
        <div>
          <q-btn class="q-mr-md" round dense flat icon="menu" size="1em" color="black" @click="drawer = !drawer"/>
          <q-img src="flaagweb.png" style="width:140px" @click="$router.push('/inicio')" />
        </div>
        <q-btn v-if="!login" rounded no-caps class="text-black text-subtitle1" color="grey-4" label="Iniciar Sesión" @click="$router.push('/login')" />
      </q-toolbar>
    </q-header>

    <q-drawer
        v-if="!$q.platform.is.mobile"
        v-model="drawer"
        :width="350"
        :breakpoint="500"
        overlay
        bordered
        content-class="bg-white"
      >
      <q-separator/>
        <q-scroll-area v-if="login" class="fit">
          <q-list>

            <template v-for="(item, index) in menu">
              <q-item :key="index" clickable v-ripple v-if="can(item.permission)" @click="item.label === 'Cerrar Sesión' ? cerrarSesion() : $router.push(item.ruta)">
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" />
            </template>

          </q-list>
        </q-scroll-area>
        <div v-else class="q-py-md">
          <div class="row justify-center">
            <q-btn no-caps class="text-white text-subtitle1 q-px-xl q-py-sm" color="black" label="Inicia Sesión" @click="$router.push('/login')" />
          </div>
        </div>
      </q-drawer>

    <q-page-container @click="drawer = false">
      <router-view />
    </q-page-container>

    <q-footer v-if="!$q.platform.is.mobile">
        <q-toolbar class="bg-black text-white q-py-xl column">
          <div class="row justify-between" style="width: 100%">
            <div class="col-6 column justify-between">
              <q-img class="q-ml-md" src="flaagfooter.png" style="width:100px" />
              <div class="row q-gutter-md q-mb-md q-mt-xl">
                <q-btn outline no-caps color="white" style="width: 160px">
                  <div class="row q-gutter-md items-center no-wrap">
                    <q-avatar size="30px"> <img src="apple.png"> </q-avatar>
                    <div>
                      <div class="text-caption">App Store</div>
                      <div>App Store</div>
                    </div>
                  </div>
                </q-btn>
                <q-btn outline no-caps color="white" style="width: 160px">
                  <div class="row q-gutter-md items-center no-wrap">
                    <q-avatar size="30px"> <img src="google-play.png"> </q-avatar>
                    <div>
                      <div class="text-caption">Google Play</div>
                      <div>Google Play</div>
                    </div>
                  </div>
                </q-btn>
              </div>
            </div>
            <div class="col-6 row justify-around">
              <div class="column q-gutter-sm">
                <div class="text-bold">Acerca de Flaag</div>
                <a class="text-white">Lee nuestro Blog</a>
                <a class="text-white">Quieres ser parte</a>
                <a class="text-white">Regístrate para entregas</a>
              </div>
              <div class="column q-gutter-sm">
                <div class="text-bold">Obtén ayuda</div>
                <a class="text-white">Preguntas frecuentes</a>
                <a class="text-white">Donde estamos ubicados</a>
                <a class="text-white">Contáctanos</a>
                <div class="row">
                  <q-icon name="g_translate" />
                  <div class="q-pl-md">Español</div>
                </div>
              </div>
            </div>
          </div>
          <q-separator dark inset class="q-my-md"/>
          <div class="row justify-between" style="width: 100%">
            <div class="col-4 row q-gutter-md q-ml-sm">
              <q-btn round flat><q-avatar size="42px"> <img src="facebook.png"> </q-avatar></q-btn>
              <q-btn round flat><q-avatar size="42px"> <img src="instagram.png"> </q-avatar></q-btn>
              <q-btn round flat><q-avatar size="42px"> <img src="twitter.png"> </q-avatar></q-btn>
            </div>
            <div class="col-7 q-mr-md">
              <div class="row q-gutter-md justify-end">
                <a class="text-white">Políticas de privacidad</a>
                <a class="text-white">Términos</a>
              </div>
            </div>
          </div>
          <div class="row justify-end q-gutter-md q-mt-md" style="width: 100%">
            <div>reCAPTCHA y Google protegen este sitio. Se aplican la Política de privacidad y los Térmios del servicio</div>
            <div>@ 2021 Flaag</div>
          </div>
        </q-toolbar>
      </q-footer>
      <!--<q-dialog v-model="dialogo" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
        <div class="loader" style="width:200px;height:200px">
        </div>
      </q-dialog> -->
  </q-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      // dialogo: true,
      rol: 0,
      login: false,
      drawer: false,
      menu: [
        {
          icon: 'home',
          label: 'Inicio',
          ruta: '/inicio',
          permission: 1
        },
        {
          icon: 'dashboard',
          label: 'Baaners Publicitarios',
          ruta: '/banners_publicidad',
          permission: 2
        },
        {
          icon: 'people',
          label: 'Emprendedores',
          ruta: '/emprendedores',
          permission: 2
        },
        {
          icon: 'person',
          label: 'Perfil',
          ruta: '/perfil_proveedor',
          permission: 3
        },
        {
          icon: 'store',
          label: 'Mi Tienda',
          ruta: '/mi_tienda',
          permission: 3
        },
        {
          icon: 'favorite',
          label: 'Mis Favoritos',
          ruta: '/tiendas_favoritas',
          permission: 5
        },
        {
          icon: 'fact_check',
          label: 'Reporte',
          ruta: '/reporte_cliente',
          permission: 6
        },
        {
          icon: 'fact_check',
          label: 'Reporte',
          ruta: '/reporte_tienda',
          permission: 7
        },
        {
          icon: 'logout',
          label: 'Cerrar Sesión',
          ruta: '',
          permission: 1
        }
      ]
    }
  },
  computed: {
    ...mapGetters('generals', ['can'])
  },
  mounted () {
    const value = localStorage.getItem('FLAAG_SESSION_INFO')
    if (value) {
      this.login = true
    }
  },
  methods: {
    ...mapMutations('generals', ['logout']),
    cerrarSesion () {
      this.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.loader {
  background: url('../../public/prueba.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
