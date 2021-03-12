<template>
    <div class="q-my-xl">
        <div class="text-h5 estilo-titulos text-center text-weight-bold q-mx-md q-my-xl">Emprendedores</div>

        <div class="row justify-around">
            <div class="col-4 row justify-center q-mb-xl" v-for="(card, index) in proveedores" :key="index">
                <q-card :class="card.status !== 1 ? 'bg-amber-3 shadow-11 bordes' : 'shadow-11 bordes'" style="width: 330px">
                    <q-img :src="card.perfil ? baseu + card._id : 'noimg.png'" style="width: 322px; height: 200px" @click="$router.push('/proveedor/' + card._id)" />

                    <q-card-section>
                        <div class="row no-wrap items-center">
                            <div class="col text-h6 ellipsis">{{card.nombreEmpresa}}</div>
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="row" style="width:100%">
                            <q-icon class="col-1" name="room" color="blak" style="font-size: 1.3rem;"/>
                            <div class="q-pl-xs text-grey-9 text-subtitle2">{{card.direccionFisica ? card.direccionFisica : 'Dirección'}}</div>
                        </div>
                        <div class="row" style="width:100%">
                            <q-icon class="col-1" name="email" color="blak" style="font-size: 1.3rem;"/>
                            <div class="q-pl-xs text-grey-9 text-subtitle2">{{card.email}}</div>
                        </div>
                        <div class="row" style="width:100%">
                            <q-icon class="col-1" name="phone" color="blak" style="font-size: 1.3rem;"/>
                            <div class="q-pl-xs text-grey-9 text-subtitle2">{{card.telefono}}</div>
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="between">
                        <q-btn-dropdown
                          class="glossy"
                          color="amber"
                          icon="event"
                          text-color="black"
                        >
                          <div class="q-pa-md bg-primary" style="width: 310px">
                            <div class="row justify-around q-gutter-md">
                              <div class="row">
                                <q-icon class="col-1" name="room" color="blak" style="font-size: 1.3rem;"/>
                                <div class="q-pl-sm text-grey-9 text-subtitle2">{{card.hapertura ? card.hapertura : 'Apertura'}}</div>
                              </div>
                              <div class="row">
                                <q-icon class="col-1" name="room" color="blak" style="font-size: 1.3rem;"/>
                                <div class="q-pl-sm text-grey-9 text-subtitle2">{{card.hcierre ? card.hcierre : 'Cierre'}}</div>
                              </div>
                            </div>

                            <q-separator color="black" class="q-my-md" />

                            <q-list>
                              <q-item clickable v-for="(dia, indexD) in card.dias" :key="indexD">
                                <q-item-section>
                                  <q-item-label>{{dia === 0 ? 'Lunes' : dia === 1 ? 'Martes' : dia === 2 ? 'Miércoles' : dia === 3 ? 'Jueves' : dia === 4 ? 'Viernes' : dia === 5 ? 'Sábado' : 'Domingo'}}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </div>
                        </q-btn-dropdown>
                        <div v-if="card.status === 2" class="row q-gutter-md">
                            <q-btn round icon="clear" color="negative" @click="statusProv(card._id, 3)">
                                <q-tooltip content-class="bg-negative text-white" :offset="[10, 10]">Rechazar</q-tooltip>
                            </q-btn>
                            <q-btn round icon="check" color="positive" @click="statusProv(card._id, 1)">
                                <q-tooltip content-class="bg-positive text-white" :offset="[10, 10]">Aprobar</q-tooltip>
                            </q-btn>
                        </div>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      proveedores: []
    }
  },
  mounted () {
    this.getData()
    this.baseu = env.apiUrl + '/perfil_img/'
  },
  methods: {
    getData () {
      this.$api.get('proveedores').then(res => {
        if (res) {
          this.proveedores = res
        }
      })
    },
    statusProv (id, val) {
      this.$api.post('proveedor_status/' + id, { status: val }).then(res => {
        if (res) {
          this.getData()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.estilo-titulos {
  background-color: #fff599;
  width: 300px;
  border-radius: 12px
}
.bordes {
  border-left: 8px solid $primary
}
</style>
