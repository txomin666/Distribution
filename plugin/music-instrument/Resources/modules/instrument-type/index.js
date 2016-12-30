import invariant from 'invariant'
import difference from 'lodash/difference'

import { Guitar } from './guitar'
import { Keyboard } from './keyboard'

let registeredTypes = {}
let defaultRegistered = false

const typeProperties = [
  'type',
  'editor',
  'player',
  'tuner'
]

export function registerInstrumentType(definition) {
  assertValidInstrumentType(definition)

  if (registeredTypes[definition.type]) {
    throw new Error(`${definition.type} is already registered`)
  }

  registeredTypes[definition.type] = definition
}

export function registerDefaultInstrumentTypes() {
  if (!defaultRegistered) {
    [Guitar, Keyboard].forEach(registerInstrumentType)
    defaultRegistered = true
  }
}

export function getDefinition(type) {
  if (!registeredTypes[type]) {
    throw new Error(`Unknown instrument type ${type}`)
  }

  return registeredTypes[type]
}

function assertValidInstrumentType(definition) {
  invariant(
    definition.type,
    makeError('type is mandatory', definition)
  )
  invariant(
    typeof definition.type === 'string',
    makeError('type must be a string', definition)
  )
  invariant(
    definition.editor,
    makeError('editor is mandatory', definition)
  )
  invariant(
    definition.player,
    makeError('player is mandatory', definition)
  )

  const extraProperties = difference(Object.keys(definition), typeProperties)

  if (extraProperties.length > 0) {
    invariant(
      false,
      makeError(`unknown property '${extraProperties[0]}'`, definition)
    )
  }
}

function makeError(message, definition) {
  const name = definition.name ? definition.name.toString() : '[unnamed]'

  return `${message} in '${name}' definition`
}