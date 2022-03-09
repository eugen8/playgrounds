describe("functions", () => {
  it("create functions and pass them around", () => {
    var a = function hello(param1) {
      this.p = param1;
      // console.log(`writing param1=${param1}`);
      return "here is param1=" + param1;
    };

    // console.log(a("wow"))
    var b = a("hello");
    var c = new a("bye");
    // console.log(b);
    // console.log(c);
    expect(c.__proto__.constructor.name).toBe("hello");
    console.log(c.__proto__.constructor.toString());
  });

  it("anonymous function creation constructor name", () => {
    var a = function (param1) {
      this.p = param1;
      // console.log(`writing param1=${param1}`);
      return "here is param1=" + param1;
    };

    // console.log(a("wow"))
    var b = a("hello");
    var c = new a("bye");
    // console.log(b);
    // console.log(c);
    expect(c.__proto__.constructor.name).toBe("a");
    console.log(c.__proto__.constructor.toString());
  });

  it("override prototype", () => {
    function Foo() {
      //This is like override, takes priority over what's in prototype
      this.createFood = function () {
        return { food: "Pasta" };
      };
      this.__proto__.createFood2 = function () {
        return { food2: "Paw-sta" };
      };
    }
    Foo.prototype.createFood = function () {
      return { food: "spaghetti" };
    };
    Foo.prototype.createFood3 = function () {
      return { food: "3 grain noodles" };
    };

    var f = new Foo();

    f.__proto__.createFood = function () {
      return { food: "burgers" };
    };
    console.log(f.createFood()); // { food: 'Pasta' }
    console.log(f.__proto__.createFood()); // { food: 'burgers' }
    console.log(Foo.prototype.createFood()); // { food: 'burgers' }
    console.log(f.__proto__.createFood3()); // { food: '3 grain noodles' }
    console.log(f.createFood2()); // { food2: 'Paw-sta' }
    console.log(f.hasOwnProperty("createFood")); //true
    console.log(f.hasOwnProperty("createFood2")); //false
    console.log(Object.getOwnPropertyNames(f)); // [ 'createFood' ]
    console.log(Object.getOwnPropertyNames(Foo)); //  [ 'length', 'name', 'arguments', 'caller', 'prototype' ]
    console.log(Object.getOwnPropertyNames(Foo.prototype)); // [ 'constructor', 'createFood', 'createFood3', 'createFood2' ]
    console.log(Object.getOwnPropertyNames(Foo.constructor)); //  [ 'length', 'name', 'prototype' ]

    console.log(Reflect.ownKeys(f)); // [ 'createFood' ]
    console.log(Reflect.ownKeys(Foo)); // [ 'length', 'name', 'arguments', 'caller', 'prototype' ]
    console.log(Reflect.ownKeys(Foo.constructor));//[ 'length', 'name', 'prototype' ]
  });

  it("should return different object when constructing", () => {
    function Foo() {
      function double(n){
        //this object is the global
        return n * 2;
      }
      function triple(n) {
        // console.log(this); //this is the returned this object
        return n * 3;
      }
      return {
        fiveDoubled: double(5),
        triple
      }
    }

    const f = new Foo();
    console.log(f);// { fiveDoubled: 10, triple: [Function: triple] }
    console.log(f.triple(3));// 9
    console.log(f.triple.toString());/*function triple(n) {
            // console.log(this); //this is the returned this object
            return n * 3;
          }*/
    console.log(f.triple); // [Function: triple]
  });

  it("should return other object from class constructor", () => {
    class FooBar {
      something = 32;
      constructor() {
        return {myStory: "whoa...", other: this.something, buildNothingElse: this.buildNothing, oldThis: this}
      }
      buildNothing(){
        return "nothing else matters for " + this.myStory;
      }
    }
    const f = new FooBar();
    console.log(f);//{ myStory: 'whoa...' }
    console.log(f.something);// undefined (as it's not in the return
    console.log(f.other);// 32 (this is set to FooBar at that time of the construction
    console.log(f.buildNothing);// undefined
    console.log(f.buildNothingElse());// nothing else matters for whoa... (as this is set of the time of constructing, returned object has a different this)
    console.log(f.oldThis.something); // 32
    expect(f.oldThis.something).toBe(32);
  })
});
