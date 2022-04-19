<template>
  <form @submit.prevent="addInvoiceHandler" class="invoice-calculator-form">
    <input
      v-model="invoiceForm.name"
      type="text"
      placeholder="Product name"
      class="invoice-calculator-form__product-name"
    />
    <input v-model="invoiceForm.price" type="number" placeholder="Price" class="invoice-calculator-form__price" />
    <input v-model="invoiceForm.quantity" type="number" placeholder="Qty" class="invoice-calculator-form__quantity" />
    <button class="add-button" @click="addInvoiceHandler" :disabled="!isFormValid">Add</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { InvoiceInterface } from "@/entities/InvoiceInterface";
import Invoice from "@/entities/Invoice";

const invoicesState = namespace("invoices");

@Component
export default class InvoicesCalculatorForm extends Vue {
  @invoicesState.Action
  public addInvoiceToStore!: (invoice: InvoiceInterface) => void;

  public invoiceForm: InvoiceInterface = new Invoice();

  get isFormValid() {
    const { name, price, quantity } = this.invoiceForm;

    const priceLowerThanZero = price < 0;
    const quantityLowerThanZero = quantity < 0;

    return name && price && quantity && !priceLowerThanZero && !quantityLowerThanZero;
  }

  public addInvoiceHandler() {
    this.addInvoiceToStore(this.invoiceForm);
    this.invoiceForm = new Invoice();
  }
}
</script>

<style lang="scss" scoped>
.invoice-calculator-form {
  margin-bottom: 20px;
  display: flex;

  &__product-name {
    width: 250px;
  }
  &__price,
  &__quantity {
    width: 60px;
  }
  &__product-name,
  &__price {
    margin-right: 20px;
  }
}
</style>
