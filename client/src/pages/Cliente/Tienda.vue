<template>
  <q-page>
    <q-btn v-if="login" :color="favorito ? 'red': 'white' " flat :icon="favorito ? 'favorite' :'favorite_border'" round style="position:absolute;top:5px;right:5px;z-index:1" @click="addFavorito()" />
    <q-img :src="user.perfil ? baseuImgTienda : user.perfilEstatico ? 'logos/' + user.id.toString() + '.jpeg' : 'noimg.png'" style="height:300px; width: 100%" >
      <div class="full-width full-height">
        <div class="row bg-transparent" style="width: 100%">
          <q-btn flat round class="q-ma-xs" icon="keyboard_backspace" color="white" @click="$router.go(-1)" />
        </div>
        <div class="row absolute-center justify-center" style="width:100%">
          <h1 class="text-h4 text-primary text-bold"> {{user.nombreEmpresa ? user.nombreEmpresa : 'Nombre Empresa'}} </h1>
        </div>
      </div>
    </q-img>
    <div>
      <q-scroll-area horizontal style="height: 100px; width: 100%;" class="bg-grey-3"
      >
        <div class="row no-wrap q-mx-md">
            <div class="q-ml-sm column justify-center" style="height: 100px" v-for="(item, index) in categorias" :key="index">
                <q-btn :label="item.nombre" :color="item.active ? 'primary':'white'" :text-color="item.active ? 'white':'primary'" rounded style="height: 60px; width:200px" @click="activarB(index)" />
            </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="text-h5 estilo-titulos text-center text-weight-bold q-mx-md q-my-xl">Productos</div>
    <div class="row justify-around" v-if="filtrarProCa.length > 0">
      <div class="row justify-around q-mb-lg" v-for="(card, index) in filtrarProCa" :key="index">
        <q-card class="bg-amber-3 shadow-11 bordes" style="width: 330px">
          <q-img :src="card.images.length > 0 ? baseu + card.images[0] : 'noimgproducto.png'" style="width: 322px; height: 200px" @click="producto = card, verProducto = true" />
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">{{card.nombre}}</div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row" style="width:100%">
              <q-icon class="col-1" name="description" color="black" style="font-size: 1.3rem;"/>
              <div class="q-pl-xs text-grey-9 text-subtitle2">{{card.descripcion}}</div>
            </div>
            <div class="row" style="width:100%">
              <q-icon class="col-1" name="category" color="black" style="font-size: 1.3rem;"/>
              <div class="q-pl-xs text-grey-9 text-subtitle2">{{card.categoria_info.nombre}}</div>
            </div>
            <div class="row" style="width:100%">
              <q-icon class="col-1" name="zoom_in" color="black" style="font-size: 1.3rem;"/>
              <div class="q-pl-xs text-grey-9 text-subtitle2">{{card.cantidad}}</div>
            </div>
            <div class="row no-wrap items-center">
                <div v-if="!card.oferta" class="col text-subtitle2 ellipsis q-mx-sm">$ . {{card.valor}}</div>
                <div v-if="card.oferta" class="col text-subtitle2 ellipsis q-mx-sm">$ . <strike>{{card.valor}}</strike> - {{card.ofertaVal}}</div>
            </div>
          </q-card-section>

            <q-separator />

          <q-card-actions v-if="!login || rol === 2" align="center">
            <q-btn glossy icon="add_shopping_cart" label="Comprar" color="primary" text-color="black" @click="login ? addCarrito(card) : $router.push('/login')" />
        </q-card-actions>
        </q-card>
      </div>
    </div>
    <div v-else class="row justify-center full-width full-height items-center q-pa-xl">
      <div class="text-h5">
        :( Sin Nada Por Aqui
      </div>
    </div>

    <q-dialog v-model="verProducto">
      <q-card style="width: 100%;">
        <q-card-section class="q-pa-none" style="width: 100%;">
          <DetalleProducto :data="producto" lugar="tienda" @compra="addCarrito" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="verCarrito" full-height>
      <q-card style="width: 100%">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h5 text-bold">Carrito</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item v-for="(producto, index) in carrito" :key="index">
                <q-item-section avatar>
                  <q-icon name="shopping_cart" size="md" />
                </q-item-section>

                <q-item-section>
                <q-item-label class="text-subtitle1">{{producto.nombre}}</q-item-label>
                <div class="q-mt-sm">
                    <q-badge class="text-subtitle2" :color="producto.oferta ? 'positive' : 'teal'" :label="!producto.oferta ? '$. ' + producto.valor : '$. ' + producto.ofertaVal" />
                </div>
                </q-item-section>

                <q-item-section side class="q-mr-md">
                    <q-item-label class="text-weight-bold text-h6">{{producto.cantidad_compra}}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn class="gt-xs" size="12px" flat dense round icon="add" @click="editCantidad(index, true)" />
                        <q-btn class="gt-xs" size="12px" flat dense round icon="remove" @click="editCantidad(index, false)" />
                    </div>
                </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions class="absolute-bottom q-my-md" align="center">
            <q-card class="bordes bg-grey-3 q-pa-sm q-my-md q-mx-md shadow-11" style="width: 100%">
                <div class="row justify-around">
                    <div class="text-h4 text-bold text-primary">Total</div>
                    <div class="text-h4 text-bold text-primary">$ {{totalCarrito}}</div>
                </div>
            </q-card>
            <q-btn :disable="carrito.length ? false : true" @click="test()" glossy icon="add_shopping_cart" label="Comprar" color="primary" text-color="black" size="xl" style="width: 90%" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky v-if="!login || rol === 2" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="shopping_cart" color="primary" @click="verCarrito = true" >
        <q-tooltip>
          Carrito
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import DetalleProducto from '../DetalleProducto'
import env from '../../env'
export default {
  components: { DetalleProducto },
  data () {
    return {
      favorito: false,
      verProducto: false,
      verCarrito: false,
      login: true,
      baseu: '',
      baseuImgTienda: '',
      proveedor_id: '',
      buscar: 0,
      rol: 0,
      data: [],
      carrito: [],
      categorias: [],
      subnivelunoOpciones: [],
      subniveldosOpciones: [],
      subniveltresOpciones: [],
      user: {},
      userLog: {},
      producto: {},
      token: ''
    }
  },
  computed: {
    filtrarProCa () {
      if (this.buscar === 0) {
        return this.data
      } else {
        return this.data.filter(v => v.categoria_id === this.buscar)
      }
    },
    totalCarrito () {
      let total = 0
      if (this.carrito.length > 0) {
        for (const i of this.carrito) {
          if (!i.oferta) {
            total = total + (i.valor * i.cantidad_compra)
          } else {
            total = total + (i.ofertaVal * i.cantidad_compra)
          }
        }
      }
      return total
    }
  },
  async mounted () {
    this.$q.loading.show({
      message: 'Cargando Datos'
    })
    this.baseu = env.apiUrl + '/producto_files/'
    console.log(this.$route.params)
    if (this.$route.params.token) {
      this.token = this.$route.params.token
      this.response = await this.$api.get('get_info_flow/' + this.token)
      await this.getInfoById(this.response.localData.tienda_id)
      await this.getProductosByProveedor(this.response.localData.tienda_id)
      this.proveedor_id = this.response.localData.tienda_id
      console.log(this.response.flow.status)
      if (!this.response.flow.status !== 1 && this.response.localData.status === 0) {
        await this.aprobado()
      }
      console.log(this.token, this.response)
    }
    if (this.$route.params.proveedor_id) {
      this.proveedor_id = this.$route.params.proveedor_id
      this.getInfoById(this.proveedor_id)
      this.getProductosByProveedor(this.proveedor_id)
    }
    if (this.$route.params.producto_id) {
      this.getProducto(this.$route.params.producto_id)
    }
    console.log(this.proveedor_id)
    const value = localStorage.getItem('FLAAG_SESSION_INFO')
    if (!value) {
      this.login = false
    } else {
      this.getInfo()
    }
    if (this.$route.params.proveedor_id && this.login) {
      this.obtenerFavorito()
    }
    this.$q.loading.hide()
  },
  methods: {
    addFavorito () {
      if (this.login) {
        if (this.favorito) {
          this.$api.delete('favorito/' + this.proveedor_id).then(res => {
            this.favorito = res
          })
        } else {
          this.$api.post('favorito/' + this.proveedor_id).then(res => {
            this.favorito = res
          })
        }
      }
    },
    obtenerFavorito () {
      this.$api.get('favorito/' + this.proveedor_id).then(res => {
        this.favorito = res
        console.log('FAVORITOOOO', this.favorito)
      })
    },
    aprobado () {
      this.$api.post('comprar_productos', { carrito: this.response.localData.carrito, token: this.token }).then(res => {
        if (res) {
          console.log('carro', this.carrito)
          this.carrito = []
          this.getProductosByProveedor(this.proveedor_id)
          this.verCarrito = false
          this.$q.notify({
            message: 'Compra realizada con exito',
            color: 'positive',
            positive: 'positive'
          })
        }
      })
    },
    async test () {
      this.$q.loading.show({
        message: 'Iniciando Proceso de Pago'
      })
      const params = {
        commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
        subject: 'Pago de prueba',
        currency: 'CLP',
        amount: this.totalCarrito,
        email: this.userLog.email
      }
      console.log(this.proveedor_id)
      this.$api.post('flow', params).then(async v => {
        if (v) {
          await this.$api.post('store_flow', { token: v.token, tienda_id: this.proveedor_id, user: this.userLog._id, carrito: this.carrito, status: 0 })
          this.$q.loading.hide()
          location.href = v.redirect
        }
        this.$q.loading.hide()
      })
    },
    getInfo () {
      this.$api.get('user_info').then(res => {
        this.userLog = res
        this.rol = res.roles[0]
      })
    },
    editCantidad (index, val) {
      if (val) {
        if (this.carrito[index].cantidad > 0) {
          this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra + 1
          this.carrito[index].cantidad = this.carrito[index].cantidad - 1
        } else {
          this.$q.dialog({
            title: '¡Atención!',
            message: 'Este producto se agotó de la tienda.'
          }).onOk(() => {

          })
        }
      } else {
        if (this.carrito[index].cantidad_compra > 1) {
          this.carrito[index].cantidad_compra = this.carrito[index].cantidad_compra - 1
          this.carrito[index].cantidad = this.carrito[index].cantidad + 1
        } else {
          this.carrito.splice(index, 1)
        }
      }
    },
    addCarrito (val) {
      if (!this.carrito.find(v => v._id === val._id)) {
        var prod = {
          _id: val._id,
          nombre: val.nombre,
          proveedor_id: val.proveedor_id,
          valor: val.valor,
          oferta: val.oferta,
          cantidad: val.cantidad - 1,
          cantidad_compra: 1
        }
        if (val.oferta) {
          prod.ofertaVal = val.ofertaVal
        }
        this.carrito.push(prod)
        prod = {}
        this.$q.notify({
          message: 'Añadido al carrito',
          color: 'positive',
          positive: 'positive'
        })
      } else {
        this.$q.dialog({
          title: '¡Atención!',
          message: 'Ya añadiste este producto al carrito.'
        }).onOk(() => {

        })
      }
    },
    activarB (ind) {
      const indexActual = this.categorias.findIndex(v => v.active)
      this.categorias[indexActual].active = false
      this.categorias[ind].active = true
      this.buscar = ind
    },
    getProducto (id) {
      this.$api.get('producto/' + id).then(res => {
        if (res) {
          this.addCarrito(res)
          this.verCarrito = true
        }
      })
    },
    getInfoById (id) {
      this.$api.post('user_by_id/' + id).then(res => {
        this.user = res
        this.baseuImgTienda = env.apiUrl + '/perfil_img/' + res._id
        this.getCategorias(this.user.id)
      })
    },
    getCategorias (id) {
      this.$api.post('categorias_no_logueado/' + id).then(res => {
        if (res) {
          const cate = res.categoria.map(v => {
            return {
              ...v,
              active: false
            }
          })
          this.categorias.push({
            nombre: 'Todos',
            todos: true
          })
          this.categorias = this.categorias.concat(cate)
          this.categorias[0].active = true
          this.subnivelunoOpciones = res.subniveluno
          this.subniveldosOpciones = res.subniveldos
          this.subniveltresOpciones = res.subniveltres
        }
      })
    },
    getProductosByProveedor (id) {
      this.$api.get('productos/' + id).then(res => {
        if (res) {
          this.data = res
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">
h1 {
  text-shadow: 4px 4px 8px $secondary;
}
.bordes {
  border: 6px solid $primary;
  border-radius: 25px
}
</style>
