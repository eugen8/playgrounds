describe("objects", () => {
    it("should create objects", () => {
        const a = {
            value(name: string) {
                // console.log(`you say ${name}`);
                return name;
            }
        }

        const b = { value: (name: string) => {
            // console.log(`you say ${name}`);
            return name;}}
        expect(a.value("gene")).toBe("gene");
        expect(b.value("jon")).toBe("jon");

        console.log(a.value.toString())
        console.log(b.value.toString())
        // expect(a).toEqual(b);
    });


})
