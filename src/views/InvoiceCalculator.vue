<template>
  <div class="invoice-calculator">
    <div class="invoice-calculator__title">Vue Invoice Calc</div>

    <invoices-calculator-form />

    <invoice-calculator-table :invoices="invoices" />

    <div class="invoice-calculator__summary">
      <invoice-calculator-delete-button />
      <invoice-calculator-summary-total />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { InvoiceInterface } from "@/entities/InvoiceInterface";

import InvoicesCalculatorForm from "@/components/InvoiceCalculatorForm.vue";
import InvoiceCalculatorTable from "@/components/InvoiceCalculatorTable.vue";
import InvoiceCalculatorDeleteButton from "@/components/InvoiceCalculatorDeleteButton.vue";
import InvoiceCalculatorSummaryTotal from "@/components/InvoiceCalculatorSummaryTotal.vue";

const invoicesState = namespace("invoices");

@Component({
  components: {
    InvoicesCalculatorForm,
    InvoiceCalculatorTable,
    InvoiceCalculatorDeleteButton,
    InvoiceCalculatorSummaryTotal,
  },
})
export default class InvoiceCalculator extends Vue {
  @invoicesState.State
  public invoices!: InvoiceInterface[];

  @invoicesState.Action
  public setInvoicesToStore!: (invoicesToStore: InvoiceInterface[]) => void;

  @Watch("invoices", { deep: true })
  invoicesChanged() {
    const stringifiedInvoices = JSON.stringify(this.invoices);
    localStorage.setItem("qit-invoices", stringifiedInvoices);
  }

  mounted() {
    const invoicesFromStorage = localStorage.getItem("qit-invoices");

    if (invoicesFromStorage) {
      this.setInvoicesToStore(JSON.parse(invoicesFromStorage));
    }
  }
}
</script>

<style lang="scss" src="../assets/css/style.scss" />

<style lang="scss" scoped>
.invoice-calculator {
  &__title {
    font-size: 38px;
    font-weight: 500;
    margin-bottom: 30px;
  }

  &__summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__total {
      width: 150px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
    }
  }
}
</style>
