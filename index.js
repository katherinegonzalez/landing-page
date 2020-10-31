window.addEventListener('load', () => {
  navMenuControl();
  showCarouselElements();
  setTimeout(() => { // To wait until posts are added to the DOM
    hideLoading();
    glider();
  }, 1000);
});

/** Hide loading and show carousel */
function hideLoading() {
  const loading = document.getElementById('loading');
  const gliderContain = document.getElementById('gliderContain');
  loading.style.display = "none";
  gliderContain.style.display = "block"

}

/** Show or hide the nav menu when click on menu button on mobile */
function navMenuControl () { 
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
  };
}

/** Implement carousel with Glider js library */
function glider(){
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
}

/** Show the content of the carousel according to the list of posts with users */
async function showCarouselElements() {
  const testimonialContent = document.getElementById('testimonalsContent');
  const postsWithUsers = await getPostsWithUsers();
  postsWithUsers.forEach((post, index) => {
    if (index < 4) {
      let testiomonialPost = setPost(post.body, post.user.name);
      testimonialContent.insertAdjacentHTML('afterbegin', testiomonialPost); 
    }
  });
}

/** Set the post and user to the html post */
function setPost(post, user) {
  return '<div class="testimonials__content">'+
  '<img src="./assets/images/person_3.jpg" alt="Blog Person"/>'+
  '<p><em>"'+post+'"</em></p>'+
  '<span class="testimonials__autor">'+user+'</span></div>';
}

/** Get posts from service */
async function getPosts(){
  const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
  const postsResponse = await fetch(urlPosts);
  const postsData = await postsResponse.json();
  return postsData;
}

/** Get users from service */
async function getUsers(){
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const usersResponse = await fetch(urlUsers);
  const usersData = await usersResponse.json();
  return usersData;
}

/** Get posts with user data */
async function getPostsWithUsers() {
  let usersDisctionary = {};
  let postWithUser = [];
  let postWithUsersUnique = []; // just show one post for user
  
  const posts = await getPosts();
  const users = await getUsers();
  
  users.forEach(user => {
    usersDisctionary[user.id] = user;
  });

  postWithUser = posts.map(post => {
    if(usersDisctionary[post.userId]) {
      post.user = usersDisctionary[post.userId];
    }
    return post;
  });

  postWithUsersUnique = getUnique(postWithUser, 'userId');
  return postWithUsersUnique;

}

/** Util function to get unique an array */
function getUnique(array, attr) {
  // store the comparison  values in array
  const unique =  array.map(element => element[attr])
    .map((element, i, final) => final.indexOf(element) === i && i) // store the indexes of the unique objects
    .filter((element) => array[element]).map(element => array[element]); // eliminate the false indexes & return unique objects

  return unique;
}

