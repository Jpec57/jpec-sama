// import builder from "../../builder";
// import pennylaneCustomerResolver from "../../resolvers/pennylaneCustomerResolver";
// import { PennylaneCustomer } from "../../types/_shared";

// builder.node("PennylaneCustomer", {
//   description: "A Pennylane customer.",
//   id: {
//     resolve: (v: PennylaneCustomer) => v.id
//   },
//   loadOne: (id: string, { sdk }) =>
//     !sdk ? null : pennylaneCustomerResolver(id, sdk),
//   fields: (t) => ({
//     _id: t.int({
//       resolve: (v: PennylaneCustomer) => v.id,
//       description: "The unique identifier of the customer."
//     }),
//     name: t.string({
//       resolve: (v: PennylaneCustomer) => v.name,
//       nullable: false,
//       description: "The name of the customer."
//     }),
//     billing_iban: t.string({
//       resolve: (v: PennylaneCustomer) => v.billing_iban,
//       nullable: true,
//       description: "The billing_iban of the customer."
//     }),
//     payment_conditions: t.string({
//       resolve: (v: PennylaneCustomer) => v.payment_conditions,
//       nullable: false,
//       description: "The payment_conditions of the customer."
//     }),
//     recipient: t.string({
//       resolve: (v: PennylaneCustomer) => v.recipient,
//       nullable: false,
//       description: "The recipient of the customer."
//     }),
//     phone: t.string({
//       resolve: (v: PennylaneCustomer) => v.phone,
//       nullable: false,
//       description: "The phone of the customer."
//     }),
//     reference: t.string({
//       resolve: (v: PennylaneCustomer) => v.reference,
//       nullable: true,
//       description: "The reference of the customer."
//     }),
//     notes: t.string({
//       resolve: (v: PennylaneCustomer) => v.notes,
//       nullable: true,
//       description: "The notes of the customer."
//     }),
//     //TODO check doc
//     vat_number: t.string({
//       resolve: (v: PennylaneCustomer) => v.vat_number?.toString() || "",
//       nullable: false,
//       description: "The vat_number of the customer."
//     }),
//     //TODO check doc
//     reg_no: t.string({
//       resolve: (v: PennylaneCustomer) => v.reg_no?.toString() || "",
//       nullable: false,
//       description: "The reg_no of the customer."
//     }),
//     emails: t.stringList({
//       resolve: (v: PennylaneCustomer) => v.emails,
//       nullable: false,
//       description: "The emails of the customer."
//     }),
//     customer_type: t.string({
//       resolve: (v: PennylaneCustomer) => v.customer_type,
//       nullable: true,
//       description: "The customer_type of the customer."
//     })
//   })
// });
