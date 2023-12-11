function dispatchEventStroage(...rest) {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (key, val) {
    const setEvent: any = new Event('setItemEvent')
    setEvent.key = key
    setEvent.newValue = val
    window.dispatchEvent(setEvent)
    signSetItem.apply(this, rest)
  }
}
export default dispatchEventStroage
// window.addEventListener('setItemEvent', (e: any) => {
//   if (e.key === 'userInfo') {
//     //监听到对应的值的改变触发
//     console.log(e)
//   }
// })
