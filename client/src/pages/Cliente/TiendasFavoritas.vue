<template>
  <q-page>
    <div class="text-h5 q-ma-lg text-bold">Mis Favoritos</div>
    <div v-if="data.length > 0" class="row q-mt-lg q-gutter-sm q-mb-md justify-around q-ml-xs">
      <q-card style="width:300px;height:350px;border-radius:12px" class="bordes bg-amber-3" v-for="(item, index) in data" :key="index"
      >
        <img :src="item.info_tienda.perfil ? baseuImgTienda + item.info_tienda._id : item.info_tienda.perfilEstatico ? 'logos/' + item.info_tienda.id.toString() + '.jpeg' : 'noimg.png'" style="height:300px; width: 100%"
        />
        <div class="text-center text-bold text-h5"> {{item.info_tienda.nombreEmpresa}} </div>
        <div style="position:absolute;top:5px;left:5px;z-index:2" class="column">
          <q-btn dense color="red" flat icon="favorite" round @click="addFavorito(item.info_tienda._id, index)" />
          <q-btn dense color="black" flat icon="visibility" round @click="$router.push('/tienda/' + item.info_tienda._id)" />
        </div>
      </q-card>
    </div>
    <div v-else>
      <div class="text-h5 text-primary text-center absolute-center"> :( Sin Nada por Aqui </div>
    </div>
  </q-page>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      data: [],
      baseuImgTienda: ''
    }
  },
  mounted () {
    this.obtenerTiendas()
    this.baseuImgTienda = env.apiUrl + '/perfil_img/'
  },
  methods: {
    addFavorito (id, ind) {
      this.$api.delete('favorito/' + id).then(res => {
        this.data.splice(ind, 1)
      })
    },
    obtenerTiendas () {
      this.$api.get('favoritos').then(res => {
        this.data = res
      })
    }
  }
}
</script>

<style>

</style>
