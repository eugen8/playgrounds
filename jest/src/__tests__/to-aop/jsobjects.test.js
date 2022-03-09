describe("objects", () => {
    it("creates objects ES5 style with functions in prototype", () => {
        function Foo(name){
            this.name = name;
            this.lastName="foo";
            this.methodOne = function(inarg){
                return "method one name=" + this.name + " with " + inarg ;
            }
        }

        Foo.prototype.methodTwo = function(input){
            return "method two name=" + this.name + " with " + input ;
        }

        var f = new Foo("someone");
        var result = f.methodOne("in methdod one");
        var result2 = f.methodTwo("in method two");

        class Bar {
            static methodTwo(input){
                return "method two name=" + this.name + " with " + input ;
            }
            constructor(name) {
                this.name = name;
                this.lastName="foo";
            }
            methodOne(inarg){
                return "method one name=" + this.name + " with " + inarg ;
            }
        }
        var b = new Foo("someone");
        var resultB = b.methodOne("in methdod one");
        var resultB2 = b.methodTwo("in method two");


        expect(result).toBe("method one name=someone with in methdod one");
        expect(result2).toBe("method two name=someone with in method two");

        expect(resultB).toBe("method one name=someone with in methdod one");
        expect(resultB2).toBe("method two name=someone with in method two");

        expect(f.__proto__.methodTwo.toString()).toEqual(b.__proto__.methodTwo.toString());


    })
})
