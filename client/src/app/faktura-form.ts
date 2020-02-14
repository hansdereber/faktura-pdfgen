import {BehaviorSubject} from "rxjs";
import {WorkItem} from "./forms/expenses/expenses.component";

export class FakturaForm {

  company = new BehaviorSubject<string>("");

  street = new BehaviorSubject<string>("");
  city = new BehaviorSubject<string>("");
  phone = new BehaviorSubject<string>("");
  email = new BehaviorSubject<string>("");
  recName = new BehaviorSubject<string>("");
  recCompany = new BehaviorSubject<string>("");
  recStreet = new BehaviorSubject<string>("");
  recCity = new BehaviorSubject<string>("");

  invNumber = new BehaviorSubject<string>("");
  invDate = new BehaviorSubject<string>("");
  salutation = new BehaviorSubject<string>("");
  preamble = new BehaviorSubject<string>("");
  workItems = new BehaviorSubject<Array<BehaviorSubject<WorkItem>>>([]);
  closing = new BehaviorSubject<string>("");

  taxId = new BehaviorSubject<string>("");
  bankName = new BehaviorSubject<string>("");
  iban = new BehaviorSubject<string>("");
  bic = new BehaviorSubject<string>("");

  getFormData() {
    const formData = new FormData();
    formData.append('company_name', this.company.value);

    formData.append('sender_name', this.company.value);
    formData.append('sender_street', this.street.value);
    formData.append('sender_city', this.city.value);
    formData.append('sender_tele', this.phone.value);
    formData.append('sender_email', this.email.value);
    formData.append('rec_name', this.recName.value);
    formData.append('rec_company', this.recCompany.value);
    formData.append('rec_street', this.recStreet.value);
    formData.append('rec_city', this.recCity.value);

    formData.append('inv_id', this.invNumber.value);
    formData.append('inv_date', this.invDate.value);
    formData.append('txt_salutation', this.salutation.value);
    formData.append('txt_preamble', this.preamble.value);
    formData.append('expenses', FakturaForm.serializeExpenses(this.workItems.value));
    formData.append('txt_closing', this.closing.value);

    formData.append('tax_id', this.taxId.value);
    formData.append('bank_name', this.bankName.value);
    formData.append('bank_iban', this.iban.value);
    formData.append('bank_bic', this.bic.value);

    return formData;
  }

  resetForm() {
    this.company.next("");

    this.street.next("");
    this.city.next("");
    this.phone.next("");
    this.email.next("");

    this.recName.next("");
    this.recCompany.next("");
    this.recStreet.next("");
    this.recCity.next("");

    this.invNumber.next("");
    this.invDate.next("");
    this.salutation.next("");
    this.preamble.next("");
    this.workItems = new BehaviorSubject<Array<BehaviorSubject<WorkItem>>>([]);
    this.closing.next("");

    this.taxId.next("");
    this.bankName.next("");
    this.iban.next("");
    this.bic.next("");
  }

  private static serializeExpenses(arr: Array<BehaviorSubject<WorkItem>>): string {
    return arr.map(subject => subject.value)
      .map(item => {
        return "\\hourrow{" + item.title + "}{" + item.hours + "}{" + item.rate + "}"
      })
      .reduce((prev, curr) => prev + "\n" + curr, "\\feetype{Service}");
  }

  setSampleData() {
    this.company.next("Accelerantoronics");
    this.street.next("Marienplatz 42");
    this.city.next("82917 München");
    this.phone.next("+49 123 4556 3445");
    this.email.next("neuman@example.com");
    this.recName.next("Ada Lovelace");
    this.recCompany.next("Impactful Things");
    this.recStreet.next("Squared Circle 13");
    this.recCity.next("A1 9CD London");
    this.invNumber.next("1062");
    this.invDate.next("31.9.2020");
    this.salutation.next("Sehr geehrtes Impactful Things Team");
    this.preamble.next("für den Monat Januar 2020 erlaube ich mir die folgenden Leistungen in Rechnung zu stellen:");
    this.workItems.next([
      new BehaviorSubject<WorkItem>({
        title: "Install engine",
        hours: 2,
        rate: 80
      }),
      new BehaviorSubject<WorkItem>({
        title: "Implement auto pilot",
        hours: 4,
        rate: 100
      })
    ]);
    this.closing.next("Gemäß §19 UStG ist in dem ausgewiesenen Betrag auf dieser Rechnung keine Umsatzsteuer enthalten. Ich bitte um Überweisung innerhalb der nächsten 30 Tage auf das unten genannte Konto.");
    this.taxId.next("102/9384/756");
    this.bankName.next("GLS Bank Bochum");
    this.iban.next("DE50 4376 5342 6452 6543 00");
    this.bic.next("GENODEM1GLS");
  }

  toJSON() {
    return {
      company: this.company.value,
      street: this.street.value,
      city: this.city.value,
      phone: this.phone.value,
      email: this.email.value,
      recName: this.recName.value,
      recCompany: this.recCompany.value,
      recStreet: this.recStreet.value,
      recCity: this.recCity.value,
      invNumber: this.invNumber.value,
      invDate: this.invDate.value,
      salutation: this.salutation.value,
      preamble: this.preamble.value,
      workItems: [],
      closing: this.closing.value,
      taxId: this.taxId.value,
      bankName: this.bankName.value,
      iban: this.iban.value,
      bic: this.bic.value
    }
  }

  load(loadedForm: any) {
    this.company.next(loadedForm.company);
    this.street.next(loadedForm.street);
    this.city.next(loadedForm.city);
    this.phone.next(loadedForm.phone);
    this.email.next(loadedForm.email);
    this.recName.next(loadedForm.recName);
    this.recCompany.next(loadedForm.recCompany);
    this.recStreet.next(loadedForm.recStreet);
    this.recCity.next(loadedForm.recCity);
    this.invNumber.next(loadedForm.invNumber);
    this.invDate.next(loadedForm.invDate);
    this.salutation.next(loadedForm.salutation);
    this.preamble.next(loadedForm.preamble);
    this.workItems.next([]);
    this.closing.next(loadedForm.closing);
    this.taxId.next(loadedForm.taxId);
    this.bankName.next(loadedForm.bankName);
    this.iban.next(loadedForm.iban);
    this.bic.next(loadedForm.bic);
  }
}
