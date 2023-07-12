import { Logger } from "@types";
import { findByProps } from "@metro/filters";

export const logModule = findByProps("setLogFn").default;
export const cafe_logger: Logger = new logModule("Cafe");
const logger: Logger = new logModule("Vendetta");

export default logger;