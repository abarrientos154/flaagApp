<template>
  <div>
    <div class="bg-primary shadow-3 full-width column justify-center" style="height:80px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;">
      <div class="text-white text-bold text-h6 text-center"> Crea tu Cuenta </div>
      <q-btn color="white" icon="arrow_back" flat style="position:absolute;top:20px;left:10px" label="volver" @click="$router.push('login')" />
    </div>
    <div class="column items-center justify-center q-ma-md">
        <div class="column items-center justify-center">
          <div class="q-mb-md row justify-center">
            <q-img :src="perfil ? perfilImg : 'noimg.png'" style="width:150px;height:150px;border-radius:100%" >
              <div class="absolute-center bg-transparent text-center" style="width: 100%">
                <div class="absolute-center" style="z-index:1">
                  <q-file borderless v-model="perfil" class="button-subir" @input="changePerfil()" accept=".jpg, image/*"
                    @blur="$v.perfil.$touch()"
                  >
                    <q-avatar class="absolute-center cursor-pointer">
                      <q-icon name="cloud_upload" color="white" class="absolute-center" />
                    </q-avatar>
                  </q-file>
                </div>
              </div>
            </q-img>
          </div>
          <div :class="!$v.perfil.$error ? 'text-grey-7' : 'text-negative'" class="text-bold"> SUBE UNA FOTO </div>
        </div>
        <div class="row justify-center q-gutter-xs q-mt-md">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6">
            <q-input v-model="form.name" label="Nombre" outlined
              error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"
            />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6">
            <q-input v-model="form.lastName" label="Apellido" outlined
              error-message="Requerido" :error="$v.form.lastName.$error" @blur="$v.form.lastName.$touch()"
            />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6">
            <q-input v-model="form.email" label="Email" outlined type="email"
              error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"
            />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6">
            <q-input :type="isPwd ? 'password' : 'text'" v-model="password" label="Contraseña" outlined
              error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.password.$error" @blur="$v.password.$touch()">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6">
            <q-input :type="isPwd ? 'password' : 'text'" v-model="repeatPassword" label="Confirmar Contraseña" outlined
              error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-mt-md">
            <q-input v-model="form.direccion" label="Direccion" outlined
            />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-mt-md">
            <q-input v-model="form.telefono" label="Telefono" outlined
            />
          </div>
        </div>
        <div class="col-6 q-my-xl">
          <q-btn color="primary" label="Guardar" style="width: 100%" push @click="registrar()" />
        </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      perfil: null,
      perfilImg: null,
      isPwd: true,
      password: '',
      repeatPassword: ''
    }
  },
  validations: {
    form: {
      name: { required },
      lastName: { required },
      email: { email, required }
    },
    repeatPassword: { sameAsPassword: sameAs('password') },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    perfil: { required }
  },
  methods: {
    async registrar () {
      this.$v.$touch()
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && !this.$v.perfil.$error) {
        this.form.password = this.password
        var formData = new FormData()
        var files = []
        files[0] = this.perfil
        formData.append('perfil', files[0])
        formData.append('dat', JSON.stringify(this.form))
        this.$q.loading.show()
        await this.$api.post('registrar_cliente', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de Flaag, Bienvenido',
              color: 'positive'
            })
            this.$router.push('login')
            this.$q.loading.hide()
          }
        })
      }
    },
    changePerfil () {
      if (this.perfil) { this.perfilImg = URL.createObjectURL(this.perfil) }
    }
  }
}
</script>

<style lang="scss" scoped>
.button-subir {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: #0016b0;
  background-color: $primary;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width: 40px;
}
</style>
