<template>
  <q-page class="bg-primary">
    <div class="absolute-center">
      <div class="text-h6">Producto Agregado Con Exito!</div>
      <div class="text-subtitle1">Que deseas hacer?</div>
      <div class="row q-mt-sm">
       <q-btn label="Agregar Otro" color="positive" icon="add" style="width:200px" @click="$router.push('/producto')" />
       <q-btn label="Salir" color="negative" icon="logout" style="width:200px" class="q-mt-sm" @click="$router.push('/login')" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {

}
</script>

<style>

</style>
