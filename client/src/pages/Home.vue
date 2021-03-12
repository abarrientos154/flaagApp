<template>
  <div>
    <q-carousel
        v-model="slide1"
        :height="web ? '850px' : '800px'"
        width="100%"
        navigation
        infinite
        :autoplay="autoplay1"
        @mouseenter="autoplay1 = false"
        @mouseleave="autoplay1 = true"
        >
        <q-carousel-slide :name="index + 1" :img-src="!img.caso ? baseuPublicidad + img.fileName : img.fileName"  v-for="(img, index) in slPrincipal" :key="index" @click="!img.caso ? irRuta(img.ruta) : ''">
            <!-- <div class="absolute-center bg-transparent q-mx-md" style="width: 100%">
                <div :class="web ? 'text-h2 text-bold text-black q-mx-md' : 'text-h3 text-bold text-black q-mx-md'">¿Tienes hambre? Estás en el lugar correcto</div>
            </div> -->
        </q-carousel-slide>
    </q-carousel>

    <q-carousel
      v-model="slide2"
      :autoplay="autoplay2"
      @mouseenter="autoplay2 = false"
      @mouseleave="autoplay2 = true"
      swipeable
      animated
      infinite
      :height="web ? '300px' : '250px'"
      class="bg-transparent q-my-md"
    >
      <q-carousel-slide :name="index + 1" v-for="(value, name, index) in slLogos" :key="index" class="column justify-center no-wrap">
        <div class="row fit justify-around items-center no-wrap" style="width:100%">
          <div :class="web ? 'col-2 column justify-center' : 'col-4 column justify-center'" v-for="(img, index2) in value" :key="index2" style="height: 90%">
            <div style="width: 90%; height: 80%">
              <q-avatar style="width: 100%; height: 100%">
                <img
                  :src="img.perfil ? baseuLogos + img._id : 'noimg.png'"
                  @click="rol === 1 ? $router.push('/proveedor/' + img._id) : irTienda(img._id)" >
              </q-avatar>
            </div>
            <div class="text-center text-weight-bold q-mt-sm" style="width: 95%">{{img.nombreEmpresa}}</div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-separator />

    <q-carousel
      v-model="slide3"
      swipeable
      animated
      infinite
      height="330px"
      class="bg-transparent q-my-md"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div class="row fit justify-around items-center no-wrap" style="width: 100%">
          <q-card class="col-6 q-mx-sm" clickable v-ripple v-for="(card, index) in slPublicidad1" :key="index" @click="!card.nuevo ? irRuta(card.ruta) : ''">
              <q-img :src="!card.nuevo ? baseuPublicidad + card.fileName : card.fileName" style="height: 290px; width: 100%" />
          </q-card>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-separator />

    <q-carousel
      v-model="slide4"
      ref="carousel4"
      animated
      infinite
      height="470px"
      class="bg-transparent q-my-md"
    >
      <q-carousel-slide :name="index + 1" v-for="(value, name, index) in slNuevo" :key="index" class="column no-wrap">
        <div class="text-h5 text-bold q-ml-md">Lo nuevo en Flaag</div>
        <div class="row fit justify-around items-center no-wrap" style="width: 100%">
          <div :class="web ? 'col-2 q-mx-sm' : 'col-6 q-mx-sm'" v-for="(card, index2) in value" :key="index2">
              <q-img :src="!card.caso ? baseuProducto + card.images[0] : card.images[0]" style="height: 240px; width: 100%; border-radius: 34px" @click="producto = card, !card.caso ? verProducto = true : ''" />

              <div class="q-ma-sm" @click="producto = card, !card.caso ? verProducto = true : ''">
                <div class="row no-wrap items-center">
                  <q-icon class="col-1" name="store" size="xs"></q-icon>
                  <div v-if="!card.caso" class="col q-ml-sm text-subtitle2 ellipsis">{{card.datos_proveedor.nombreEmpresa}}</div>
                </div>
                <div class="row no-wrap items-center">
                  <div class="col text-subtitle2 text-bold ellipsis">{{card.nombre}}</div>
                </div>
                <div class="row no-wrap items-center">
                  <div v-if="!card.oferta" class="col text-h6 ellipsis">$ {{card.valor}}</div>
                  <div v-if="card.oferta" class="col text-h6 ellipsis">$ <strike>{{card.valor}}</strike> - {{card.ofertaVal}}</div>
                </div>
              </div>

              <div v-if="rol === 2" class="row justify-center">
                <q-btn glossy icon="add_shopping_cart" label="Comprar" color="primary" text-color="black" @click="login ? $router.push('/tienda/' + card.proveedor_id + '/' + card._id) : $router.push('/login')" />
              </div>
          </div>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control
          position="top-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          <q-btn push round dense color="grey-4" text-color="black" icon="arrow_left" @click="$refs.carousel4.previous()" />
          <q-btn push round dense color="grey-4" text-color="black" icon="arrow_right" @click="$refs.carousel4.next()" />
        </q-carousel-control>
      </template>
    </q-carousel>
    <q-separator />

    <q-carousel
      v-model="slide5"
      swipeable
      animated
      infinite
      height="330px"
      class="bg-transparent q-my-md"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div class="row fit justify-around items-center no-wrap" style="width: 100%">
          <q-card class="col-6 q-mx-sm" clickable v-ripple v-for="(card, index) in slPublicidad2" :key="index" @click="!card.nuevo ? irRuta(card.ruta) : ''">
              <q-img :src="!card.nuevo ? baseuPublicidad + card.fileName : card.fileName" style="height: 290px; width: 100%" />
          </q-card>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-separator />

    <q-carousel
      v-model="slide6"
      animated
      infinite
      swipeable
      :autoplay="autoplay6"
      @mouseenter="autoplay6 = false"
      @mouseleave="autoplay6 = true"
      height="470px"
      class="bg-transparent q-my-md"
    >
      <q-carousel-slide :name="index + 1" v-for="(value, name, index) in slTienda" :key="index" class="column no-wrap">
        <div class="text-h5 text-bold text-center q-ml-md">Conoce nuestras tiendas</div>
        <div class="row fit justify-around items-center no-wrap" style="width: 100%">
          <div :class="web ? 'col-2 q-mx-sm' : 'col-6 q-mx-sm'" v-for="(card, index2) in value" :key="index2">
              <q-img :src="!card.caso ? baseuProducto + card.images[0] : card.images[0]" style="height: 240px; width: 100%; border-radius: 34px" @click="producto = card, !card.caso ? verProducto = true : ''" />

              <div class="q-ma-sm" @click="producto = card, !card.caso ? verProducto = true : ''">
                <div class="row no-wrap items-center">
                  <q-icon class="col-1" name="store" size="xs"></q-icon>
                  <div v-if="!card.caso" class="col q-ml-sm text-subtitle2 ellipsis">{{card.datos_proveedor.nombreEmpresa}}</div>
                </div>
                <div class="row no-wrap items-center">
                  <div class="col text-subtitle2 text-bold ellipsis">{{card.nombre}}</div>
                </div>
                <div class="row no-wrap items-center">
                  <div v-if="!card.oferta" class="col text-h6 ellipsis">$ {{card.valor}}</div>
                  <div v-if="card.oferta" class="col text-h6 ellipsis">$ <strike>{{card.valor}}</strike> - {{card.ofertaVal}}</div>
                </div>
              </div>

              <div v-if="rol === 2" class="row justify-center">
                <q-btn glossy icon="add_shopping_cart" label="Comprar" color="primary" text-color="black" @click="login ? $router.push('/tienda/' + card.proveedor_id + '/' + card._id) : $router.push('/login')" />
              </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-dialog v-model="verProducto">
      <q-card style="width: 100%;">
        <q-card-section class="q-pa-none" style="width: 100%">
          <DetalleProducto :data="producto" lugar="inicio" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import DetalleProducto from '../pages/DetalleProducto'
