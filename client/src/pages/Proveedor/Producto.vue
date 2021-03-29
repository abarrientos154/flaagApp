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
        <div class="column">
          <q-btn label="PRUEBA" @click="prueba2()"></q-btn>
          <q-avatar size="80px" icon="add_a_photo" @click="captureImage" text-color="white" class="bg-primary">
          </q-avatar>
          <q-img :src="prueba.data" style="width:100px;height:100px" />
          <p> {{prueba.data}} </p>
        </div>
        <q-dialog v-model="dialog">
          <q-card>
            <q-img :src="test2" style="width:100px;height:100px" />
            <p> {{test2}} </p>
          </q-card>
        </q-dialog>
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
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      dialog: true,
      test: 'instagram.png',
      test2: 'instagram.png',
      prueba: {
        data: 'instagram.png'
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
      imageSrc: null,
      image: null
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
    prueba2 () {
      const file = new File([this.test2], 'image.png', { type: 'image/png' })
      console.log(file, 'fileeee')
      this.dialog = true
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
    async captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          // this.test = this.dataURItoBlob(`data:image/jpeg;base64,${data}`)
          // const file = new File([data], 'image.jpeg', { type: 'image/jpeg' })
          // this.test2 = URL.createObjectURL(file)
          this.prueba.data = data

          var GetFileBlobUsingURL = function (url, convertBlob) {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.responseType = 'blob'
            xhr.addEventListener('load', function () {
              convertBlob(xhr.response)
            })
            xhr.send()
          }

          var blobToFile = function (blob, name) {
            blob.lastModifiedDate = new Date()
            blob.name = name
            return blob
          }

          var GetFileObjectFromURL = function (filePathOrUrl, convertBlob) {
            GetFileBlobUsingURL(filePathOrUrl, function (blob) {
              convertBlob(blobToFile(blob, 'testFile.jpg'))
            })
          }
          var FileURL = data
          GetFileObjectFromURL(FileURL, function (fileObject) {
            console.log(fileObject)
            this.test2 = URL.createObjectURL(fileObject)
            this.dialog = true
          })
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          destinationType: 1,
          encodingType: 0
        }
      )
      /* this.imageSrc = this.test[0]
      this.images.push(this.imageSrc)
      this.imagesSubir.push(URL.createObjectURL(this.imageSrc))
      this.imageSrc = null */
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
.hello {
  width: 300px;
  height: 300px;
  border: 1px solid red;
}
</style>
