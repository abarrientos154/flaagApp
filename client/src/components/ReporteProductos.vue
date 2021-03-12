<template>
  <q-page>
    <div v-if="data.length > 0" class="row q-ml-sm justify-around full-width q-gutter-sm">
      <q-card class="column card-style q-mt-sm" style="width:200px;height:250px" v-for="(card, index) in data" :key="index">
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
          <q-item class="full-width">
            <div class="fit column text-center text-primary justify-center text-bold text-h6">
              <div class="text-black text-subtitle1">Total:</div>
              <div v-if="!card.oferta"> {{(card.valor * card.cantidad)}} </div>
              <div v-else> {{(card.ofertaVal * card.cantidad)}} </div>
            </div>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  props: ['baseu', 'data']
}
</script>

<style lang="scss" scoped>
.card-style {
  border-radius: 12px;
}
</style>
