<template>
  <div class="invoice-calculator__summary__total">
    <div>Total:</div>
    <div v-if="totalInvoicesPrice > 0">{{ totalInvoicesPrice }}$</div>
    <div v-else>-</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { InvoiceInterface } from "@/entities/InvoiceInterface";

const invoicesState = namespace("invoices");

@Component
export default class InvoiceCalculatorSummaryTotal extends Vue {
  @invoicesState.State
  public invoices!: InvoiceInterface[];

  get totalInvoicesPrice() {
    return this.invoices.reduce((acc, invoice) => {
      acc += invoice.price * invoice.quantity;

      return acc;
    }, 0);
  }
}
</script>

<style lang="scss" scoped>
.invoice-calculator__summary__total {
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}
</style>
