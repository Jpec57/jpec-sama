// import builder from "../../builder";
// import { PennylaneCustomerInvoice, Typename } from "../../types/_shared";
// import resolveApiClientPaginatedResponse from "../../utils/resolveApiClientPaginatedResponse";
// import { PennylaneCustomerInvoiceSortFieldEnumType } from "../enums/PennylaneCustomerInvoiceSortField";
// import { MissingApiTokenError } from "../errors";

// builder.queryField("customerInvoices", (t) =>
//   t.connection({
//     type: "FlashCard",
//     description: "A list of flashcards.",
//     args: {
//       sortField: t.arg({
//         type: PennylaneCustomerInvoiceSortFieldEnumType,
//         required: false,
//         description: "The field to sort invoices by."
//       }),
//       ascending: t.arg.boolean({
//         required: false,
//         description: "Whether the sort is ascending or not.",
//         defaultValue: false
//       })
//     },
//     resolve: async (_, args, { sdk }) => {
//       const sort = args.sortField
//         ? (args.ascending ? "" : "-") + args.sortField
//         : undefined;
//       return await resolveApiClientPaginatedResponse<PennylaneCustomerInvoice>(
//         async ({ page, per_page }) => {
//           if (sdk === null) {
//             throw MissingApiTokenError;
//           }
//           // @ts-expect-error type error due to headers
//           return await sdk.customerInvoice.listCustomerInvoices({
//             query: {
//               sort: sort,
//               page,
//               per_page
//             }
//           });
//         },
//         args,
//         Typename.PennylaneCustomerInvoice
//       );
//     }
//   })
// );
