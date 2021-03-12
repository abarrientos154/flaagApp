<template>
  <q-page>
    <div v-if="this.$q.platform.is.mobile" style="position:absolute; top:5px; left: 5px; z-index:1" >
      <q-btn color="white" flat round @click="$router.push('/index_app')" icon="arrow_back" />
    </div>
    <q-img :src="user.perfil ? baseuImgTienda : user.perfilEstatico ? 'logos/' + user.id.toString() + '.jpeg' : 'noimg.png'" style="height:300px; width:" >
      <div class="full-width full-height">
        <div class="row justify-between bg-transparent" style="width: 100%">
          <q-btn flat round class="q-ma-xs" icon="keyboard_backspace" color="white" @click="$router.go(-1)" />
          <q-btn no-caps rounded class="q-ma-xs" label="Editar perfil" icon="edit" color="white" text-color="black" @click="ver()" />
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
    <list-app v-if="this.$q.platform.is.mobile && filtrarProCa.length > 0" :data="filtrarProCa" :baseu="baseu" class="full-width"
      @eliminarPro="confirmEliminar"
     />
    <div class="row justify-around" v-else-if="filtrarProCa.length > 0">
      <div class="row justify-around q-mb-lg" v-for="(card, index) in filtrarProCa" :key="index">
        <q-card class="bg-amber-3 shadow-11 bordes" style="width: 330px">
          <q-img :src="card.images.length > 0 ? baseu + card.images[0] : 'noimgproducto.png'" style="width: 322px; height: 200px" />
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

          <q-card-actions align="between">
            <q-btn label="eliminar" icon="delete" color="negative" @click="confirmEliminar(card._id)" />
            <q-btn label="editar" icon="edit" color="primary" @click="$router.push('/producto/' + card._id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div v-else class="row justify-center full-width full-height items-center q-pa-xl">
      <div class="text-h5">
        :( Sin Nada Por Aqui
      </div>
    </div>
    <q-page-sticky v-if="!admin" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="$router.push('/producto')" >
        <q-tooltip>
          Nuevo Producto
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import env from '../../env'
import ListApp from '../../components/AppMovil/Productos'
export default {
  components: {
    ListApp
  },
  data () {
    return {
      admin: false,
      baseuImgTienda: '',
      data: [],
      buscar: 0,
      proveedor_id: '',
      baseu: '',
      categorias: [],
      subnivelunoOpciones: [],
      subniveldosOpciones: [],
      subniveltresOpciones: [],
      user: {}
    }
  },
  computed: {
    filtrarProCa () {
      if (this.buscar === 0) {
        return this.data
      } else {
        return this.data.filter(v => v.categoria_id === this.buscar)
      }
    }
  },
  mounted () {
    this.ejecutarMounted()
  },
  methods: {
    ejecutarMounted () {
      this.baseu = env.apiUrl + '/producto_files/'
      if (this.$route.params.proveedor_id) {
        this.proveedor_id = this.$route.params.proveedor_id
        this.admin = true
        this.getInfoById(this.proveedor_id)
        this.getProductosByProveedor(this.proveedor_id)
      } else {
        this.getProductos()
        this.getCategorias()
        this.getInfo()
      }
    },
    activarB (ind) {
      const indexActual = this.categorias.findIndex(v => v.active)
      this.categorias[indexActual].active = false
      this.categorias[ind].active = true
      this.buscar = ind
    },
    async getInfo () {
      await this.$api.get('user_info').then(res => {
        this.user = res
        this.baseuImgTienda = env.apiUrl + '/perfil_img/' + res._id
      })
    },
    getInfoById (id) {
      this.$api.post('user_by_id/' + id).then(res => {
        this.user = res
        this.baseuImgTienda = env.apiUrl + '/perfil_img/' + res._id
        this.getCategoriasNoLogueado(this.user.id)
      })
    },
    getCategorias () {
      this.$api.get('categorias_y_sub').then(res => {
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
    getCategoriasNoLogueado (id) {
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
    eliminar (id) {
      this.$q.loading.show()
      this.$api.delete('producto/' + id).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.$q.notify({
            message: 'Eliminado Correctamente',
            color: 'positive'
          })
          this.ejecutarMounted()
          this.activarB(0)
        }
      })
    },
    confirmEliminar (id) {
      this.$q.dialog({
        title: '¡Atención!',
        message: '¿Esta seguro que Quiere Eliminar Este Producto?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.eliminar(id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    getProductos () {
      this.$api.get('productos').then(res => {
        if (res) {
          this.data = res
        }
      })
    },
    ver () {
      if (this.admin) {
        this.$router.push('/perfil_proveedor/' + this.proveedor_id)
      } else {
        this.$router.push('/perfil_proveedor')
      }
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

<style lang="scss">
h1 {
  text-shadow: 4px 4px 8px $secondary;
}
</style>
