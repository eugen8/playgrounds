import axios from "axios";
// import * as DomParser from "dom-parser";

describe("axios", () => {
  it("should get something", async () => {
    const x: any = await axios.get("https://google.com");
    // const parser = new DomParser();
    // const dom = parser.parseFromString(x.data);
    //
    // console.log(dom.getElementById("mngb"))
    // console.log(dom)

    expect(x.data).toContain(
      '<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="en">',
    );
  });
});
