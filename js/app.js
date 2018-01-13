const users = document.querySelector('.user-container'),
  addBtn = document.getElementById('add'),
  chat = document.querySelector('.conversation');

/**
 * Function for creation message every 5-30s
 * @param {*user info} user
 */
const generateMsg = user => {
  const interval = Math.floor(Math.random() * 30000) + 5000;
  setInterval(() => getText(user), interval);
};

/*********************** ADDING USER BLOCK START********************** */

/**
 * Function for creation information about user
 * @param {*} block
 * @param {*user info} userData
 */
const addUserInfo = (block, userData) => {
  const userName = document.createElement('h1'),
    city = document.createElement('span'),
    phone = document.createElement('span');
  userName.textContent = `${userData.results[0].name.first} ${
    userData.results[0].name.last
  }`;
  city.textContent = `City: ${userData.results[0].location.city}`;
  phone.textContent = `Phone: ${userData.results[0].phone}`;
  block.appendChild(userName);
  block.appendChild(city);
  block.appendChild(phone);
};

/**
 * Function for creation user block
 * city, phone, name
 * @param {*} userData
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
 * Function for getting random user from
 * https://randomuser.me/api/ with AJAX
 */
const getNewUser = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://randomuser.me/api/', true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      createUserBlock(data);
      generateMsg(data);
    } else {
      throw new Error(`Error: ${xhr.status} ${xhr.statusText}`);
    }
  };
  xhr.send();
};

/*********************** ADDING USER BLOCK END********************** */

/*********************** CHAT CONVERSATION BLOCK START********************** */

/**
 * Function for creation user message
 * and append it into chat
 * @param {*message Text} text
 * @param {* user data} user
 */
const createChatMessage = (text, user) => {
  const message = document.createElement('div'),
    avatar = document.createElement('img'),
    messageInfo = document.createElement('div'),
    userName = document.createElement('h1');
  textMessage = document.createElement('div');
  let audio;
  message.className = 'message';
  messageInfo.className = 'info';
  avatar.setAttribute('src', user.results[0].picture.large);
  message.appendChild(avatar);
  userName.textContent = `${user.results[0].name.first} ${
    user.results[0].name.last
  }`;
  messageInfo.appendChild(userName);
  textMessage.innerHTML = `${text.text_out}`;
  messageInfo.appendChild(textMessage);
  message.appendChild(messageInfo);
  chat.appendChild(message);
  audio = new Audio('notification/facebook_chat.mp3');
  audio.play();
};

/**
 * Function for getting random text message from
 * http://www.randomtext.me/api/gibberish/p-5/15 with AJAX
 * @param {*} user
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
