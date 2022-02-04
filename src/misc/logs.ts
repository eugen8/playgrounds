import * as bunyan from "bunyan";

console.log("well hello");

const log = bunyan.createLogger({ name: "myapp" });
log.info("hi");
log.warn({ lang: "fr" }, "au revoir");
