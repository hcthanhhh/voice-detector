export default (leftChannel, rightChannel) => {
  var length = leftChannel.length + rightChannel.length
  var result = new Float32Array(length)
  var inputIndex = 0
  for (var index = 0; index < length;) {
    result[index++] = leftChannel[inputIndex]
    result[index++] = rightChannel[inputIndex]
    inputIndex++
  }
  return result
}
