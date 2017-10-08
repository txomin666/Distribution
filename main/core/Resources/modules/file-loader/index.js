export const execute = file => {
  // get some kind of XMLHttpRequest
  var xhrObj = new XMLHttpRequest()
  // open and send a synchronous request : http://127.0.0.1/js/translations/lexicon/fr.js = 
  var filepart = file.split('/')
  var filemodified
  if (filepart[5] == '0' || filepart[5] == '1' || filepart[5] == '2') {
  	filemodified = filepart[0]+filepart[1]+'//'+filepart[2]+':8000/'+filepart[3]+'/'+filepart[4]+'/lexicon/'+filepart[6]
  }else{
  	filemodified = filepart[0]+filepart[1]+'//'+filepart[2]+':8000/'+filepart[3]+'/'+filepart[4]+'/'+filepart[5]+'/'+filepart[6]
  }
  xhrObj.open('GET', filemodified, false)
  xhrObj.send(null)

  if (xhrObj.status === 200) {
    eval(xhrObj.responseText)
  }
}
