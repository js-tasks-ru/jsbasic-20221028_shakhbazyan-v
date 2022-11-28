function toggleText() {
const element = document.querySelector('#text');
const button = document.querySelector('button')

button.addEventListener('click', function (event) {
(element.hasAttribute('hidden') == true) ?
  element.removeAttribute('hidden') :
  element.setAttribute('hidden', 'true')
 })
}