import env from '../env'
import { openURL } from 'quasar'
export default {
  components: { DetalleProducto },
  data () {
    return {
      rol: 0,
      producto: {},
      verProducto: false,
      login: true,
      web: true,
      baseuPublicidad: '',
      baseuProducto: '',
      baseuLogos: '',
      slide1: 1,
      slide2: 1,
      slide3: 1,
      slide4: 1,
      slide5: 1,
      slide6: 1,
      autoplay1: true,
      autoplay2: true,
      autoplay3: true,
      autoplay5: true,
      autoplay6: true,
      slPrincipal: [],
      slPublicidad1: [],
      slPublicidad2: [],
      slTienda: {},
      arrTienda: [],
      slNuevo: {},
      arrNuevo: [],
      slLogos: {},
      arrLogos: []
    }
  },
  mounted () {
    this.web = this.$q.platform.is.desktop
    this.baseuPublicidad = env.apiUrl + '/publicidad_img/'
    this.baseuProducto = env.apiUrl + '/producto_files/'
    this.baseuLogos = env.apiUrl + '/perfil_img/'
    this.getLogos()
    this.getPublicidad()
    this.getTienda()
    const value = localStorage.getItem('FLAAG_SESSION_INFO')
    if (value) {
      this.getInfo()
    } else {
      this.login = false
    }
  },
  methods: {
    irRuta (ruta) {
      openURL(ruta)
    },
    irTienda (id) {
      if (this.login) {
        this.$api.get('user_info').then(res => {
          if (res) {
            var mio = res._id
            if (mio === id) {
              this.$router.push('/mi_tienda')
            } else {
              this.$router.push('/tienda/' + id)
            }
          }
        })
      } else {
        this.$router.push('/tienda/' + id)
      }
    },
    getInfo () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
        }
      })
    },
    getTienda () {
      this.$api.get('all_productos').then(res => {
        if (res) {
          this.arrTienda = res
          if (!this.arrTienda.length) {
            this.arrTienda = [{ nombre: 'Nombre Producto', descripcion: 'Descripcion', images: ['nopublicidad.jpg'], valor: 0, caso: true }]
          }
          console.log(this.arrTienda)
          var largo = this.arrTienda.length - 1
          for (let i = 0; i < 25; i++) {
            if (largo >= 0) {
              this.arrNuevo.push(this.arrTienda[largo])
              largo = largo - 1
            }
          }
          // arreglar el slide
          var arr = []
          var cc = 1
          var limit = 0
          if (this.web) {
            limit = 5
          } else {
            limit = 2
          }
          for (let i = 0; i < this.arrNuevo.length; i++) {
            if (arr.length < limit) {
              arr.push(this.arrNuevo[i])
              if (i === this.arrNuevo.length - 1) {
                this.slNuevo['slideN' + cc] = arr
              }
            } else {
              this.slNuevo['slideN' + cc] = arr
              cc = cc + 1
              arr = []
              arr.push(this.arrNuevo[i])
              if (i === this.arrNuevo.length - 1) {
                this.slNuevo['slideN' + cc] = arr
              }
            }
          }
          arr = []
          cc = 1
          if (this.web) {
            limit = 4
          } else {
            limit = 2
          }
          for (let i = 0; i < this.arrTienda.length; i++) {
            if (arr.length < limit) {
              arr.push(this.arrTienda[i])
              if (i === this.arrTienda.length - 1) {
                this.slTienda['slideT' + cc] = arr
              }
            } else {
              this.slTienda['slideT' + cc] = arr
              cc = cc + 1
              arr = []
              arr.push(this.arrTienda[i])
              if (i === this.arrTienda.length - 1) {
                this.slTienda['slideT' + cc] = arr
              }
            }
          }
        }
      })
    },
    getPublicidad () {
      this.$api.get('publicidad').then(res => {
        if (res) {
          this.slPrincipal = res.filter(v => v.tipo === 'principal' && v.enable)
          this.slPublicidad1 = res.filter(v => v.tipo === 'publicidad1' && v.enable)
          this.slPublicidad2 = res.filter(v => v.tipo === 'publicidad2' && v.enable)
          if (!this.slPrincipal.length) {
            this.slPrincipal = [{ tipo: 'principal', enable: true, fileName: 'nopublicidad.jpg', caso: true }]
          }
        }
      })
    },
    getLogos () {
      this.$api.get('proveedores').then(res => {
        if (res) {
          this.arrLogos = res.filter(v => v.status === 1)
          // arreglar el slide
          var arr = []
          var cc = 1
          var limit = 0
          if (this.web) {
            limit = 6
          } else {
            limit = 3
          }
          for (let i = 0; i < this.arrLogos.length; i++) {
            if (arr.length < limit) {
              arr.push(this.arrLogos[i])
              if (i === this.arrLogos.length - 1) {
                this.slLogos['slideL' + cc] = arr
              }
            } else {
              this.slLogos['slideL' + cc] = arr
              cc = cc + 1
              arr = []
              arr.push(this.arrLogos[i])
              if (i === this.arrLogos.length - 1) {
                this.slLogos['slideL' + cc] = arr
              }
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-top: 6px solid $primary
}
</style>
