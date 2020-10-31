const navButton = document.getElementById('navButton');
const navMenu = document.getElementById('navMenu');

navButton.onclick = () => { 
   
  if (navMenu.className.indexOf('header_nav-menu--hidden') > -1) {
    navMenu.classList.add("header_nav-menu--shown");
    navMenu.classList.remove("header_nav-menu--hidden");
  } else {
    navMenu.classList.add("header_nav-menu--hidden");
    navMenu.classList.remove("header_nav-menu--shown");
  }

} ;

window.addEventListener('load', () => {
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    dots: '#dots',
    draggable: true,
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 775,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1,
          slidesToScroll: 'auto',
          itemWidth: 150,
          duration: 0.25
        }
      }
    ]
  });
});