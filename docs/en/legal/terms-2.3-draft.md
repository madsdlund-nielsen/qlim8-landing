# Terms of sale, version 2.3 (draft)

> **DRAFT: needs the owner's and the lawyer's approval** (Danish marking: "UDKAST: kræver ejerens og advokatens godkendelse"). The text is not published and is not shown on qlim8.com. It lives here because `docs/` is never served, and it takes effect only when it is copied into `src/content/copy/legal.ts` after approval. Version 2.2, which is in `legal.ts` today, is unchanged.
>
> Written: 2026-11-16 · Starting point: version 2.2 (`LEGAL_TERMS_COPY`, `TERMS_EFFECTIVE` = 26 October 2026) · Danish original, with the complete text: [`docs/da/legal/handelsbetingelser-2.3-udkast.md`](../../da/legal/handelsbetingelser-2.3-udkast.md)
>
> The legal text is Danish and the Danish file is the one the lawyer reads. This English twin carries the explanation, the open questions and an English rendering of **the clauses that change**. Clauses it does not list are unchanged from 2.2 and are not translated here (the English reading of 2.2 is not kept in this repository).

## Why 2.3

The paid signup flow in the app changes (account first, then company, then payment on qlim8's own page) and so does the catalog (catalog version 4):

- Komplet is bought by itself in the Service, by card or by invoice, as Basis and Udvidet are today.
- Udvidet no longer has a trial.
- The first invoice payment on Komplet has 8 days to pay and locks at the due date.

Version 2.2 says the opposite on those points (Komplet and Koncern are "agreed after a dialogue", Udvidet has a 14-day trial, invoices are net 30, and only Basis and Udvidet are cancelled in the app).

## The owner's decisions, as they enter the text

| Decision | Where in the text |
|---|---|
| No trial on Udvidet. | The definition "Prøveperiode" (Trial Period) goes; clauses 3.2, 4.2, 5 (heading, 5.3, 5.6, 5.7, 5.8) and 8.2 |
| Komplet is bought by itself, by card or by invoice. Koncern is still agreed after a dialogue. | Clauses 3.2, 4.2, 4.3, 4.5, 8.2, 8.3 |
| Self-serve invoice: 8 days to pay, access from issue. Koncern and agreed deals: net 30. | Clause 8.3 (a) and (b), the definition "Selvbetjent faktura" (Self-serve Invoice) |
| The first self-serve invoice locks at the due date (grace 0). Everything else keeps the 7 days. Reminders 3 days and 1 day before due. "Payment is deemed received when it is registered with the Supplier." Once per invoice the Customer may declare "Vi har betalt" (we have paid), which postpones the lock by 3 days. | Clause 8.5 and the new 8.5a |
| Self-serve Komplet is cancelled like Basis and Udvidet: by the customer, in the app, effective at the end of the period. Koncern and deals agreed after a dialogue keep 3 months' notice. The renewal notice (about 4 months before) is not sent for self-serve Komplet. | Clauses 9.2 and 9.3 |
| Cancel the purchase while the first self-serve invoice is unpaid: the subscription ends, the invoice is voided, and the organisation continues on Gratis. | New clause 9.5a |
| Self-serve invoice only for a Danish company with an active CVR number found in the register, once per company. | Clause 8.3 (a) |
| An upgrade from a card subscription to Komplet is paid by card. | Clause 4.5 |

## Clause by clause

Clauses not listed are unchanged from 2.2. The numbering is the same as in 2.2, so references elsewhere (the data processing agreement, the privacy policy) still hit the same clause. New paragraphs are called 8.5a and 9.5a so that no other number moves.

| Clause | Change |
|---|---|
| Definitions | "Prøveperiode" goes. "Ordrebekræftelse" (order confirmation) is reworded (a written offer after a dialogue applies to Koncern and to Komplet agreed that way). New definitions: "Selvbetjent faktura" and "Første selvbetjente faktura" (the first self-serve invoice). |
| 3.2 | Komplet is bought in the Service by card or by invoice. Access to Komplet by invoice from issue. Koncern after a dialogue. The trial is no longer mentioned. |
| 4.2 | Basis, Udvidet and Komplet are bought by the customer and paid by card (Komplet also by invoice). No trial. |
| 4.3 | Only Koncern, and Komplet when agreed after a dialogue, are agreed and invoiced. |
| 4.5 | Upgrade to Komplet (by card) in addition to Basis to Udvidet. |
| 5 | The heading loses "Prøveperiode". The old 5.3 (Udvidet, trial) is replaced by a new 5.3: no trial and no intro period on Udvidet and Komplet; an intro period from Gratis ends on purchase. 5.6, 5.7 and 5.8 lose their references to the trial. The numbering is kept. |
| 8.2 | Card payment also covers Komplet. The charge "at the end of the trial" goes. |
| 8.3 | Split: (a) a self-serve invoice on Komplet, 8 days, access from issue, card through the payment link; (b) Koncern and agreed deals, net 30 as in 2.2. |
| 8.5 | Text unchanged (7 days). See 8.5a. |
| 8.5a (new) | The first self-serve invoice locks at the due date. Reminders. "Deemed received when registered." "Vi har betalt" postpones the lock by 3 days, once per invoice. |
| 9.2 | Now also covers Komplet bought in the Service. |
| 9.3 | Only Koncern and Komplet agreed after a dialogue. No renewal notice for self-serve Komplet. |
| 9.5a (new) | Cancelling a purchase by invoice before the first invoice is paid. |

## For the owner and the lawyer

1. **Was 2.2 ever signed off?** Its own header calls it a draft, yet it is published and renders on qlim8.com today. That decides whether 2.3 is a change to an approved text (clause 18) or the first approval.
2. **May the trial come off before 2.3?** Clause 5.7 says the Supplier may change the periods for future customers. The plan's default is no: the trial goes on the same day 2.3 takes effect. The owner has confirmed that no trial is running today.
3. **Clause 18.1 (30 days' notice).** The changes do not put existing customers in a worse position (Komplet becomes easier to buy, and the short term and the lock apply only to the first self-serve invoice). The lawyer should confirm that no notice is needed, and whether current users must accept 2.3 again when `CURRENT_TERMS_VERSION` in the app is raised.
4. **The lock at the due date (clause 8.5a).** No grace after the due date is the owner's wish. The risk is a paying customer who pays by bank transfer on day 7 or 8 and is locked before the payment is registered (DKK transfers cannot be matched automatically). The text's mitigations: card payment through the payment link, reminders, and "Vi har betalt" (3 days' postponement, once). The lawyer should assess the wording "deemed received when registered" and the lock as a remedy.
5. **Cancelling a purchase by invoice (clause 9.5a).** The owner's accountant should confirm that a cancelled unpaid invoice may be voided rather than trigger a credit note.
6. **Upgrade to Komplet (clause 4.5).** The text assumes an upgrade to Komplet works as Basis to Udvidet does today (a new subscription period from the upgrade day, the unused part credited). That has to be confirmed against the payment flow before the text is approved.
7. **Date.** "Effective from" and `TERMS_EFFECTIVE` are set on the day 2.3 is published. The data processing agreement and the privacy policy show the same version date (`legal.ts` uses `TERMS_EFFECTIVE` in all three), but the agreement's text is unchanged.

## On the day of approval

1. Landing: copy the Danish text into `LEGAL_TERMS_COPY.bodyHtml` in `src/content/copy/legal.ts` (as HTML, removing the italic marks), and set `TERMS_EFFECTIVE` and the version numbers to 2.3 (the three `Version: 2.2` lines for the terms, the privacy policy and the data processing agreement all use `TERMS_EFFECTIVE`).
2. App: raise `CURRENT_TERMS_VERSION` in `shared/entitlements/signup.ts` to the date.
3. Landing: change the cancellation answer in the pricing FAQ (`src/content/copy/pricing.ts`, "Komplet og Koncern har tre måneders varsel") to match clauses 9.2 and 9.3. It is deliberately not changed yet, because it would otherwise contradict the terms that apply.
4. App: publish catalog version 4 in Admin, last.
5. The privacy policy in `/admin` (next section).

## The privacy policy (edited in `/admin`, not in `legal.ts`)

`page.legal.privacy` is published in the CMS (updated 2026-10-16) and wins over the bundled text, so the changes have to be made in `/admin`. The bundled text in `legal.ts` can be changed at the same time so the two do not drift. The places in the bundled text:

| Place in `legal.ts` | Current wording (excerpt) | Proposal |
|---|---|---|
| List of when we process data (about line 229) | "køber en pakke, får en introperiode eller prøveperiode eller modtager en faktura fra os." | "køber en pakke, får en introperiode eller modtager en faktura fra os." |
| Heading 3.6 | "Køb, introperiode, prøveperiode og betaling" | "Køb, introperiode og betaling" |
| 3.6, what we store | "...hvornår en introperiode eller prøveperiode udløber, og fakturaerne." | "...hvornår en introperiode udløber, og fakturaerne." |
| 3.6, used offers | "(introperiode, prøveperiode eller opgraderingsrabat)" | "(introperiode eller opgraderingsrabat)" |
| 3.6, invoice | "Ved Komplet og Koncern: fakturamodtagerens e-mail og et eventuelt indkøbsordrenummer." | "Ved faktura (Komplet og Koncern): fakturamodtagerens e-mail og et eventuelt indkøbsordrenummer." |
| Legal basis (about line 286) | "Køb, introperiode, prøveperiode, betaling og frivillig introsamtale" | "Køb, introperiode, betaling og frivillig introsamtale" |

If the lawyer wants it, also add that a self-serve invoice is checked against the CVR register (that the company is Danish and active), and that we record that the company has used its one self-serve invoice (the offer marker `self_serve_invoice`, same purpose and legal basis as the other used offers). Afterwards run `npm run test:contract` in the landing repository.

## The clauses that change, in English

This is a working translation for the owner. The Danish text is the one that is approved and published. Changed clauses are marked (changed), (new) or (removed).

**Definitions**

- (removed) **"Prøveperiode" (Trial Period):** The free period (at the time of these terms 14 days) that precedes the first Subscription Period on Udvidet, cf. clause 5.
- (changed) **"Ordrebekræftelse" (Order Confirmation):** On a purchase in the Service, the receipt and invoice the Customer receives by e-mail. For Koncern, and for Komplet when it is agreed after a dialogue, the written offer or confirmation that states the Package, the price and special terms.
- (new) **"Selvbetjent faktura" (Self-serve Invoice):** The invoice on Komplet that the Customer orders in the Service and pays by invoice instead of by card, cf. clauses 3.2 and 8.3. **"Første selvbetjente faktura" (First Self-serve Invoice)** is the first invoice the Customer receives in that way.

**3. Account and formation of the agreement**

- (changed) 3.2 Basis, Udvidet and Komplet are bought in the Service. Basis and Udvidet are paid by the payment card the Customer provides before the Customer gets access to the Service on that Package, and the agreement is formed when the purchase is completed. For Komplet the Customer may pay by card in the same way, or by invoice under clause 8.3. If the Customer chooses invoice, the agreement on Komplet is formed, and the Customer gets access to Komplet, when the Supplier has issued the First Self-serve Invoice in the Service. If the Customer chooses not to complete the payment, the Customer may continue on the Gratis package instead. Koncern is agreed after a dialogue with the Supplier, and the agreement is formed when the Customer accepts the offer or the Order Confirmation. The Supplier may also agree Komplet after a dialogue if the Customer prefers.

**4. Packages**

- (changed) 4.2 **Basis**, **Udvidet** and **Komplet** are bought by the Customer in the Service and paid by card, and Komplet may also be paid by invoice, cf. clause 8.3. Payment is made at the purchase. There is no Trial Period.
- (changed) 4.3 **Koncern** is agreed after a dialogue with the Supplier and paid by invoice. Komplet, when agreed after a dialogue, is also paid by invoice. Koncern and Komplet have no Intro Period.
- (changed) 4.5 The Customer may at any time upgrade in the Service from Basis to Udvidet or Komplet and from Udvidet to Komplet. An upgrade is paid by the payment card the Customer has provided. The upgrade takes effect at once and starts a new Subscription Period of 12 months for the new Package from the day of the upgrade, with the unused part of the previous subscription credited. The upgrade discount in clause 5.5 may apply. A downgrade takes effect at the end of the current Subscription Period.

**5. Intro Period and upgrade discount** (the heading loses "Trial Period")

- (changed) 5.3 **Udvidet and Komplet.** There is no Trial Period and no Intro Period on Udvidet and Komplet. The Customer provides a payment card (or, for Komplet, orders an invoice under clause 8.3) before the Customer gets access, and the yearly price is charged or invoiced at once. If the Customer buys Udvidet or Komplet, an Intro Period from the Gratis package that is running ends.
- (changed) 5.6 **Once per registration number.** The Intro Period on Gratis, the Intro Period on Basis and the upgrade discount may each be used only once per registration number, across organisations. The Supplier may refuse an offer sought by false information or by creating several organisations for the same company.
- (changed) 5.7 **Length and content.** The periods and the size of the discount appear on the package page and at sign-up or purchase. The Supplier may change them for future customers. Only Gratis and Basis have an Intro Period.
- (changed) 5.8 **Intro call.** The Supplier may invite the Customer to a free, short intro call. The call is voluntary and is not a condition for an Intro Period or a discount.

**8. Price and payment**

- (changed) 8.2 When the Customer pays by card, Basis, Udvidet and Komplet are paid yearly in advance by payment card through the Supplier's payment provider (Stripe). The Customer authorises the Supplier to charge the yearly price at the purchase and then at each renewal. A receipt and an invoice are sent by e-mail and can be downloaded in the Service.
- (changed) 8.3 Payment by invoice:
  - (a) (new) **Komplet bought in the Service by invoice.** If the Customer chooses invoice, the Supplier issues the First Self-serve Invoice at once and sends it to the e-mail address the Customer has given. The invoice is for the yearly price in advance and falls due 8 days from the invoice date. The Customer gets access to Komplet when the invoice has been issued. The invoice can be paid by bank transfer or by card through the payment link on the invoice. Payment by invoice in the Service can be chosen by a Danish company with an active CVR number, and only once per registration number. Later purchases are paid by card.
  - (b) **Koncern and agreements after a dialogue.** Koncern, and Komplet when agreed after a dialogue, are invoiced yearly in advance and paid by bank transfer. The payment terms are net 30 days from the invoice date unless the Order Confirmation says otherwise.
- (new) 8.5a **The First Self-serve Invoice.** No grace period after the due date applies to the First Self-serve Invoice: if it is not paid at the due date, the organisation is locked as described in clause 4.6 until payment is made. The Supplier sends a reminder 3 days and 1 day before the due date. Payment is deemed received when it is registered with the Supplier. A card payment through the payment link is registered at once, whereas a bank transfer is received only when the Supplier has registered it. If the Customer has paid by bank transfer and the payment is not yet registered, the Customer may once per invoice declare in the Service that payment has been made ("Vi har betalt"). The lock is then postponed by 3 days so that the payment can be registered, and the Supplier is notified. The 7-day period in clause 8.5 applies to all other payments, including renewals of a subscription that was first bought by invoice.

**9. Subscription Period, renewal and cancellation**

- (changed) 9.2 Basis, Udvidet and Komplet bought in the Service (by card or by invoice) may be cancelled at any time in the Service under Account (Manage subscription) or in writing to kontakt@qlim8.com. The cancellation takes effect at the end of the current Subscription Period.
- (changed) 9.3 Koncern, and Komplet when agreed after a dialogue, may be cancelled in writing to kontakt@qlim8.com with at least 3 months' notice to the end of the current Subscription Period. About 4 months before the end the Supplier sends a renewal notice to the Customer's invoice recipient and administrators with the renewal date, the price and the last date for cancellation. The renewal notice is not sent for Komplet bought in the Service.
- (new) 9.5a **Cancelling a purchase by invoice.** As long as the First Self-serve Invoice on Komplet has not been paid, the Customer may cancel the purchase in the Service. The subscription then ends at once, the invoice is voided, and the organisation continues on the Gratis package, cf. clause 9.5. If the invoice has been paid, clause 9.2 applies.
