// Grafik kartlarının etkileşimi: fare, dokunma ve klavye ile değer kutusu; "Grafik / Tablo" düğmesi.
// Grafik derlemede çizilir (src/lib/graf); bu betik yalnız ipucu ve görünüm geçişi ekler. JS kapalıyken grafik ve tablo
// birlikte görünür. Her kartın verisi kendi <script type="application/json" data-graf-punkter> öğesindedir.
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var acikKapat = null;

  function kur(kart) {
    var sekme = kart.querySelector('.g-sekme');
    var grafikGorunum = kart.querySelector('[data-v="grafik"]');
    var tabloGorunum = kart.querySelector('[data-v="tablo"]');
    var veri = null;
    try {
      veri = JSON.parse((kart.querySelector('[data-graf-punkter]') || {}).textContent || 'null');
    } catch (e) {
      veri = null;
    }
    var svg = kart.querySelector('svg');
    var tips = kart.querySelector('.g-tips');
    var flate = kart.querySelector('.g-flate');
    var skjul = function () {};

    if (veri && svg && tips && veri.punkter.length) {
      var vb = svg.viewBox.baseVal;
      var i = veri.punkter.length - 1;
      var folg = null;
      var ring = null;
      var aktiv = null;
      var midt = svg.querySelector('[data-midt]');
      var midtStart = midt ? midt.textContent : '';

      if (veri.modus === 'serie' && veri.ramme) {
        folg = document.createElementNS(NS, 'line');
        folg.setAttribute('class', 'g-folg');
        folg.setAttribute('y1', veri.ramme.topp);
        folg.setAttribute('y2', veri.ramme.bunn);
        ring = document.createElementNS(NS, 'circle');
        ring.setAttribute('class', 'g-ring');
        ring.setAttribute('r', '5');
        folg.style.display = ring.style.display = 'none';
        svg.appendChild(folg);
        svg.appendChild(ring);
      }
      var elementer = veri.modus === 'element' ? Array.prototype.slice.call(svg.querySelectorAll('[data-i]')) : [];

      skjul = function () {
        tips.hidden = true;
        if (folg) folg.style.display = ring.style.display = 'none';
        if (aktiv) aktiv.classList.remove('g-pa');
        aktiv = null;
        if (midt) midt.textContent = midtStart;
        if (acikKapat === skjul) acikKapat = null;
      };

      var vis = function (j) {
        i = Math.max(0, Math.min(veri.punkter.length - 1, j));
        var p = veri.punkter[i];
        if (acikKapat && acikKapat !== skjul) acikKapat();
        acikKapat = skjul;
        var r = svg.getBoundingClientRect();
        var fr = flate.getBoundingClientRect();
        var sx = r.width / vb.width;
        tips.textContent = p.tekst;
        tips.hidden = false;
        var halv = tips.offsetWidth / 2;
        var px = Math.max(halv, Math.min(fr.width - halv, r.left - fr.left + p.x * sx));
        tips.style.left = px + 'px';
        tips.style.top = r.top - fr.top + p.y * sx + 'px';
        if (folg) {
          folg.setAttribute('x1', p.x);
          folg.setAttribute('x2', p.x);
          ring.setAttribute('cx', p.x);
          ring.setAttribute('cy', p.y);
          folg.style.display = ring.style.display = '';
        }
        if (elementer.length) {
          if (aktiv) aktiv.classList.remove('g-pa');
          aktiv = elementer.filter(function (e) { return Number(e.dataset.i) === i; })[0] || null;
          if (aktiv) aktiv.classList.add('g-pa');
        }
        if (midt && p.midt) midt.textContent = p.midt;
      };

      var naermest = function (e) {
        var r = svg.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * vb.width;
        var best = 0;
        for (var j = 1; j < veri.punkter.length; j++) if (Math.abs(veri.punkter[j].x - x) < Math.abs(veri.punkter[best].x - x)) best = j;
        return best;
      };

      if (veri.modus === 'serie') {
        svg.addEventListener('pointermove', function (e) { vis(naermest(e)); });
        svg.addEventListener('pointerdown', function (e) { e.stopPropagation(); vis(naermest(e)); });
      } else {
        elementer.forEach(function (el) {
          el.addEventListener('pointerenter', function () { vis(Number(el.dataset.i)); });
          el.addEventListener('pointerdown', function (e) { e.stopPropagation(); vis(Number(el.dataset.i)); });
        });
      }
      svg.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') skjul(); });
      kart.addEventListener('keydown', function (e) {
        var fram = e.key === 'ArrowRight' || (veri.modus === 'element' && e.key === 'ArrowDown');
        var bak = e.key === 'ArrowLeft' || (veri.modus === 'element' && e.key === 'ArrowUp');
        if (fram || bak) { vis(i + (fram ? 1 : -1)); e.preventDefault(); }
        if (e.key === 'Escape') skjul();
      });
      // Yalnız klavye odağında: başlığa dokunmak ipucu açmasın.
      kart.addEventListener('focusin', function (e) { if (e.target === kart && kart.matches(':focus-visible')) vis(i); });
      kart.addEventListener('focusout', function (e) { if (!kart.contains(e.relatedTarget)) skjul(); });
    }

    // Grafik / Tablo düğmesi: JS varken düğmeler görünür, tablo gizli başlar.
    if (sekme && grafikGorunum && tabloGorunum) {
      sekme.hidden = false;
      tabloGorunum.hidden = true;
      var dugmeler = Array.prototype.slice.call(sekme.querySelectorAll('button[data-g]'));
      dugmeler.forEach(function (b) {
        b.addEventListener('click', function () {
          var tablo = b.getAttribute('data-g') === 'tablo';
          skjul();
          grafikGorunum.hidden = tablo;
          tabloGorunum.hidden = !tablo;
          dugmeler.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        });
      });
    }
  }

  var kartlar = document.querySelectorAll('[data-graf]');
  for (var k = 0; k < kartlar.length; k++) kur(kartlar[k]);
  document.addEventListener('pointerdown', function () { if (acikKapat) acikKapat(); });
})();
