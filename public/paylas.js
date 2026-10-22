// "Bağlantıyı kopyala" düğmesi (ShareLinks.astro). Ayrı dosyadır: CSP satır içi script'e izin vermez.
// Clipboard API yoksa düğme gizli kalır; paylaşım bağlantıları JavaScript olmadan da çalışır.
(function () {
  if (!navigator.clipboard || !window.isSecureContext) return;
  document.querySelectorAll('.share-copy').forEach(function (btn) {
    var status = btn.closest('.share') && btn.closest('.share').querySelector('.share-status');
    btn.hidden = false;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy-url')).then(function () {
        if (status) status.textContent = btn.getAttribute('data-copied');
        btn.classList.add('is-done');
        setTimeout(function () {
          if (status) status.textContent = '';
          btn.classList.remove('is-done');
        }, 2500);
      });
    });
  });
})();
