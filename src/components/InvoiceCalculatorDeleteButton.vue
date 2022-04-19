<template>
  <button class="invoice-calculator__button" @click="removeInvoicesHandler">Delete</button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const invoicesState = namespace("invoices");

@Component
export default class InvoiceCalculatorDeleteButton extends Vue {
  @invoicesState.State
  public checkedInvoiceIds!: number[];

  @invoicesState.Action
  public removeInvoicesFromStore!: (invoiceIndexes: number[]) => void;

  public removeInvoicesHandler() {
    this.removeInvoicesFromStore(this.checkedInvoiceIds);
  }
}
</script>

<style scoped></style>
