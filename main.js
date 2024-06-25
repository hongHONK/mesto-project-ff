(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"91e6e543-c842-431e-b670-f4c42383d9be","Content-Type":"application/json"}},t=function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){if(!e.ok)return Promise.reject("Ошибка: ".concat(e.status))}))},n=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},r=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},o=document.querySelector("#card-template").content;function c(e){t(e.id).catch((function(e){return console.log(e)})).finally((function(){return e.remove()}))}function a(e,t){var o=e.closest(".card").id;e.classList.contains("card__like-button_is-active")?(e.classList.remove("card__like-button_is-active"),r(o).then((function(e){t.textContent=e.likes.length})).catch((function(e){console.log(e)}))):(e.classList.add("card__like-button_is-active"),n(o).then((function(e){t.textContent=e.likes.length})).catch((function(e){console.log(e)})))}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function s(e){e.currentTarget===e.target&&u(e.currentTarget)}function l(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&u(t)}function d(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-input-error"));o.textContent="",o.classList.remove(r),t.classList.remove(n)}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(n)?(e.disabled=!1,e.classList.remove(t)):(e.disabled=!0,e.classList.add(t))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t.inputErrorClass,t.errorClass)})),f(r,t.inactiveButtonClass,n)}var m=document.querySelector(".content"),_=m.querySelector(".profile"),v=_.querySelector(".profile__title"),y=_.querySelector(".profile__description"),h=_.querySelector(".profile__image"),S=_.querySelector(".profile__edit-button"),b=_.querySelector(".profile__add-button"),q=m.querySelector(".places__list"),k=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_image"),L=document.querySelector(".popup_type_avatar"),C=document.querySelector('form[name = "edit-profile"]'),j=C.querySelector('input[name = "name"]'),A=C.querySelector('input[name = "description"]'),x=document.querySelector('form[name = "new-place"]'),P=x.querySelector('input[name = "place-name"]'),U=x.querySelector('input[name = "link"]'),T=document.querySelector('form[name = "edit-avatar"]'),w=T.querySelector('input[name = "avatar-link"]'),B=E.querySelector(".popup__caption"),D=E.querySelector(".popup__image"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function O(e){v.textContent=e.name,y.textContent=e.about,h.style.backgroundImage="url(".concat(e.avatar,")")}function J(e,t,n,r){var i=function(e,t,n,r,c,a){var i=o.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__title"),s=i.querySelector(".card__image"),l=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like-button"),f=i.querySelector(".card__like-counter");return i.id=e._id,u.textContent=e.name,f.textContent=e.likes.length,s.setAttribute("alt",e.name),s.setAttribute("src",e.link),s.addEventListener("click",(function(){return a(i)})),d.addEventListener("click",(function(){return c(d,f)})),t?l.addEventListener("click",(function(){return r(i)})):l.remove(),n&&d.classList.add("card__like-button_is-active"),i}(e,t,n,c,a,H);switch(r){case"append":q.append(i);break;case"prepend":q.prepend(i)}}function M(e,t){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"}function H(e){var t=e.querySelector(".card__title"),n=e.querySelector(".card__image");B.textContent=t.textContent,D.setAttribute("alt",n.getAttribute("alt")),D.setAttribute("src",n.getAttribute("src")),i(E)}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t=e[0],n=e[1];O(t),n.forEach((function(e){var n=t._id==e.owner._id,r=e.likes.some((function(e){return t._id==e._id}));J(e,n,r,"append")}))})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(t){t.addEventListener("input",(function(t){!function(e,t,n){var r=e.closest("form");if(e.validity.valid)d(r,e,t,n);else{var o=function(e){return e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validationMessage}(e);!function(e,t,n,r,o){var c=e.querySelector(".".concat(t.name,"-input-error"));c.textContent=o,c.classList.add(r),t.classList.add(n)}(r,e,t,n,o)}}(t.target,e.inputErrorClass,e.errorClass),f(r,e.inactiveButtonClass,n)}))}))}))}(N),[k,g,E,L].forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return u(e)})),e.addEventListener("click",s)})),S.addEventListener("click",(function(){j.value=v.textContent,A.value=y.textContent,p(C,N),i(k)})),b.addEventListener("click",(function(){p(x,N),i(g)})),h.addEventListener("click",(function(){p(T,N),i(L)})),C.addEventListener("submit",(function(t){t.preventDefault();var n={name:j.value,about:A.value};M(t.target,!0),function(t){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t.name,about:t.about})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){O(e)})).catch((function(e){console.log(e)})).finally((function(){M(t.target,!1),u(k),C.reset()}))})),x.addEventListener("submit",(function(t){t.preventDefault();var n={name:P.value,link:U.value};M(t.target,!0),function(t){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:t.name,link:t.link})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){J(e,!0,!1,"prepend")})).catch((function(e){console.log(e)})).finally((function(){M(t.target,!1),u(g),x.reset()}))})),T.addEventListener("submit",(function(t){t.preventDefault();var n=w.value;console.log(t.target),M(t.target,!0),function(t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})}).then((function(e){if(!e.ok)return Promise.reject("Ошибка: ".concat(e.status))}))}(n).catch((function(e){console.log(e)})).finally((function(){M(t.target,!1),h.style.backgroundImage="url(".concat(n,")"),u(L),T.reset()}))}))})();