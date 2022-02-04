import { Observable } from "./observable";

declare module "./observable" {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>;
  }
}
Observable.prototype.map = function (f) {
  const v = f.apply({ d: "3" }, [this.value]);
  return new Observable(v);
  // return new Observable(f(this.value));
};
