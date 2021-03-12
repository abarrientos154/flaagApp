<template>
  <div style="height:100%;">
      <q-img :src="baseu + perfile" spinner-color="white" style="height: 390px; width: 100%;">
          <div class="row no-wrap justify-between" style="width:100%">
              <div class="col text-h6 text-white text-weight-bolder ellipsis">{{data.datos_proveedor.nombreEmpresa}}</div>
              <q-btn no-caps flat icon="store" label="Ir" color="white" @click="rol !== 1 ? irTienda() : $router.push('/proveedor/' + data.datos_proveedor._id)" />
          </div>
          <div class="row justify-between absolute-bottom" style="width:100%">
            <div class="row no-wrap items-center q-mt-md">
              <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
              <div class="q-pl-md q-pt-xs text-caption">{{data.datos_proveedor.direccionFisica}}</div>
            </div>
            <div class="row no-wrap items-center">
              <q-btn
                v-if="rol === 2"
                @click="login ? addCarrito() : $router.push('/login')"
                fab
                glossy
                text-color="black"
                color="primary"
                icon="add_shopping_cart"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
              >
                <q-tooltip anchor="top middle">
                  Comprar
                </q-tooltip>
              </q-btn>
              <div v-if="!data.oferta" class="col text-subtitle2 ellipsis q-mt-md">$ . {{data.valor}}</div>
              <div v-if="data.oferta" class="col text-subtitle2 ellipsis q-mt-md">$ . <strike>{{data.valor}}</strike> - {{data.ofertaVal}}</div>
            </div>
          </div>
        </q-img>

        <div class="q-pa-sm q-my-sm">
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-weight-bolder">{{data.nombre}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-scroll-area
            horizontal
            style="height: 110px;"
          >
            <div class="row no-wrap" style="width: 100%">
              <q-card @click="perfile = img" v-for="(img, index) in data.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
                <q-img :src="data.images ? baseu + img : 'noimg.png'" spinner-color="white" style="height: 100px; width: 100px" />
              </q-card>
            </div>
          </q-scroll-area>
        </div>

        <div class="q-mx-md q-mt-sm q-mb-lg q-pb-lg">{{data.descripcion}}</div>
  </div>
</template>

<script>
import env from '../env'
export default {
  props: ['data', 'lugar'],
  data () {
    return {
      baseu: '',
      perfile: '',
      rol: 0,
      miTienda: false,
      login: true
    }
  },
  mounted () {
    this.baseu = env.apiUrl + '/producto_files/'
    this.perfile = this.data.images[0]
    const value = localStorage.getItem('FLAAG_SESSION_INFO')
    if (!value) {
      this.login = false
    } else {
      this.getInfo()
    }
  },
  methods: {
    irTienda () {
      if (this.login) {
        this.$api.get('user_info').then(res => {
          if (res) {
            var mio = res._id
            if (mio === this.data.datos_proveedor._id) {
              this.$router.push('/mi_tienda')
            } else {
              this.$router.push('/tienda/' + this.data.datos_proveedor._id)
            }
          }
        })
      } else {
        this.$router.push('/tienda/' + this.data.datos_proveedor._id)
      }
    },
    addCarrito () {
      if (this.lugar === 'tienda') {
        this.$emit('compra', this.data)
      } else {
        this.$router.push('/tienda/' + this.data.proveedor_id + '/' + this.data._id)
      }
    },
    getInfo () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border: 6px solid $primary
}
</style>
