// Register service worker
if ('serviceWorker' in navigator) {

navigator.serviceWorker.register('service-worker.js')
.then(()=>console.log('Service Worker registered'))
.catch(err=>console.log('Service Worker registration failed:',err));

}
// Handle install prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt',(e)=>{

e.preventDefault();
deferredPrompt = e;
installBtn.style.display = 'block';

});

installBtn.addEventListener('click',()=>{

if(deferredPrompt){

deferredPrompt.prompt();

deferredPrompt.userChoice.then((choiceResult)=>{

if(choiceResult.outcome === 'accepted'){
console.log('User accepted install');
}else{
console.log('User dismissed install');
}

deferredPrompt=null;

});

}

});

