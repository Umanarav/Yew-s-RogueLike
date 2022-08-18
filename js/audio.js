let audioContext;

function playSynth (delay, pitch, duration) {
  var startTime = audioContext.currentTime + delay
  var endTime = startTime + duration

  var oscillator = audioContext.createOscillator()
  //oscillator.connect(audioContext.destination)
  
  var filter = audioContext.createBiquadFilter()
  filter.connect(audioContext.destination)
  oscillator.connect(filter)

  oscillator.type = 'sine'
  oscillator.detune.value = pitch * 100

  oscillator.start(startTime)
  oscillator.stop(endTime)
  
  filter.type = 'highpass'
  filter.frequency.value = 200

  filter.frequency.setValueAtTime(10000, audioContext.currentTime + delay)
  filter.frequency.linearRampToValueAtTime(500, audioContext.currentTime + duration)

}

