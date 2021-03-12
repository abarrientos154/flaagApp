<template>
  <q-layout>
    <q-page-container class="bg-grey-2">
      <q-page class="row justify-center items-center">
        <q-card class="shadow-3 q-ma-md" style="border-radius:12px;width:400px;">
          <q-card-section>
            <div class="col column items-center justify-center">
                <div class="row justify-center q-my-md">
                  <img src="logo.png" alt="logo" style="width: 50%;height:50%">
                </div>

                <div class="column">
                  <!-- <div class="text-h6 text-grey-9" style="text-align: center">FLAAG</div> -->
                  <div class="q-mt-sm text-primary text-h6">Inicia Sesión</div>
                </div>
            </div>
            <q-form @submit="onSubmit" class="q-gutter-sm q-ma-sm q-mt-lg">
              <div>
                <q-input class="text-bold q-pl-sm" type="email" v-model="form.email" label="Correo electrónico" outlined>
                  <template v-slot:prepend>
                    <q-icon color="primary" name="mail"></q-icon>
                  </template>
                </q-input>
              </div>

              <div>
                <q-input class="text-bold q-pl-sm q-pr-sm q-mt-lg" :type="isPwd ? 'password' : 'text'" v-model="form.password" label="Contraseña" outlined>
                  <template v-slot:prepend>
                    <q-icon color="primary" name="vpn_key"></q-icon>
                  </template>
                  <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer" color="primary" @click="isPwd = !isPwd"/>
                  </template>
                </q-input>
              </div>

              <div class="text-center q-ma-sm">
                <q-btn push color="primary" class="q-mt-sm" label="Iniciar Sesion" :loading="loading" type="submit">
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Cargando...
                  </template>
                </q-btn>
              </div>
              <q-separator inset class="q-mt-lg q-mb-lg" />

              <div class="text-center text-primary text-bold cursor-pointer" @click="$router.push('registro')"> ¿Eres Nuevo? Registrate </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {},
      isPwd: true,
      loading: false
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit () {
      this.$q.loading.show({
        message: 'Iniciando sesión'
      })
      this.$api.post('login', this.form).then(res => {
        if (res) {
          this.$router.push('/inicio')
          this.login(res)
        } else {
          console.log('hubo un error')
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>
<style lang="css" scoped>

</style>
