import { generateUrl } from '#/main/core/fos-js-router'

export const api = {}

api.loadGenericInstruments = (instrumentType) => {
  return fetch(generateUrl('music_instrument_list_generic', {id: instrumentType.id}), {
    credentials: 'include',
    method: 'GET'
  })
  .then(response => response.json())
}
