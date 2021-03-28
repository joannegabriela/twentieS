// from web-api-auth-examples

class Utils {

    // from web-api-auth-examples
    static generateRandomString(length: Number) {
    var text: string = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
}



  export {Utils};