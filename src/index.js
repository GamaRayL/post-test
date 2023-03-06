import 'normalize.css';
import './styles/main.scss';
import { v4 as uuidv4 } from 'uuid';

const getSlctr = (cls) => document.querySelector(cls);

window.onload = function () {
  const inputMsg = getSlctr('.post__textarea');
  const inputName = getSlctr('.post__input');
  const inputDate = getSlctr('.post__date');
  const form = getSlctr('.post__form');
  const list = getSlctr('.post-list');

  inputDate.value = new Date().toISOString().slice(0, 10);

  let posts = [];

  if (localStorage.getItem('posts')) {
    posts = JSON.parse(localStorage.getItem('posts'));
    renderPosts();
  }

  form.addEventListener('submit', createPost);
  inputMsg.addEventListener('focus', createFocus);
  inputMsg.addEventListener('blur', createBlur);
  inputName.addEventListener('focus', createFocus);
  inputName.addEventListener('blur', createBlur);
  list.addEventListener('click', deletePost);
  list.addEventListener('click', likePost);

  function createFocus() {
    this.style.borderColor = '#EFEFEF';
  }

  function createBlur(e) {
    if (e.target.value.trim() === '') {
      e.target.style.borderColor = '#FF5C5C';
    } else if (e.target.value) {
      e.target.style.borderColor = '#EFEFEF';
    }
  }

  function createPost(e) {
    e.preventDefault();

    if (inputMsg.value.trim() === '' || inputName.value.trim() === '') return;
    let newPost = {
      id: uuidv4(),
      name: inputName.value,
      content: inputMsg.value,
      date: inputDate.value,
      time: new Date().toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
      }),
      liked: false,
    };

    posts.push(newPost);
    renderPosts();
    localStorage.setItem('posts', JSON.stringify(posts));

    inputMsg.value = '';
    inputName.value = '';
  }

  function deletePost(e) {
    const btnId = e.target.classList[2];

    if (e.target.matches('.btn_delete')) {
      posts = posts.filter((i) => i.id !== btnId);
      renderPosts();
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }

  function likePost(e) {
    const btnId = e.target.classList[2];

    if (e.target.matches('.btn_like')) {
      posts.forEach((item) => {
        if (item.id === btnId) {
          item.liked = !item.liked;
          renderPosts();
          localStorage.setItem('posts', JSON.stringify(posts));
        }
      });
    }
  }

  function getCorrectDate(d, time) {
    const curDate = parseInt(Number(new Date().toISOString().slice(8, 10)));
    const postDate = parseInt(Number(d.toLocaleString().slice(8, 10)));
    const date = new Date(d).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    let result = '';
    if (curDate - 1 === postDate) {
      result = `${'вчера, ' + time}`;
    } else if (curDate === postDate) {
      result = `${'сегодня, ' + time}`;
    } else {
      result = date;
    }

    return result;
  }

  function renderPosts() {
    let renderPost = '';

    if (posts.length === 0) list.innerHTML = '';

    posts.forEach(function (post) {
      renderPost += `
      <li class="post-list__item">
        <div class="post-list__avatar">
              <img width=60 height=60 src=https://api.dicebear.com/5.x/pixel-art/svg?seed=${
                post.name
              }/>
        </div>
        <div class="post-list__content">
          <header class="post-list__header">
              <div class="post-list__name">${post.name}</div>
              <div class="post-list__date">${getCorrectDate(
                post.date,
                post.time
              )}</div>
          </header>
          <div class="post-list__body">${post.content}</div>
          <footer class="post-list__footer">
            <button class="post-list__btn btn_delete ${post.id}">
              <i class="fa-regular fa-trash-can fa-lg" style="pointer-events: none; color: #828282"></i>
            </button>
            <button class="post-list__btn btn_like ${post.id}">
              <i class="fa-sharp ${
                post.liked ? 'fa-solid' : 'fa-regular'
              } fa-heart fa-lg"
              style="cursor: pointer; pointer-events: none; color: ${
                post.liked ? '#1C7ED6' : '#828282'
              }"></i>
            </button>
          </footer>
        </div>
      </li>
      `;

      list.innerHTML = renderPost;
    });
  }

  renderPosts();
};

// const checkbox = document.querySelectorAll('.checkbox');
// checkbox.addEventListener('change', function (e) {
//   console.log(e);
// });
// checkbox.forEach(function (i) {
//   i.addEventListener('click', function (e) {
//     console.log(e);
//   });
// });
// console.log(checkbox);

// list.addEventListener('change', function (event) {
//   let liID =
//     event.target.parentElement.parentElement.parentElement.getAttribute('id');
//   arPosts.forEach((item) => {
//     if (item.id === liID) {
//       item.liked = !item.liked;
//       displayPosts();
//       localStorage.setItem('posts', JSON.stringify(arPosts));
//     }
//   });
// });

// postList.addEventListener('click', function (event) {
//   let liID =
//     event.target.parentElement.parentElement.parentElement.getAttribute('id');
//   arPosts = arPosts.filter((i) => i.id !== liID);
//   displayPosts();
//   localStorage.setItem('posts', JSON.stringify(arPosts));
// });

// arPosts.forEach(function (item) {
//   if (item.id === liId) {
//     item.liked = !item.liked;
//     displayPosts();
//     localStorage.setItem('posts', JSON.stringify(arPosts));
//   }
// });

//

// submitBtn.addEventListener('click', clearStorage);

// function clearStorage(e) {
//   e.preventDefault();
//   localStorage.clear();
// }

// function checkStorage() {
//   for (let i = 0; i < formFields.length; i++) {
//     if (formFields[i].type !== 'submit') {
//       formFields[i].value = localStorage.getItem(formFields[i].name);
//     }
//   }
// }

// function changeHandler() {
//   console.log(this.name, this.value);
//   localStorage.setItem(this.name, this.value);
// }

// attachEvents();

// function attachEvents() {
//   for (let i = 0; i < formFields.length; i++) {
//     formFields[i].addEventListener('change', changeHandler);
//   }
// }

// checkStorage();

//
