const refs = {
  watchedModal: document.querySelector('#watchedModalBtn'),
  queueModal: document.querySelector('#queueModalBtn'),
};



refs.watchedModal.addEventListener('click', btnWatchedChange)
refs.queueModal.addEventListener('click', btnQueueChange)



function btnWatchedChange (){
 
  refs.watchedModal.classList.toggle('is-active__Btn')
  refs.watchedModal.textContent ="Remove from watched"
  
}


function btnQueueChange(){
 
    refs.queueModal.classList.toggle('is-active__Btn')
    refs.queueModal.textContent ="Remove from queue"
}