// Bülten sayfası: ?durum= değerine uyan durum kutusunu gösterir (BultenSayfasi; CSP satır içi script'e izin vermez).
// JavaScript yoksa bu dosya çalışmaz; sayfadaki genel açıklama yeterlidir.
(function () {
  var durum = new URLSearchParams(window.location.search).get('durum');
  if (!durum) return;
  var kutular = document.querySelectorAll('[data-durum]');
  for (var i = 0; i < kutular.length; i++) {
    if (kutular[i].getAttribute('data-durum') === durum) {
      kutular[i].hidden = false;
      kutular[i].focus();
      return;
    }
  }
})();
