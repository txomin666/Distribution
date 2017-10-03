export const execute = file => {
  // get some kind of XMLHttpRequest
  var xhrObj = new XMLHttpRequest()
  // open and send a synchronous request
  xhrObj.open('GET', file, true)
  xhrObj.setRequestHeader('Access-Control-Allow-Origin', "http://127.0.0.1:8000");
  xhrObj.send(null)

  if (xhrObj.status === 200) {
    eval(xhrObj.responseText)
  }
}
