const axios = require('axios');




// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getSanPham() {
  try {
    const response = await axios.get('https://localhost:44372/api/AnhSanPhams');
    return response
  } catch (error) {
    return error
  }
}

module.exports = {getSanPham}