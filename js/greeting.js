const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

//1단계
const storageUsername = localStorage.getItem(USERNAME_KEY);

//2단계
if (storageUsername === null) {
  //Local Storage에서 username 값이 없는 경우 --> login-form 추가.
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  //Local Storage에서 username 값이 있는 경우 --> greeting 추가.
  paintGreetings(); //username 값이 들어간다.
}

function onLoginSubmit(submitEvent) {
  submitEvent.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);

  localStorage.setItem(USERNAME_KEY, loginInput.value);
  paintGreetings(); //username 값이 들어간다.
}

function paintGreetings() {
  const printUsername = localStorage.getItem(USERNAME_KEY);
  greeting.innerText = `hello ${printUsername}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
