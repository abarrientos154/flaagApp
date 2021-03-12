<template>
  <div class="window-height window-width column bg-primary">
    <div class="fit column items-center justify-center">
      <div class="logo-splash"></div>
      <div class="text-h5 text-bold q-mt-sm text-indigo-9">Bienvenido</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      timer: ''
    }
  },
  mounted () {
    if (this.$q.platform.is.mobile) {
      console.log('es emprendedor')
    } else {
      console.log('no es emprendedor')
      this.$router.push('inicio')
    }
  },
  methods: {
    ejecutar () {
      this.$router.push('login')
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
