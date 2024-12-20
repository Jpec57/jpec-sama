import { writeFileSync } from "fs";
import { printSchema, lexicographicSortSchema } from "graphql";
import schema from "./index";

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync("schema.internal.graphql", schemaAsString);
