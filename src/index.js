import 'normalize.css';
import './styles/main.scss';
import { v4 as uuidv4 } from 'uuid';
import { createBlur, createFocus, getCorrectDate } from './utils';

const getSlctr = (cls) => document.querySelector(cls);

window.onload = function () {
  const inputMsg = getSlctr('.post__textarea');
  const inputName = getSlctr('.post__input');
  const inputDate = getSlctr('.post__date');
  const form = getSlctr('.post__form');
  const list = getSlctr('.post-list');
  const btnStorage = getSlctr('.btn_storage');

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
  btnStorage.addEventListener('click', clearStorage);

  function clearStorage(e) {
    e.preventDefault();
    localStorage.clear();
    posts = [];
    renderPosts();
  }

  // Создания поста
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

  // Удаление поста
  function deletePost(e) {
    const btnId = e.target.classList[2];

    if (e.target.matches('.btn_delete')) {
      posts = posts.filter((i) => i.id !== btnId);
      renderPosts();
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }

  // Лайк поста
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

  // Вывод постов
  function renderPosts() {
    let renderPost = '';

    if (posts.length === 0) list.innerHTML = '';

    posts.forEach(function (post) {
      renderPost += `
      <li class="post-list__item">
        <div class="post-list__avatar">
          <img width=60 height=60 src=
            https://api.dicebear.com/5.x/pixel-art/svg?seed=${post.name}/>
        </div>
        <div class="post-list__content">
          <header class="post-list__header">
              <div class="post-list__name">${post.name}</div>
              <div class="post-list__date">
                ${post.date && getCorrectDate(post.date, post.time)}
              </div>
          </header>
          <div class="post-list__body">${post.content}</div>
          <footer class="post-list__footer">
            <button class="post-list__btn btn_delete ${post.id}">
              <i class="fa-regular fa-trash-can fa-lg" style="pointer-events: none; color: #828282"></i>
            </button>
            <button class="post-list__btn btn_like ${post.id}">
              <i class="fa-sharp ${post.liked ? 'fa-solid' : 'fa-regular'} fa-heart fa-lg"
                style="pointer-events: none; color: ${ post.liked ? '#1C7ED6' : '#828282'}">
              </i>
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
