import { aop, hookName, createHook, unAop } from 'to-aop';

describe('toAop', () => {
  class A {
    variable: string;

    constructor(variable: string) {
      this.variable = variable;
    }

    method() {
      return this.variable;
    }

    notHookedMethod() {
      return `not hook ${this.variable}`;
    }

    notHookedClassMethod() {
      return `not hook class method ${this.variable}`;
    }
  }

  const classHookBefore = createHook(
    hookName.beforeMethod,
    /^(method)$/,
    (inp: any) => {
      const { property, args, meta } = inp; // target, object, property, context, args, meta
      // call your own hook
      meta.startTime = new Date().getTime();
      console.log(
        `Instance of ${inp.target.name} call "${property}"
with arguments ${args && args.length ? args : '[]'}.`,
      );
    },
  );

  const classHookAfter = createHook(
    hookName.afterMethod,
    /^(method)$/,
    (inp: any) => {
      const {
        target,
        property,
        args,
        payload,
        meta, // target, object, property, context, args, payload, meta,
      } = inp;
      // call your own hook
      console.log(
        `Instance of ${target.name} call "${property}"
with arguments ${args && args.length ? args : '[]'}
and return value is "${payload}" took ${
          new Date().getTime() - meta.startTime
        }.`,
      );
    },
  );

  const hooks = { ...classHookBefore, ...classHookAfter };

  aop(A, hooks); // bind hook to class

  it('should work basics', () => {
    const a = new A('my hook');

    // eslint-disable-next-line max-len
    // log: 'Instance of A call "method" with arguments [] and return value is "my hook".', returns: 'my hook'
    a.method();
    a.notHookedClassMethod(); // returns: 'not hook'

    unAop(A);
    a.method(); // returns: 'my hook'
    a.notHookedClassMethod(); // returns: 'not hook'
  });
});
