import { Observable } from "./observable";
import "./map";

const o: Observable<number> = new Observable(32);
const o3: Observable<Number> = o.map((x) => {
  console.log("f - working on this = ", this);
  console.log(`x = ${x}`);
  return x * 3;
});

console.log(o.getInfo());
console.log(o3.getInfo());
