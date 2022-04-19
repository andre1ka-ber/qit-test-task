<template>
  <table class="invoice-calculator-table" border="1">
    <thead>
      <tr>
        <td>
          <input type="checkbox" @change="toggleAllInvoices" />
        </td>
        <td>Product name</td>
        <td>Price</td>
        <td>Qta</td>
        <td>Sum</td>
      </tr>
    </thead>
    <tbody>
      <tr v-if="noInvoicesAdded">
        <td colspan="5">
          <div class="invoice-calculator-table__no-invoices-added">No invoices added yet</div>
        </td>
      </tr>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <td><input type="checkbox" @change="onInvoiceChange(invoice.id, $event)" /></td>
        <td>{{ invoice.name }}</td>
        <td>{{ invoice.price }}</td>
        <td>{{ invoice.quantity }}</td>
        <td>{{ invoice.quantity * invoice.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { InvoiceInterface } from "@/entities/InvoiceInterface";

const invoicesState = namespace("invoices");

@Component
export default class InvoiceCalculatorTable extends Vue {
  @Prop({ default: [] }) readonly invoices!: InvoiceInterface[];

  @invoicesState.Mutation
  public addCheckedInvoiceId!: (id: number) => void;

  @invoicesState.Mutation
  public removeCheckedInvoiceId!: (id: number) => void;

  @invoicesState.Action
  public setCheckedInvoiceIds!: (ids: number[]) => void;

  get noInvoicesAdded() {
    return this.invoices.length === 0;
  }

  public onInvoiceChange(invoiceId: number, event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.addCheckedInvoiceId(invoiceId);
      return;
    }

    this.removeCheckedInvoiceId(invoiceId);
  }

  public toggleAllInvoices() {
    const elements = document.querySelectorAll(".invoice-calculator-table tbody input[type=checkbox]");

    elements.forEach((element) => {
      const inputElement = element as HTMLInputElement;
      inputElement.checked = !inputElement.checked;
    });

    const ids = this.invoices.map((invoice) => invoice.id);

    this.setCheckedInvoiceIds(ids);
  }
}
</script>

<style lang="scss" scoped>
.invoice-calculator-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 20px;

  &__no-invoices-added {
    text-align: center;
  }
}
</style>
