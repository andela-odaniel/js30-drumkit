/* the .playing css class scales the div up
 *  we want to remove it if the transition is completed
 *
 * since the playing class specifies a transform, any 
 * element with .playing should have transfrom property
 * 
 * this lookup is less complex than try to handle null exceptions
 *  for object without the class .playing
 */
function removeTransition(event) {
  if (event.propertyName !== 'transform') return;
  event.target.classList.remove('playing');
}

/* parse the dom to find the audio file related to the depressed key
 * and the key itself. Then play the audio file and add the .playing
 * class to the key
 */
function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  if (!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

// get all the keys into a array.
const keys = Array.from(document.querySelectorAll('.key'));

// add a listener to remove the playing class once the transition completes
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
});

// add a keydown listener to call playSound
window.addEventListener('keydown', playSound);