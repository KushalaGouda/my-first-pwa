// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed:', err));
}

// Handle install prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const exitBtn = document.getElementById('exitBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show both install and exit buttons when prompt is available
    installBtn.style.display = 'block';
    exitBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted install');
            } else {
                console.log('User dismissed install');
            }
            deferredPrompt = null;
        });
    }
});

// Exit button logic
function exitApp() {
    if (deferredPrompt) {
        // Show the install prompt when Exit is pressed
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted install');
            } else {
                console.log('User dismissed install');
            }
            deferredPrompt = null;
        });
    } else {
        // If already installed or prompt not available, just close
        window.open('', '_self').close();
    }
}
