import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FakturaService {

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
  closing = new BehaviorSubject<string>("");

  taxId = new BehaviorSubject<string>("");
  bankName = new BehaviorSubject<string>("");
  iban = new BehaviorSubject<string>("");
  bic = new BehaviorSubject<string>("");

  private serviceUrl: string = '/api/';

  constructor(private httpClient: HttpClient) {
  }

  generatePdf(): Observable<Blob> {
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
    formData.append('txt_closing', this.closing.value);
    formData.append('tax_id', this.taxId.value);
    formData.append('bank_name', this.bankName.value);
    formData.append('bank_iban', this.iban.value);
    formData.append('bank_bic', this.bic.value);

    return this.httpClient.request('POST', this.serviceUrl, {responseType: 'blob', body: formData});
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
    this.closing.next("Gemäß §19 UStG ist in dem ausgewiesenen Betrag auf dieser Rechnung keine Umsatzsteuer enthalten. Ich bitte um Überweisung innerhalb der nächsten 30 Tage auf das unten genannte Konto.");

    this.taxId.next("102/9384/756");
    this.bankName.next("GLS Bank Bochum");
    this.iban.next("DE50 4376 5342 6452 6543 00");
    this.bic.next("GENODEM1GLS");
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
    this.closing.next("");

    this.taxId.next("");
    this.bankName.next("");
    this.iban.next("");
    this.bic.next("");
  }
}
