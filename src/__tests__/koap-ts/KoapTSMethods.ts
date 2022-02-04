import { afterMethod, beforeMethod, Metadata } from 'kaop-ts';

describe('ToAOP', () => {
  const errorHandler = afterMethod((meta) => {
    const ex = meta.exception;
    if (ex) {
      console.log('Exception found:', ex.message);
      // eslint-disable-next-line no-param-reassign
      meta.exception = new Error('but why');
    }
    // const res = meta.result;
    // console.log(`after result = ${res}`)
    // const ex = meta.handle();
  });

  // eslint-disable-next-line no-unused-vars
  const LogClassMethods = (meta: Metadata<any>) => {
    console.log(
      `This is from LogClassMethods for method: ${meta.method.name}, key="${meta.key}", scope="${meta.scope}", args="${meta.args}"`,
    );

    // console.log(meta.key)
    // console.log(meta.scope)
    // console.log(meta.args)
  };
  // eslint-disable-next-line no-unused-vars
  function applyToAll(advice: any) {
    return function (target: any) {
      const wove = afterMethod(advice);
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.getOwnPropertyNames(target.prototype)) {
        if (key !== 'constructor' && key.indexOf('method') !== -1) {
          // console.log(`key is : ${key}`);
          const descriptor = Object.getOwnPropertyDescriptor(
            target.prototype,
            key,
          );
          Object.defineProperty(
            target.prototype,
            key,
            wove(target, key, descriptor),
          );
        }
      }
      console.log(target.prototype);
    };
  }
  // const track = applyToAll(LogClassMethods);

  // @track - fails in combination with other methods in the class or before/after annotations
  class A {
    variable: string;

    constructor(variable: string) {
      this.variable = variable;
    }

    @beforeMethod((meta) => {
      // console.log(meta);
      const [result, ...args] = meta.args;
      // applying some transformation to first argument received by the decorated method
      // eslint-disable-next-line no-param-reassign
      meta.args = [`result = ${result}`, ...args];
    })
    @errorHandler
    methodAWithError(param: string) {
      if (true) {
        throw new Error('Method A with Error');
      }
      return `methodA says ${this.variable} for ${param}`;
    }

    // @errorHandler
    // eslint-disable-next-line class-methods-use-this
    async methodAAsync() {
      console.log('methodAAsyncCalled');
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('resolving promise');
          resolve('fine');
        }, 1000);
      });
    }

    classHooked() {
      return `Hooked by class with ${this.variable}`;
    }
  }

  it('should work on error', () => {
    const a = new A('variable');
    try {
      a.methodAWithError('hey dude');
    } catch (e) {
      expect(e).toEqual(new Error('but why'));
    }
    // expect(amethod).toBeDefined();
    // console.log(amethod);
  });

  it('should work on no errors async methods', async () => {
    const a = new A('variable');
    const prom = a.methodAAsync();
    const aRes = await prom;
    expect(aRes).toBe('fine');
  });

  it('should do class level', () => {
    const a = new A('ll');
    const classHooked = a.classHooked();
    expect(classHooked).toBe('Hooked by class with ll');
  });
});
