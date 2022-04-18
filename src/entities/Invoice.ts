import { InvoiceInterface } from "@/entities/InvoiceInterface";

export default class Invoice implements InvoiceInterface {
  public id = performance.now();

  public name = "";

  public price = 0;

  public quantity = 0;
}
