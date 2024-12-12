class Success {
    constructor(data = {}, message = 'Successfully', code = 0, statusCode = 200) {
      this.code = code;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  }
  
  export default Success;