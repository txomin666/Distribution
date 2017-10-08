
import axios from 'axios'


export function postMetadata(instAxios, username, password, metadata, name){
  return instAxios.request({
      url : name,
      data : metadata,
      method : 'POST',
      auth : {
        username: username,
        password: password
      }
    })
}

export function postVolume(instAxios, username, password, volume, name, lang){
  return instAxios.request({
      url : name+'/'+lang,
      data : volume,
      method : 'POST',
      auth : {
        username: username,
        password: password
      }
    })
}

export function deleteRessourceJibiki(username, password, name){
  const baseUrlResource = 'http://totoro.imag.fr/lexinnova/api/'
  const urlResource     = baseUrlResource+name
  return axios.delete(urlResource, {
      auth : {
        username: username,
        password: password
      }
    })
}


export function deleteVolumeResourceJibiki(username, password, name, lang){
  const baseUrlResource = 'http://totoro.imag.fr/lexinnova/api/'
  const urlResource     = baseUrlResource+name+'/'+lang
  return axios.delete(urlResource, {
      auth : {
        username: username,
        password: password
      }
    })
}


export function createEntryJibiki(instAxios, username, password, name, dataEntry, lang, entryid){
  const urlResource     =  name+'/'+lang+'/'+entryid
  return instAxios.request({
      url : urlResource,
      data : dataEntry,
      method : 'POST',
      auth : {
        username: username,
        password: password
      }
  })
}