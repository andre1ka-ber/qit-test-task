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
import { InvoiceInterface } from "@/entities/InvoiceInterface";

@Component
export default class InvoiceCalculatorTable extends Vue {
  private checkedInvoices: number[] = [];

  @Prop({ default: [] }) readonly invoices!: InvoiceInterface[];

  get noInvoicesAdded() {
    return this.invoices.length === 0;
  }

  public onInvoiceChange(invoiceId: number, event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.checkedInvoices.push(invoiceId);
    } else {
      const indexToDelete = this.checkedInvoices.indexOf(invoiceId);
      this.checkedInvoices.splice(indexToDelete, 1);
    }

    this.$emit("on-checkbox-change", this.checkedInvoices);
  }

  public toggleAllInvoices() {
    const elements = document.querySelectorAll(".invoice-calculator-table tbody input[type=checkbox]");

    elements.forEach((element) => {
      const inputElement = element as HTMLInputElement;
      inputElement.checked = !inputElement.checked;
    });

    this.checkedInvoices = this.invoices.map((invoice) => invoice.id);

    this.$emit("on-checkbox-change", this.checkedInvoices);
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
