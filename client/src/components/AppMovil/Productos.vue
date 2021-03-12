<template>
  <q-page>
    <div class="row q-ml-sm justify-around full-width q-gutter-sm">
      <q-card class="column card-style q-mt-sm" style="width:150px;height:300px" v-for="(card, index) in data" :key="index">
        <q-img :src="card.images.length > 0 ? baseu + card.images[0] : 'noimgproducto.png'" style="width: 100%; height: 100px" />
        <q-list dense>
          <q-item align="center">
            <q-item-section>
              <div>{{card.nombre}}
                <q-badge color="primary" text-color="white" :label="`x${card.cantidad}`" style="width:auto" />
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <div class="column full-width">
              <div class="full-width row items-center justify-start">
                <q-icon name="attach_money" color="primary" size="20px" />
                <div class="row items-center justify-around" style="width:70%">
                  <div :class="card.oferta ? 'text-strike text-grey-6':'text-primary text-bold'"> {{card.valor}} </div>
                  <div v-if="card.oferta" class="text-primary text-bold"> {{card.ofertaVal}} </div>
                </div>
              </div>
            </div>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption lines="2">{{card.descripcion}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item style="width:150px" >
            <q-item-section>
              <q-item-label caption lines="1">{{card.categoria_info.nombre}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-card-actions class="row full-width justify-around">
          <div class="row">
            <q-btn dense flat icon="delete" color="negative" @click="$emit('eliminarPro', card._id)" />
            <q-btn dense flat icon="edit" color="primary" @click="$router.push('/producto/' + card._id)" />
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  props: ['data', 'baseu']
}
</script>

<style lang="scss" scoped>
.card-style {
  border-radius: 12px;
}
</style>
