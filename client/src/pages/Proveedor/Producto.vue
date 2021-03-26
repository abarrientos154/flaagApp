<template>
  <q-page>
    <q-card class="q-ma-sm q-pa-md">
      <q-btn icon="arrow_back" color="primary" @click="$router.go(-1)" flat dense style="position:absolute;top:5px;left:5px" />
      <div class="text-h6 text-grey-7 q-mt-lg"> Agregar Producto </div>
      <div class="row items-center justify-center">
        <!-- <div class="full-width row justify-center col">
          <q-avatar size="100px">
            <div style="z-index:1">
              <q-file borderless v-model="img" class="button-camera" :disable="images.length > 4" @input="insertarImagen()" accept=".jpg, image/*">
                <q-icon name="folder_open" class="absolute-center" size="30px" color="white" />
              </q-file>
            </div>
          </q-avatar>
        </div> -->
        <div class="">
          <q-avatar size="80px" icon="add_a_photo" @click="imagesSubirCordova" text-color="white" class="bg-primary">
          </q-avatar>
        </div>
      </div>
      <div class="text-grey-6">Imagenes del producto (hasta 5 imagenes)</div>
      <q-scroll-area v-if="images && images.length > 0" horizontal style="height:85px; width: 100%;" class="bg-grey-1"
        :thumb-style="thumbStyle" :bar-style="barStyle"
      >
        <div class="no-wrap q-gutter-xs row" v-if="images && images.length > 0">
          <q-img v-for="(item, index) in imagesSubir" :key="index" :src="item" style="height:80px;border-radius:12px;width:110px" >
            <q-btn @click="images.splice(index, 1), imagesSubir.splice(index, 1)" flat class="absolute all-pointer-events" size="15px" dense icon="delete" color="negative" style="top: 0px; left: 0px" rounded />
          </q-img>
        </div>
      </q-scroll-area>
      <div class="row q-pa-sm justify-around">
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
      </div>

      <q-card-actions align="center">
        <q-btn label="guardar" @click="guardar()" color="primary" push style="width:50%" />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="alert.show">
      <q-card>
        <q-card-section>
          <div class="text-h6">DATA CAMARA PRUEBA</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{alert.info}}
          <q-img :src="alert.src" style="width:100px;height:100px" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Plugins, CameraResultType } from '@capacitor/core'
// import randomize from 'randomatic'
const { Camera } = Plugins
export default {
  data () {
    return {
      alert: {
        show: false,
        info: null
      },
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0
      },
      categorias: [],
      subnivelunoOpciones: [],
      subniveldosOpciones: [],
      subniveltresOpciones: [],
      form: {
      },
      images: [],
      imagesSubir: [],
      img: null,
      imageSrc: null
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
  },
  methods: {
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
      this.$q.loading.show({
        message: 'Subiendo su Producto. Por Favor Espere'
      })
      var formData = new FormData()
      var files = this.images
      if (files.length > 0) {
        for (let i = 0; i < this.images.length; i++) {
          formData.append('files' + i, files[i])
        }
        this.form.cantidadFiles = files.length
      } else { this.form.cantidadFiles = 0 }
      formData.append('dat', JSON.stringify(this.form))
      await this.$api.post('producto', formData, {
        headers: {
          'Content-Type': undefined
        }
      }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Producto agregado Correctamente',
            color: 'positive'
          })
          this.$router.push('/producto_guardado')
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    async imagesSubirCordova () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`
          this.alert.show = true
          this.alert.info = data
          this.alert.src = this.imageSrc
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          // camera options
        }
      )
    },
    async dataURItoBlob (dataURI) {
      var byteString = atob(dataURI.split(',')[1])
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeString })
    },
    async blobToFile (theBlob, fileName, type) {
      // A Blob() is almost a File() - it's just missing the two properties below which we will add
      return new File([theBlob], fileName, type)
    },
    async captureImage () {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      })
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      console.log(image, 'imageeeeeeee pluginnnnnnnn')
      this.imageSrc = await this.dataURItoBlob(image.dataUrl)
      console.log(this.imageSrc, 'imgsrc')
      // const codeFile = randomize('Aa0', 30)
      // console.log(codeFile + '.' + image.format, 'radomaticcc')
      // var file = await this.blobToFile(image, codeFile + '.' + image.format, { type: 'image/png' })
      // console.log(file, 'fileeeeeeeeee')
      var file = new File([this.imageSrc], 'image.png')
      console.log(file, 'fileeeeeeeeeeee')
      this.images.push(file)
      this.imagesSubir.push(URL.createObjectURL(this.imageSrc))
      console.log(this.images, 'images', this.imagesSubir, 'images subir')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  background-color: $primary;
  border-radius: 100%;
  height:80px;
  width:80px;
  cursor: pointer;
}
</style>
