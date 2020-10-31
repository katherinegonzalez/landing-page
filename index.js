window.addEventListener('load', () => {
  navMenuControl();
  showCarouselElements();
  setTimeout(() => { // To wait until posts are added to the DOM
    hideLoading();
    glider();
    
  }, 1000);
});

function hideLoading() {
  const loading = document.getElementById('loading');
  const gliderContain = document.getElementById('gliderContain');
  loading.style.display = "none";
  gliderContain.style.display = "block"

}

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

function setPost(post, user){
  return '<div class="testimonials__content">'+
  '<img src="./assets/images/person_3.jpg" alt="Blog Person"/>'+
  '<p><em>"'+post+'"</em></p>'+
  '<span class="testimonials__autor">'+user+'</span></div>';
}


async function getPosts(){
  const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
  const postsResponse = await fetch(urlPosts);
  const postsData = await postsResponse.json();
  // console.log('a', a);
  return postsData;

  // return postsResponse.json();
}

async function getUsers(){
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const usersResponse = await fetch(urlUsers);
  const usersData = await usersResponse.json();
  return usersData;

  // return postsResponse.json();
}

async function getPostsWithUsers() {
  const posts = await getPosts();
  console.log(posts);
  const users = await getUsers();
  let usersDisctionary = {};

  let postWithUser = [];

  let postWithUsersUnique = []; // just show one post for user

  users.forEach(user => {
    usersDisctionary[user.id] = user;
  });

  console.log('usersDisctionary', usersDisctionary);

  postWithUser = posts.map(post => {
    if(usersDisctionary[post.userId]) {
      post.user = usersDisctionary[post.userId];
    }
    return post;
  });

  postWithUsersUnique = getUnique(postWithUser, 'userId');

  console.log('postWithUser', postWithUsersUnique);

  return postWithUsersUnique;

}

function getUnique(arr, comp) {

    // store the comparison  values in array
  const unique =  arr.map(e => e[comp])

  // store the indexes of the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the false indexes & return unique objects
  .filter((e) => arr[e]).map(e => arr[e]);

return unique;
}



// getPostsWithUsers();

// getPosts();

/*getPosts().then(data => {
  console.log('posts', data);
})*/
