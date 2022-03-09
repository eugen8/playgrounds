describe("ClassDecorator", () => {
    it("how does it reject without error", async () => {
        const p = new Promise((res, rej) => {
            setTimeout(() => rej("not done"), 10);
        });
        await expect(p).rejects.toEqual("not done");
    });

    it("how does it reject without error with try", async () => {
        const p = new Promise((res, rej) => {
            setTimeout(() => rej("not done"), 10);
        });

        try {
            await p;
        } catch(e){
            console.log(e);
            expect(p).rejects.toEqual("not done");
        }
    });

    it("and also can reject an error", async () => {
        const p = new Promise((res, rej) => {
            setTimeout(() => rej(Error("not done")), 10);
        });
        await expect(p).rejects.toEqual(new Error("not done"));
    });
});
