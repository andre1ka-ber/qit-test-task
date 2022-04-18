<template>
  <div id="app">
    <invoice-calculator />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InvoiceCalculator from "@/views/InvoiceCalculator.vue";

@Component({
  components: {
    InvoiceCalculator,
  },
})
export default class App extends Vue {}
</script>

<style scoped>
#app {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
