export default(channelBuffer, recordingLength) => {
  var result = new Float32Array(recordingLength)
  var offset = 0
  var lng = channelBuffer.length
  for (var i = 0; i < lng; i++) {
    var buffer = channelBuffer[i]
    result.set(buffer, offset)
    offset += buffer.length
  }
  return result
}
