import * as development from "./development";
import * as staging from "./staging";

const config = {
	development,
	staging
}[process.env.NODE_ENV || "development"];

export default config;
