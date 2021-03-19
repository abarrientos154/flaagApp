<template>
  <q-tab-panels v-model="panel" animated class="window-height window-width">
    <q-tab-panel name="splash">
      <div class="window-height window-width column bg-primary absolute-center">
        <div class="fit column items-center justify-center">
          <div class="logo-splash"></div>
          <div class="text-h5 text-bold q-mt-sm text-indigo-9">Bienvenido</div>
        </div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="login">
      <login />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import Login from '../pages/Login'
export default {
  components: {
    Login
  },
  data () {
    return {
      panel: 'splash',
      timer: ''
    }
  },
  mounted () {

  },
  methods: {
    ejecutar () {
      this.panel = 'login'
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  created () {
    console.log('corriendo2')
    this.timer = setInterval(this.ejecutar, 5000)
  },
  cancelAutoUpdate () { clearInterval(this.timer) }
}
</script>

<style>
.logo-splash {
  background: url('../../public/logo.png');
  width:250px;
  height:250px;
  background-size: 100% 100%;
}
</style>
