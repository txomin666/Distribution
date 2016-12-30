
const NOTE_ON  = 1
const NOTE_OFF = 2

export class Midi {
  constructor() {
    /**
     * @type {MIDIAccess}
     */
    this.midi = null
  }

  getAccess() {
    if (navigator && navigator.requestMIDIAccess) {
      return navigator
        .requestMIDIAccess()
        .then(midiAccess => this.midi = midiAccess)
    }
  }

  getInputs() {
    const inputs = []
    for (let input of this.midi.inputs.values()) {
      inputs.push(input)
    }

    return inputs
  }

  getOutputs() {
    const outputs = []
    for (let output of this.midi.outputs.values()) {
      outputs.push(output)
    }

    return outputs
  }

  /**
   *
   * @param {MIDIInput} input
   * @param {function} callback
   */
  onInputMessage(input, callback) {
    input.onmidimessage = callback
  }

  /**
   * @param {MIDIPort} port
   */
  off(port) {
    port.onmidimessage = null
  }
}
