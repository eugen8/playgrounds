// eslint-disable-next-line max-classes-per-file
describe('ClassDecorator', () => {
  // eslint-disable-next-line no-unused-vars
  function sealed<T extends { new (...args: any[]): {} }>(constructor: T) {
    const x = class extends constructor {
      reportingUrl = 'http://example.com';
    };
    console.log(x);
    // Object.seal(constructor);
    // Object.seal(constructor.prototype);
    const properties = Object.getOwnPropertyNames(constructor.prototype);

    const filtered = properties.filter((p) => /(^do.*)/.test(p));
    console.log(filtered);

    //use Object.defineProperty
    // ...
  }

  @sealed
  class BugReport {
    type = 'report';

    title: string;

    age: number | undefined;

    constructor(t: string) {
      this.title = t;
    }

    doSomeWork(arg1: string) {
      return `Hello, ${this.type} with arg1: ${arg1}`;
    }

    doSomeWorkToo(arg1: string) {
      return `done some work for ${arg1} titled ${this.title}`;
    }

    throwSomeEx(arg1: any, arg2: string) {
      throw new Error(`Error for params ${arg1}, ${arg2} title ${this.title}`);
    }
  }

  it('should find public functions', () => {
    const b = new BugReport('some string');
    expect(b).toBeDefined();
    b.age = 23;
    expect(b.doSomeWork('arg1Sayye')).toBeDefined();
    // expect(b.throwSomeEx("arg1Sayye", "arg2err")).toBeDefined();
  });
});
