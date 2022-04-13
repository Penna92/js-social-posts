const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];
// console.log(posts[3].author.image);

// FUNZIONE CHE STAMPA LA LISTA DI POSTS CON DATA IN FORMATO ITALIANO E INSERISCE LE INIZIALI DEL NOME SE L'IMMAGINE E' NULL

let template = "";

posts.forEach(stampaPost);

function stampaPost(item, index) {
  let replaceImage = posts[index].author.image;
  let replacedImage = `<img class="profile-pic" src=${replaceImage}>`;
  if (replaceImage === null) {
    replacedImage = posts[index].author.name
      .match(/(\b\S)?/g)
      .join("")
      .toUpperCase();
    // console.log(replacedImage);
    // console.log(replaceImage);
  }
  template = `
    <div class="post" id="${posts[index].id}">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${replacedImage}                   
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${
                      posts[index].author.name
                    }</div>
                    <div class="post-meta__time">${posts[index].created
                      .split("-")
                      .reverse()
                      .join("-")}</div> 
                </div>                    
            </div>
        </div>
        <div class="post__text">${posts[index].content}</div>
        <div class="post__image">
            <img src="${posts[index].media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${
                      posts[index].id
                    }" id="button${[index + 1]}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${
                      posts[index].id
                    }" class="js-likes-counter">${
                        posts[index].likes
                    }</b> persone
                </div>
            </div> 
        </div>            
    </div>        
    `;

  document.getElementById("container").innerHTML += template;
}

// TOGGLE CLICK MI PIACE AUMENTA E DIMINUISCE CONTATORE E INSERISCE/TOGLIE ID DEL POST DA UN SECONDO ARRAY"

let likeButtonsCollection = document.getElementsByClassName("like-button");
// console.log(likeButtonsCollection);
let likeButtonsArray = [...likeButtonsCollection];
const likedPosts = [];

likeButtonsArray.forEach(pressButton);

function pressButton(items, index) {
  likeButtonsArray[index].addEventListener("click", (event) => {
    // console.log(event.path[1].id.split('n')[1], "aooooo");
    // let id = event.path[index + 1].id;
    // console.log(id, index);
    // console.log(document.getElementById(`like-counter-${index + 1}`));
    let postsId = "Id post: " + (index + 1);
    // console.log(postsId);
    let numeroLikes = document.getElementById(`like-counter-${index + 1}`);
    likeButtonsArray[index].classList.add("like-button--liked");
    if (numeroLikes.innerText == posts[index].likes) {
      numeroLikes.innerText = parseInt(numeroLikes.innerText) + 1;
      if (!likedPosts.includes(postsId)) {
        likedPosts.push(postsId);
        console.log(likedPosts);
      }
    } else if (numeroLikes.innerText == posts[index].likes + 1) {
      likeButtonsArray[index].classList.remove("like-button--liked");
      numeroLikes.innerText = parseInt(numeroLikes.innerText) - 1;
      if (likedPosts.includes(postsId)) {
        for (let i = 0; i < likedPosts.length; i++) {
          if (likedPosts[i].split(" ")[2] == index + 1) {
            likedPosts.splice(i, 1);
          }
        }
        console.log(likedPosts);
      }
    }
  });
}
