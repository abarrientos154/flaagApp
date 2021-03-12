<template>
  <q-page>
    <q-card class="q-ma-sm q-pa-md">
      <q-btn icon="arrow_back" color="primary" @click="$router.go(-1)" flat dense style="position:absolute;top:5px;left:5px" />
      <div class="text-h6 text-grey-7 q-mt-xl"> Editar Producto </div>
      <div class="row q-pa-sm justify-around q-mt-md">
        <div class="full-width q-pa-sm">
          <q-input v-model="form.nombre" label="Nombre" outlined
          />
        </div>
        <div class="full-width q-pa-sm">
          <q-input v-model="form.descripcion" label="Descripcion" outlined type="textarea"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm">
          <q-select v-model.number="form.categoria_id" label="Categoria" outlined :options="categorias" map-options emit-value @input="reiniciarCat(1)"
          option-value="id" option-label="nombre"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm" v-if="optionNivelUno.length > 0">
          <q-select v-model.number="form.subniveluno_id" label="SubCategoria A" outlined :options="optionNivelUno" map-options emit-value @input="reiniciarCat(2)"
          option-value="id" option-label="nombre"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm" v-if="optionNivelDos.length > 0">
          <q-select v-model.number="form.subniveldos_id" label="SubCategoria B" outlined :options="optionNivelDos" map-options emit-value @input="reiniciarCat(3)"
          option-value="id" option-label="nombre"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm" v-if="optionNivelTres.length > 0">
          <q-select v-model.number="form.subniveltres_id" label="SubCategoria B" outlined :options="optionNivelTres" map-options emit-value
          option-value="id" option-label="nombre"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm">
          <q-input v-model.number="form.cantidad" label="Cantidad" outlined type="number"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm">
          <q-input v-model.number="form.valor" label="Valor" outlined type="number"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm">
          <div class="row justify-start">
            <q-checkbox v-model="oferta" label="¿Oferta?" @input="form.oferta = oferta" />
            <q-input v-if="oferta" v-model.number="form.ofertaVal" label="Valor Oferta" outlined type="number" class="q-ml-md" style="width:55%"
            />
          </div>
        </div>
        <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pa-sm" v-if="oferta">
          <div>
            <q-input outlined v-model="form.ofertaDate" label="Fecha Inicio Oferta" readonly>
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer" color="primary">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.ofertaDate" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer" color="primary">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="form.ofertaDate" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="column shadow-3 q-mt-md">
        <div class="text-center text-grey-6 q-mt-lg">Imagenes del Producto (Hasta 5 imagenes)</div>
        <div class="row full-width q-pa-md items-center">
          <div class="q-gutter-xs row" v-if="form.images && form.images.length > 0">
            <q-img v-for="(item, index) in form.images" :key="index" :src="rutaCargarImgs + item" style="height:100px;border-radius:12px;width:140px" >
              <q-btn @click="confirmEliminar(item)" flat class="absolute all-pointer-events" size="15px" dense icon="delete" color="negative" style="top: 0px; left: 0px" rounded />
            </q-img>
          </div>
          <div v-if="form.images && form.images.length < 5"  class="column shadow-3 justify-center items-center q-ma-sm q-ml-sm bg-grey-2" style="height:100px;border-radius:12px;width:140px">
            <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Agregar Imagen</div>
            <q-avatar size="50px">
              <div style="z-index:1">
                <q-file borderless v-model="img" class="button-camera" @input="addImg()" accept=".jpg, image/*">
                  <q-icon name="add" class="absolute-center" size="20px" color="white" />
                </q-file>
              </div>
            </q-avatar>
          </div>
        </div>
      </div>

      <q-card-actions align="center">
        <q-btn label="guardar" @click="guardar()" color="primary" push style="width:50%" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      ofertaDate: null,
      oferta: false,
      rutaCargarImgs: '',
      producto_id: this.$route.params.id,
      categorias: [],
      subnivelunoOpciones: [],
      subniveldosOpciones: [],
      subniveltresOpciones: [],
      form: {
      },
      images: [],
      imagesSubir: [],
      img: null
    }
  },
  computed: {
    optionNivelUno () {
      return this.subnivelunoOpciones.filter(v => v.categoria_id === this.form.categoria_id)
    },
    optionNivelDos () {
      return this.subniveldosOpciones.filter(v => v.subniveluno_id === this.form.subniveluno_id)
    },
    optionNivelTres () {
      return this.subniveltresOpciones.filter(v => v.subniveldos_id === this.form.subniveldos_id)
    }
  },
  mounted () {
    this.getCategorias()
    this.getProducto()
    this.rutaCargarImgs = env.apiUrl + '/producto_files/'
  },
  methods: {
    async addImg () {
      this.$q.loading.show()
      if (this.img) {
        var formData = new FormData()
        var files = []
        files[0] = this.img
        formData.append('files', files[0])
        await this.$api.post('subir_archivo_producto/' + this.producto_id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$q.loading.hide()
          this.form.images = res.images
        })
      }
    },
    eliminarImg (nameFile) {
      this.$q.loading.show()
      this.$api.delete('eliminar_archivo_producto/' + nameFile + '/' + this.producto_id).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.form.images = res.images
        }
      })
    },
    confirmEliminar (nameFile) {
      this.$q.dialog({
        title: '¡Atención!',
        message: '¿Esta seguro que Quiere Eliminar Esta Imagen?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.eliminarImg(nameFile)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    reiniciarCat (ind) {
      if (ind === 1) {
        delete this.form.subniveluno_id
        delete this.form.subniveldos_id
        delete this.form.subniveltres_id
      } else if (ind === 2) {
        delete this.form.subniveldos_id
        delete this.form.subniveltres_id
      } else if (ind === 3) {
        delete this.form.subniveltres_id
      }
    },
    async guardar () {
      this.$q.loading.show()
      await this.$api.put('producto/' + this.producto_id, this.form).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Guardado Correctamente',
            positive: 'positive'
          })
          this.$router.go(-1)
        }
      })
      this.$q.loading.hide()
    },
    insertarImagen () {
      this.images.push(this.img)
      this.imagesSubir.push(URL.createObjectURL(this.img))
      this.img = null
    },
    getCategorias () {
      this.$api.get('categorias_y_sub').then(res => {
        if (res) {
          this.categorias = res.categoria
          this.subnivelunoOpciones = res.subniveluno
          this.subniveldosOpciones = res.subniveldos
          this.subniveltresOpciones = res.subniveltres
        }
      })
    },
    getProducto () {
      this.$api.get('producto/' + this.producto_id).then(res => {
        if (res) {
          this.form = res
          if (!res.oferta) {
            this.oferta = false
          } else {
            this.oferta = true
          }
        }
      })
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
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  background-color: $primary;
  border-radius: 30px;
  border: 1px solid #6a6a6a;
  height:40px;
  width:40px;
  cursor: pointer;
}
</style>
