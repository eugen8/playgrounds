describe("MethodDecorators in Typescript", () => {

  const LogMethod = (_: object, key: string | symbol, descriptor: PropertyDescriptor) => ({
    value(...args: any[]) {
      const result = descriptor.value.apply(this, args);
      console.log({ target: this, fn: key, result});
      return result;
    }
  });


  // function catchError(target: any, propertyName: any, descriptor: any) {
    // const method = descriptor.value;
    // // eslint-disable-next-line no-param-reassign
    // descriptor.value = function (...args: any) {
    //   try {
    //     return method.apply(target, args);
    //   } catch (error) {
    //     // @ts-ignore
    //     throw new Error(`Special error message: ${error.message}`);
    //   }
    // };
  // }
  function catchError(target: any, propertyName: any, descriptor: any) {
    return {
      value(...args: any[]) {
        let result;
        try {
          result = descriptor.value.apply(this, args);
        } catch (e: any) {
          console.log(`Special error has occurred, when ${args} then: ${JSON.stringify(e)}`);
          throw new Error(`Special error message: ${e.message}`);
        }
        return result;
      },
    };
  }

  function catchErrorAsync(target: any, propertyName: any, descriptor: any) {
    return {
      async value(...args: any[]) {
        let result;
        try {
          result = await descriptor.value.apply(this, args);
        } catch (e: any) {
          console.log(`Special error has occurred, when ${args} then: ${JSON.stringify(e)}`);
          throw new Error(`Special error message: ${e.message}`);
        }
        return result;
      },
    };
  }

  class Foo {
    @catchError
    public bar(message: string): string {
      if (message === "x") {
        throw new Error("x not valid");
      }

      return message;
    }

    @catchErrorAsync
    async barAsync(message: string) {
      const p = new Promise((res, rej) => {
        setTimeout(() => {
          rej(new Error(`Just failed for ${message}`));
        }, 1000);
      });

      await p;
      return "done";
    }

    @catchError
    async fooAsync(message: string) {
      const p = new Promise((res, rej) => {
        setTimeout(() => {
          res("done");
        }, 1000);
      });

      await p;
      return "done";
    }
  }

  it("should catch errors in decorator synchronously", () => {
    const foo = new Foo();
    try{
      const result = foo.bar("x");
      fail("Expected to fail");
    }catch(e){
      expect(e).toEqual(new Error("Special error message: x not valid"))
    }
  });

  // https://www.typescriptlang.org/docs/handbook/decorators.html
  function first(a: string, b: string) {
    console.log("first(): factory evaluated" + `with ${a} and ${b}`);
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log(`first(): called with ${target} and ${propertyKey} and ${descriptor}`);
    };
  }

  function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("second(): called");
    };
  }

  function third(target: any, propertyKey: any, descriptor: any) {
    console.log(`third(): called with ${target} and ${propertyKey} and ${descriptor}`);
  }
  class ExampleClass {
    @first("me", "you")
    @second()
    @third
    @LogMethod
    method() {
      console.log("in method");
    }
  }
  it("should call first second third", () => {
    const ec = new ExampleClass();
    ec.method();
  });

  it("should catch asyn exceptions", async () => {
    const f = new Foo();
    const msg = "some mess ablablah"
    try{
      const res = await f.barAsync(msg)
      console.log(res);
    } catch(e){
      console.log(e);
      expect(e).toEqual(new Error(`Special error message: Just failed for ${msg}`));
    }
  });

  it("should work async", async() => {
    const f = new Foo();
    const res = await f.fooAsync("on")
    console.log(res);
    expect(res).toBe("done")
  })
});
