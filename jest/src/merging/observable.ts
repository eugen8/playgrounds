export class Observable<T> {
  constructor(v: T) {
    this.value = v;
  }

  value: T;

  getInfo(): string {
    return String(this.value);
  }
}
