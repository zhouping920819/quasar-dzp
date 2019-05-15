// import
import api from 'src/api'
// Promise
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var Promise = this.constructor;
    return this.then(
      function (value) {
        Promise.resolve(callback()).then(
          function () {
            return value;
          }
        );
      },
      function (reason) {
        Promise.resolve(callback()).then(
          function () {
            throw reason;
          }
        );
      }
    );
  };
}
//
export default ({
  Vue
}) => {
  Vue.prototype.$axios = api
}
