import { generateUrl } from '#/main/core/fos-js-router'

export const api = {}

api.update = (song) => {
  return fetch(generateUrl('song_update', {id: song.id}), {
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(song)
  })
  .then(response => response.json())
}
