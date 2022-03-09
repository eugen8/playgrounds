const message: string = "Hello World";
// console.log({"errorCode":"LDS", message, msg: message});

class WarehouseError extends Error {
  public errorCode: string;

  public message: string;

  constructor(errorResponse: {message: string, errorCode: string}) {
    super(errorResponse.message);
    this.message = errorResponse.message;
    // console.log(`"creating WarehouseError with message=${errorResponse.message}, and code = ${errorResponse.errorCode}"`);
    this.name = new.target.name;
    this.errorCode = errorResponse.errorCode;
    const x = new.target.prototype;
    // this.message = errorResponse.message;
    const messageDescriptor = Object.getOwnPropertyDescriptor(this, "message") || {};
    Object.defineProperty(this, "message", { ...messageDescriptor, enumerable: true });
    // console.log({...this})
    // console.log(this)
    // console.log(this.toString())
  }

  // toJSON(){
  //   return JSON.stringify({
  //     message: this.message
  //   })
  // }
}

class CustomError extends WarehouseError {
  constructor(ercd: string, messagex?: string) {
    super({ errorCode: ercd, message: messagex || "" }); // 'Error' breaks prototype chain here
    // console.log("new.target.name=", new.target.name)
    // this.message = messagex;
  }
}

const ce = new CustomError("ERROR_CODE", "someMessage");
// console.log("will print ce:");
// console.log(ce);
// console.log("now will print ...ce")
console.log({ ...ce });
