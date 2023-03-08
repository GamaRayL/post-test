export function createFocus() {
  this.style.borderColor = '#EFEFEF';
}

export function createBlur(e) {
  if (e.target.value.trim() === '') {
    e.target.style.borderColor = '#FF5C5C';
  } else if (e.target.value) {
    e.target.style.borderColor = '#EFEFEF';
  }
}

export function getCorrectDate(d, time) {
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
