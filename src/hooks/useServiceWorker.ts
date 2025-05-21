if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');

  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
      showReloadToast();
    }
  });
}

function showReloadToast() {
  const toast = document.createElement('div');
  toast.innerText = 'New content is available. Click to reload.';
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.cursor = 'pointer';
  toast.style.zIndex = '1000';

  toast.onclick = () => {
    window.location.reload();
  };

  document.body.appendChild(toast);
}
