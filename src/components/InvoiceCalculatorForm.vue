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
    <button class="add-button" @click="addInvoiceHandler">Add</button>
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

  private validate() {
    const { name, price, quantity } = this.invoiceForm;

    return name && price && quantity;
  }

  public addInvoiceHandler() {
    if (!this.validate()) {
      return;
    }

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
