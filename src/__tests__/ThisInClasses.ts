import exp = require("constants");

describe("this in classes", () => {
    class Helper {
        private name: string;
        constructor(name: string) {
            this.name = name;
        }
        public say(arg: string){
            const msg = `Helper says ${this.name} for ${arg}`;
            console.log(msg);
            return msg;
        }
    }

    class Service {
        public say: (arg: string) => string;
        public sayIndirectly: (arg: string) => string;
        private helper: Helper;
        constructor(helper: Helper) {
            this.helper = helper;
            this.say = this.helper.say
            this.sayIndirectly = (arg: string) => this.helper.say(arg);
        }
    }
    const h = new Helper("Goo");
    const s = new Service(h);

    it("passing a method directly doesn't preserve the method's own class context", () => {
       const arg = "arg1";
       expect(s.say(arg)).toBe("Helper says undefined for arg1")

    });

    it("calling a method on the class happens in that method's class context", () => {
        const arg = "arg1";
        expect(s.sayIndirectly(arg)).toBe("Helper says Goo for arg1")

    });

});
