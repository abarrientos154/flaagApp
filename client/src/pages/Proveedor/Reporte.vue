<template>
  <q-page>
    <div class="shadow-3 q-ma-sm q-pa-md">
      <div class="text-h5 text-bold q-ma-lg">Reportes</div>
      <div class="row justify-center q-mt-sm">
        <q-chip @click="select(item)" clickable v-for="(item, index) in reportes" :key="index" :color="item === reporte ? 'primary':''"> {{item}} </q-chip>
      </div>
      <list-pro :data="filtrado" :baseu="baseu" class="full-width"/>
    </div>
  </q-page>
</template>

<script>
import env from '../../env'
import ListPro from '../../components/ReporteProductos'
export default {
  components: {
    ListPro
  },
  data () {
    return {
      baseu: '',
      data: [],
      reporte: 'Todos',
      reportes: ['Todos', 'Diario', 'Semanal', 'Mensual', 'Anual']
    }
  },
  computed: {
    filtrado () {
      return this.data
    }
  },
  async mounted () {
    this.baseu = env.apiUrl + '/producto_files/'
    await this.traerDatos()
  },
  methods: {
    async traerDatos () {
      await this.$api.get('todo').then(res => {
        this.data = res
        console.log(this.filtrado, 'asd')
      })
    },
    select (item) {
      this.reporte = item
    }
  }
}
</script>

<style>

</style>
