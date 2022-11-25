function hideSelf() {
  const element = document.querySelector('button')

  element.addEventListener('click', function (event) {
    element.hidden = true;
  })
}
