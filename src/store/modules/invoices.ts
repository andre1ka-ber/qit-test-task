import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { InvoiceInterface } from "@/entities/InvoiceInterface";

@Module({ namespaced: true })
class InvoicesModule extends VuexModule {
  public invoices: InvoiceInterface[] = [];

  public checkedInvoiceIds: number[] = [];

  @Mutation
  public pushInvoice(invoice: InvoiceInterface) {
    this.invoices.push(invoice);
  }

  @Mutation
  public removeInvoices(invoiceIds: number[]) {
    invoiceIds.forEach((invoiceId) => {
      const invoiceIndex = this.invoices.findIndex((invoice) => invoice.id === invoiceId);
      this.invoices.splice(invoiceIndex, 1);
    });

    this.checkedInvoiceIds = [];
  }

  @Mutation
  public setCheckedInvoiceIds(invoiceIds: number[]) {
    this.checkedInvoiceIds = invoiceIds;
  }

  @Mutation
  public addCheckedInvoiceId(invoiceId: number) {
    this.checkedInvoiceIds.push(invoiceId);
  }

  @Mutation
  public removeCheckedInvoiceId(invoiceId: number) {
    const idIndex = this.checkedInvoiceIds.indexOf(invoiceId);
    this.checkedInvoiceIds.splice(idIndex, 1);
  }

  @Mutation
  public setInvoices(invoices: InvoiceInterface[]) {
    this.invoices = invoices;
  }

  @Action
  public removeInvoicesFromStore(invoiceIds: number[]) {
    this.context.commit("removeInvoices", invoiceIds);
  }

  @Action
  public addInvoiceToStore(invoice: InvoiceInterface) {
    this.context.commit("pushInvoice", invoice);
  }

  @Action
  public setInvoicesToStore(invoices: InvoiceInterface[]) {
    this.context.commit("setInvoices", invoices);
  }
}

export default InvoicesModule;
