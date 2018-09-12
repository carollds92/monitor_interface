export default {
  // Returns the production api url
  /* getApiURL () {
    return 'http://jwt.api/api/'
  },
  */
  // Returns the test api url
  getApiURL () {
    // return 'https://monitorv1-api.herokuapp.com/'
    return 'http://localhost:3000/'
  },
  getApiToken () {
    return {
      headers: {'Authorization': JSON.parse(localStorage.getItem('auth')).token.type_token + ' ' + JSON.parse(localStorage.getItem('auth')).token.acess_token}
    }
  }
}
