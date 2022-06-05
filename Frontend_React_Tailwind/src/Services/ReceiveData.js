class ReceiveData {
  do (data,state) {
    return {
      data:data,
      state:state
    }
  }
}
export default new ReceiveData()