const users = document.querySelector('.user-container'),
  addBtn = document.getElementById('add'),
  chat = document.querySelector('.conversation');

/*********************** GLOBAL FUNCTION START********************** */

/**
 * Create message every 5-30s
 * @param {*object} user
 */
const generateMsg = user => {
  const interval = Math.floor(Math.random() * 30000) + 5000;
  setInterval(() => getText(user), interval);
};

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getAge = user => {
  const now = new Date(),
    userDate = new Date(user.results[0].dob),
    age = now.getFullYear() - userDate.getFullYear();
  return age;
};

/*********************** GLOBAL FUNCTION END********************** */

/*********************** ADDING USER BLOCK START********************** */

/**
 * Create information about user
 * @param {*DOM element} block
 * @param {*object} userData
 */
const addUserInfo = (block, userData) => {
  const userName = document.createElement('h1'),
    city = document.createElement('span'),
    phone = document.createElement('span');

  userName.textContent = `${capitalizeFirstLetter(
    userData.results[0].name.first
  )} 
  ${capitalizeFirstLetter(userData.results[0].name.last)}`;

  city.textContent = `City: ${capitalizeFirstLetter(
    userData.results[0].location.city
  )}`;
  phone.textContent = `Phone: ${userData.results[0].phone}`;

  block.appendChild(userName);
  block.appendChild(city);
  block.appendChild(phone);
};

/**
 * Create user block
 * city, phone, name
 * @param {*object} userData
 */
const createUserBlock = userData => {
  const newUser = document.createElement('div'),
    userLogo = document.createElement('img'),
    userInfo = document.createElement('div');

  newUser.className = 'user';
  userInfo.className = 'user-info';
  userLogo.setAttribute('src', userData.results[0].picture.thumbnail);

  newUser.appendChild(userLogo);
  newUser.appendChild(userInfo);
  users.appendChild(newUser);

  addUserInfo(userInfo, userData);
};

/**
 * Getting random user from
 * https://randomuser.me/api/ with AJAX
 */
const getNewUser = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://randomuser.me/api/', true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const userData = JSON.parse(xhr.responseText);
      createUserBlock(userData);
      generateMsg(userData);
    } else {
      throw new Error(`Error: ${xhr.status} ${xhr.statusText}`);
    }
  };
  xhr.send();
};

/*********************** ADDING USER BLOCK END********************** */

/*********************** CHAT CONVERSATION BLOCK START********************** */

/**
 * Create user message
 * and append it into chat
 * @param {*object} text
 * @param {*object} user
 */
const createChatMessage = (text, user) => {
  const message = document.createElement('div'),
    avatar = document.createElement('img'),
    messageInfo = document.createElement('div'),
    userName = document.createElement('h1'),
    textMessage = document.createElement('div'),
    age = getAge(user);
  let audio;

  message.className = 'message';
  messageInfo.className = 'info';

  avatar.setAttribute('src', user.results[0].picture.large);

  message.appendChild(avatar);

  userName.textContent = `${capitalizeFirstLetter(user.results[0].name.first)} 
  ${capitalizeFirstLetter(user.results[0].name.last)} 
  (${age} years old)`;

  messageInfo.appendChild(userName);
  textMessage.innerHTML = `${text.text_out}`;
  messageInfo.appendChild(textMessage);
  message.appendChild(messageInfo);
  chat.appendChild(message);

  audio = new Audio('notification/facebook_chat.mp3');
  audio.play();
};

/**
 * Getting random text message from
 * http://www.randomtext.me/api/gibberish/p-5/15 with AJAX
 * @param {*object} user
 */
const getText = user => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-5/15', true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      createChatMessage(data, user);
    } else {
      throw new Error(`Error: ${xhr.status} ${xhr.statusText}`);
    }
  };
  xhr.send();
};

/*********************** CHAT CONVERSATION BLOCK END********************** */

addBtn.addEventListener('click', getNewUser);
