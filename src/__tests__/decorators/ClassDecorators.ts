// eslint-disable-next-line max-classes-per-file
import {create} from "domain";

describe("ClassDecorator", () => {
  function handleErrorsAndLogs(descriptor: any, rethrow: boolean) {
    function handleError(e: any){
      if(e instanceof Error){
        const msg = `Exception msg was: ${e.message}`;
        console.log("LOGGING THAT: " + msg, e);
        if(rethrow)
          throw Error(msg)
      } else {
        console.log("LOGGING THAT: ", e);
        if(rethrow)
          throw Error(e.toString());
      }
    }
    const retObj = {
      value(...args: any[]) {
        try {
          const result = descriptor.value.apply(this, args);
          if(result instanceof Promise ){
            const chained = result.then( res => {
              return res;
            }).catch(e => {
              handleError(e);
            })
            return chained;
          }
          return result;
        } catch (e) {
          handleError(e);
        }
      },
    };
    return retObj;
  }

  function createLogWithParam(param: { rethrow: boolean }){

    // eslint-disable-next-line no-unused-vars
    function logEachMethod<T extends { new (...args: any[]): {} }>(
        constructor: T,
    ) {
      const properties = Object.getOwnPropertyNames(constructor.prototype);
      const filtered = properties.filter((p) => p !== "constructor");
      filtered.forEach((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(
            constructor.prototype,
            key,
        );
        if (descriptor) {
          Object.defineProperty(constructor.prototype, key, {
            ...descriptor,
            ...handleErrorsAndLogs(descriptor, param?.rethrow??true ),
          });
        }
      });
    }

    return logEachMethod;
  }


  // @logEachMethod
  @createLogWithParam({rethrow: true})
  class BugReport {
    type = "report";

    title: string;

    age: number | undefined;

    constructor(t: string) {
      this.title = t;
    }

    doSomeWork(arg1: string) {
      return `Hello, ${this.type} with arg1: ${arg1}`;
    }

    doAsyncWork(arg1: string, arg2: string) {
      const resolveMessage = `doAsyncWork says resolved with hi to ${arg1} and ${arg2}`;
      const p = new Promise((resolve, reject) => {
        setTimeout(() => resolve(resolveMessage));
      });
      return p;
    }

    failAsyncWork(arg1: string, arg2: string) {
      const rejectMessage = `failAsyncWork rejects saying hi to ${arg1} and ${arg2}`;
      const p = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("Will reject this now");
          reject(new Error(rejectMessage));
        }, 100);
      });
      return p;
    }

    failSyncWork(arg1: string, arg2: string) {
      const rejectMessage = `failAsyncWork rejects saying hi to ${arg1} and ${arg2}`;
      throw new Error(rejectMessage);
    }

    doSomeWorkToo(arg1: string) {
      return `done some work for ${arg1} titled ${this.title}`;
    }

    throwSomeEx(arg1: any, arg2: string) {
      throw new Error(`Error for params ${arg1}, ${arg2} title ${this.title}`);
    }
  }

  it("should process successful sync ", () => {
    const b = new BugReport("some string");
    expect(b).toBeDefined();
    b.age = 23;
    expect(b.doSomeWork("arg1Sayye")).toBe(
      "Hello, report with arg1: arg1Sayye",
    );
  });

  it("should process successful async ", async () => {
    const b = new BugReport("some string");
    expect(b).toBeDefined();
    b.age = 23;
    const results = await b.doAsyncWork("Tom", "Cruise");
    expect(results).toBe("doAsyncWork says resolved with hi to Tom and Cruise");
  });

  it("should process error sync ", () => {
    const b = new BugReport("some string");
    expect(b).toBeDefined();
    b.age = 23;
    try {
      const results = b.failSyncWork("Tom", "Cruise");
      fail("should have filed");
    } catch (e: any) {
      expect(e.message).toBe(
        "Exception msg was: failAsyncWork rejects saying hi to Tom and Cruise",
      );
    }
  });

  it("should process error async ", async () => {
    const b = new BugReport("some string");
    expect(b).toBeDefined();
    b.age = 23;
    try {
      await b.failAsyncWork("Tom", "Cruise");
      fail(new Error(`Should have failed and not get result`));
    } catch (e: any) {
      console.log("Received message: "+e.message)
      expect(e.message).toBe(
        "Exception msg was: failAsyncWork rejects saying hi to Tom and Cruise",
      );
    };
  });
});
