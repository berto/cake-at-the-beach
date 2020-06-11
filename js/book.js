const flipbook = $('#flipbook')
flipbook.turn({
  width: 600,
  height: 700,
  autoCenter: true,
  display: 'single',
})

$('button').click(() => {
  console.warn('click')

  flipbook.turn('next')
})
