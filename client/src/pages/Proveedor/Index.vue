<template>
  <q-page class="fit">
  <div class="text-center text-indigo-7 text-bold text-h5 fuente q-mt-lg shadow-3" style="z-index:1"> ¿Que Quieres Hacer? </div>
   <q-card class="q-mt-xl shadow-up-3 q-ma-sm">
      <q-card-section horizontal style="height:400px">
        <q-card-section style="width:50%" class="bg-primary" @click="$router.push('/productos')">
          <div class="text-center row items-center justify-center fit text-indigo-10 text-h6">
            ir a mi Tienda
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section style="width:50%" class="bg-indigo-7" @click="$router.push('/producto')">
          <div class="text-center row items-center justify-center fit text-primary text-h6">
            Nuevo Producto
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.fuente {
  -webkit-text-stroke: 0px rgb(230, 0, 0); /* width and color */
  font-family: sans; color: yellow;
  padding: 2px;
  border: 0px solid rgb(0, 0, 0);
  border-radius: 12px;
  background-color: $primary;
  margin-left: 10px;
  margin-right: 10px;
}
</style>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 100%
</style>
