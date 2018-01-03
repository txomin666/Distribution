import {registerType} from '#/main/core/data'

import {TUNING_TYPE, tuningDefinition} from '#/plugin/music-instrument/data/types/tuning'

function registerInstrumentTypes() {
  registerType(TUNING_TYPE, tuningDefinition)
}

export {
  registerInstrumentTypes
}
