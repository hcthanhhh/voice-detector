import mergeBuffers from './mergebuffer'
import interleave from './interleave'
import writeUTFBytes from './writeUTFBytes'

export default (leftchannel, rightchannel, recordingLength, sampleRate) => {
  // we flat the left and right channels down
  var leftBuffer = mergeBuffers(leftchannel, recordingLength)
  var rightBuffer = mergeBuffers(rightchannel, recordingLength)
  // we interleave both channels together
  var interleaved = interleave(leftBuffer, rightBuffer)

  // create the buffer and view to create the .WAV file
  var buffer = new ArrayBuffer(44 + interleaved.length * 2)
  var view = new DataView(buffer)

  // write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
  // RIFF chunk descriptor
  writeUTFBytes(view, 0, 'RIFF')
  view.setUint32(4, 44 + interleaved.length * 2, true)
  writeUTFBytes(view, 8, 'WAVE')
  // FMT sub-chunk
  writeUTFBytes(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  // stereo (2 channels)
  view.setUint16(22, 2, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 4, true)
  view.setUint16(32, 4, true)
  view.setUint16(34, 16, true)
  // data sub-chunk
  writeUTFBytes(view, 36, 'data')
  view.setUint32(40, interleaved.length * 2, true)

  // write the PCM samples
  var lng = interleaved.length
  var index = 44
  var volume = 1
  for (var i = 0; i < lng; i++) {
    view.setInt16(index, interleaved[i] * (0x7FFF * volume), true)
    index += 2
  }

  // our final binary blob that we can hand off
  var blob = new Blob([ view ], { type: 'audio/wav' })
  return blob
}
