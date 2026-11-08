import { safeStorage } from '../lib/safe-storage.ts';

// Haber sayfası araçları: yazı boyu, dinle, paylaş, sözlük kartı ve "Bu haber işinize yaradı mı?". tidsrost leseverktoy.ts'in eşi.
// Tarayıcı deposu yalnız okurun kendi tercihi için (yazı boyu, verilmiş oy); erişilemezse sayfa yine çalışır.
const oku = (k: string) => safeStorage.getItem(k);
const yaz = (k: string, v: string | null) => {
  if (v === null) safeStorage.removeItem(k);
  else safeStorage.setItem(k, v);
};

// Yazı boyu
const boy = document.querySelector<HTMLButtonElement>('[data-boy]');
const boyUygula = (buyuk: boolean) => {
  document.documentElement.classList.toggle('hn-buyuk', buyuk);
  boy?.setAttribute('aria-pressed', String(buyuk));
};
boyUygula(oku('jd-yazi-boyu') === 'buyuk');
boy?.addEventListener('click', () => {
  const buyuk = boy.getAttribute('aria-pressed') !== 'true';
  boyUygula(buyuk);
  yaz('jd-yazi-boyu', buyuk ? 'buyuk' : null);
});

// Dinle: tarayıcının kendi konuşma sentezi; yoksa düğme gizli kalır.
const dinle = document.querySelector<HTMLButtonElement>('[data-dinle]');
if (dinle && 'speechSynthesis' in window) {
  dinle.hidden = false;
  const bitti = () => {
    dinle.setAttribute('aria-pressed', 'false');
    dinle.textContent = dinle.dataset.dinleMetni ?? '';
  };
  dinle.addEventListener('click', () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      bitti();
      return;
    }
    const parcalar = [document.querySelector('h1')?.textContent ?? '', ...[...document.querySelectorAll('.prose p')].map((p) => p.textContent ?? '')];
    const s = new SpeechSynthesisUtterance(parcalar.filter(Boolean).join('\n'));
    s.lang = dinle.dataset.dil ?? 'tr-TR';
    s.onend = bitti;
    s.onerror = bitti;
    speechSynthesis.speak(s);
    dinle.setAttribute('aria-pressed', 'true');
    dinle.textContent = dinle.dataset.durdurMetni ?? '';
  });
  addEventListener('pagehide', () => speechSynthesis.cancel());
}

// Paylaş: paylaşım menüsü varsa o, yoksa bağlantı panoya.
const paylas = document.querySelector<HTMLButtonElement>('[data-paylas]');
paylas?.addEventListener('click', async () => {
  const adres = paylas.dataset.adres ?? location.href;
  try {
    if (navigator.share) await navigator.share({ title: paylas.dataset.baslik, url: adres });
    else {
      await navigator.clipboard.writeText(adres);
      paylas.textContent = paylas.dataset.kopyalandi ?? '';
    }
  } catch {
    /* okur vazgeçti ya da pano kapalı */
  }
});

// Sözlük kartı: metindeki terim bağlantısına dokununca kısa tanım bağlantının paragrafından sonra açılır.
const veriEl = document.getElementById('sozluk-veri');
const sozluk: Record<string, { ad: string; ozet: string; adres: string; devam: string }> = veriEl ? JSON.parse(veriEl.textContent || '{}') : {};
document.querySelectorAll<HTMLAnchorElement>('.prose a.term-link').forEach((a, i) => {
  const terim = sozluk[a.getAttribute('href') ?? ''];
  if (!terim) return;
  const kart = document.createElement('span');
  kart.className = 'hn-terim';
  kart.id = `terim-${i}`;
  kart.hidden = true;
  const b = document.createElement('b');
  b.textContent = terim.ad;
  const devam = document.createElement('a');
  devam.href = terim.adres;
  devam.textContent = `${terim.devam} →`;
  kart.append(b, document.createTextNode(`${terim.ozet} `), devam);
  (a.closest('p, li') ?? a).after(kart);
  a.setAttribute('aria-expanded', 'false');
  a.setAttribute('aria-controls', kart.id);
  a.addEventListener('click', (e) => {
    e.preventDefault();
    kart.hidden = !kart.hidden;
    a.setAttribute('aria-expanded', String(!kart.hidden));
  });
});

// "Bu haber işinize yaradı mı?": tek oy; yalnız gün + haber + cevap sayılır.
const yarar = document.querySelector<HTMLElement>('[data-yarar-kimlik]');
if (yarar) {
  const kimlik = yarar.dataset.yararKimlik ?? '';
  const anahtar = `jd-yarar:${kimlik}`;
  const kapat = () => {
    yarar.querySelectorAll('button').forEach((b) => (b.disabled = true));
    const o = yarar.querySelector('output');
    if (o) o.hidden = false;
  };
  if (oku(anahtar)) kapat();
  yarar.querySelectorAll<HTMLButtonElement>('[data-yarar]').forEach((b) =>
    b.addEventListener('click', () => {
      kapat();
      yaz(anahtar, '1');
      fetch('/api/yarar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kimlik, cevap: b.dataset.yarar }),
        keepalive: true,
      }).catch(() => {});
    }),
  );
}
