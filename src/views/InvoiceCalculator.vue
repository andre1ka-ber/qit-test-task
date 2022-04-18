<template>
  <div class="invoice-calculator">
    <div class="invoice-calculator__title">Vue Invoice Calc</div>

    <invoices-calculator-form />

    <invoice-calculator-table :invoices="invoices" @on-checkbox-change="onCheckboxChange" />

    <div class="invoice-calculator__summary">
      <button class="invoice-calculator__button" @click="removeInvoicesHandler">Delete</button>
      <div class="invoice-calculator__summary__total">
        <div>Total:</div>
        <div>{{ totalInvoicesPrice }}$</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Emit, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { InvoiceInterface } from "@/entities/InvoiceInterface";

import InvoicesCalculatorForm from "@/components/InvoicesCalculatorForm.vue";
import InvoiceCalculatorTable from "@/components/InvoiceCalculatorTable.vue";

const invoicesState = namespace("invoices");

@Component({
  components: {
    InvoicesCalculatorForm,
    InvoiceCalculatorTable,
  },
})
export default class InvoiceCalculator extends Vue {
  private checkedInvoiceIds: number[] = [];

  @invoicesState.State
  public invoices!: InvoiceInterface[];

  @invoicesState.Action
  public removeInvoicesFromStore!: (invoiceIndexes: number[]) => void;

  @invoicesState.Action
  public setInvoicesToStore!: (invoicesToStore: InvoiceInterface[]) => void;

  @Emit()
  onCheckboxChange(invoices: number[]) {
    this.checkedInvoiceIds = invoices;
  }

  public removeInvoicesHandler() {
    this.removeInvoicesFromStore(this.checkedInvoiceIds);
  }

  get totalInvoicesPrice() {
    return this.invoices.reduce((acc, invoice) => {
      acc += invoice.price * invoice.quantity;

      return acc;
    }, 0);
  }

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
