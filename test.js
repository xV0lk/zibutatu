const menuButton = document.getElementById('user-menu-button')
const menu = document.getElementById('userMenu')

const toogleMenu = () => {
  menu.classList.toggle('hidden')
}

const clickOutside = (e) => {
  if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
    menu.classList.add('hidden')
  }
}

menuButton.addEventListener('click', toogleMenu)
document.addEventListener('click', clickOutside)
