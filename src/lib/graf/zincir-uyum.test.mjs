// Uyum testi: yazı işleri zincirinin (mecmua/yazi-isleri/grafik/sete.mjs → seteTanim, site 'jendume') ürettiği kart verisinin
// tipik çıktıları, BİREBİR kopya olarak gömülü (jendume deposunda mecmua yok). Her biçim için doğrulayıcı geçmeli ve çizim
// hatasız, her değer HTML'de görünmeli. Zincir çıktısı değişirse örnekler yeniden üretilir (dil alanını yazıcı ekler).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bi, setDil, tall } from './felles.mjs';
import { csvAv, grafHtml } from './html.mjs';
import { validerGraf } from './sema.mjs';

const ZINCIR = {
 "linje-yuzde-tahmin": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 2,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "linje",
  "serier": [
   {
    "navn": "Enflasyon",
    "punkter": [
     {
      "x": "2023",
      "y": 64.77
     },
     {
      "x": "2024",
      "y": 44.38
     },
     {
      "x": "2025",
      "y": 30.89
     },
     {
      "x": "2026",
      "y": 24.5
     }
    ]
   }
  ],
  "valg": {
   "prognoseFra": "2024"
  },
  "dil": "tr"
 },
 "linje-basamak-esik": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 1,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "linje",
  "serier": [
   {
    "navn": "Faiz",
    "punkter": [
     {
      "x": "Oca",
      "y": 50
     },
     {
      "x": "Şub",
      "y": 46.5
     },
     {
      "x": "Mar",
      "y": 42.5
     }
    ]
   },
   {
    "navn": "Hedef",
    "punkter": [
     {
      "x": "Oca",
      "y": 40
     },
     {
      "x": "Şub",
      "y": 40
     },
     {
      "x": "Mar",
      "y": 40
     }
    ],
    "stil": "esik"
   }
  ],
  "valg": {
   "trapp": true
  },
  "dil": "tr"
 },
 "rangering-referans": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 2,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "rangering",
  "serier": [
   {
    "navn": "Oran",
    "punkter": [
     {
      "x": "Ankara",
      "y": 5.25
     },
     {
      "x": "İzmir",
      "y": 3.1
     }
    ]
   }
  ],
  "valg": {
   "sorter": true,
   "fremhev": [
    "Ankara"
   ]
  },
  "merknader": [
   {
    "type": "mal",
    "y": 4.2,
    "tekst": "Türkiye: %4,20"
   }
  ],
  "dil": "tr"
 },
 "rangering-boncuk-tall": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 1,
  "kilde": {
   "navn": "Kurum A"
  },
  "tall": {
   "verdi": "8,8 puan",
   "etikett": "fark, artış"
  },
  "form": "rangering",
  "serier": [
   {
    "navn": "Fiyat Artışı",
    "punkter": [
     {
      "x": "İzmir",
      "y": 17.7
     },
     {
      "x": "Ankara",
      "y": 26.5
     }
    ]
   }
  ],
  "valg": {
   "sorter": false,
   "fremhev": [
    "Ankara"
   ]
  },
  "dil": "tr"
 },
 "soyle": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "milyon ton",
  "desimaler": 1,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "soyle",
  "serier": [
   {
    "navn": "Üretim",
    "punkter": [
     {
      "x": "2023",
      "y": 1200
     },
     {
      "x": "2024",
      "y": 1350.5
     }
    ]
   }
  ],
  "valg": {
   "fremhev": [
    "2024"
   ]
  },
  "dil": "tr"
 },
 "gruppert-sutun": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "Alt başlık",
  "desimaler": 1,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "gruppert",
  "serier": [
   {
    "navn": "A",
    "punkter": [
     {
      "x": "x",
      "y": 1.5
     },
     {
      "x": "y",
      "y": -2
     }
    ]
   },
   {
    "navn": "B",
    "punkter": [
     {
      "x": "x",
      "y": 2.5
     },
     {
      "x": "y",
      "y": 3
     }
    ]
   }
  ],
  "dil": "tr"
 },
 "gruppert-kucukcoklu": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "bin kişi",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "gruppert",
  "serier": [
   {
    "navn": "Ankara",
    "punkter": [
     {
      "x": "2024",
      "y": 10
     },
     {
      "x": "2025",
      "y": 12
     }
    ]
   },
   {
    "navn": "İzmir",
    "punkter": [
     {
      "x": "2024",
      "y": 8
     },
     {
      "x": "2025",
      "y": 9
     }
    ]
   }
  ],
  "dil": "tr"
 },
 "smaa": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "Alt başlık",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "smaa",
  "serier": [
   {
    "navn": "Ankara",
    "punkter": [
     {
      "x": "2024",
      "y": 10
     },
     {
      "x": "2025",
      "y": 12
     }
    ]
   },
   {
    "navn": "İzmir",
    "punkter": [
     {
      "x": "2024",
      "y": 8
     },
     {
      "x": "2025",
      "y": 9
     }
    ]
   }
  ],
  "bred": true,
  "dil": "tr"
 },
 "helning": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "Alt başlık",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "helning",
  "serier": [
   {
    "navn": "Konut",
    "punkter": [
     {
      "x": "2024",
      "y": 38
     },
     {
      "x": "2025",
      "y": 39
     }
    ]
   },
   {
    "navn": "Ofis",
    "punkter": [
     {
      "x": "2024",
      "y": 6
     },
     {
      "x": "2025",
      "y": 11
     }
    ]
   }
  ],
  "dil": "tr"
 },
 "manual": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "Alt başlık",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "manual",
  "valg": {
   "gruppenavn": [
    "2025",
    "2026"
   ],
   "sorter": false,
   "malnavn": "Hedef"
  },
  "serier": [
   {
    "navn": "Başlık",
    "punkter": [
     {
      "x": "A",
      "y": 75,
      "y2": 60,
      "mal": 50
     },
     {
      "x": "B",
      "y": 51,
      "y2": 45,
      "mal": 40
     }
    ]
   }
  ],
  "dil": "tr"
 },
 "nokkeltall": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "Alt başlık",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "nokkeltall",
  "serier": [
   {
    "navn": "Şimdi",
    "rol": "ana",
    "punkter": [
     {
      "x": "Mayıs 2026",
      "y": 109724
     }
    ]
   },
   {
    "navn": "Karşılaştırma",
    "rol": "sammenligning",
    "punkter": [
     {
      "x": "Mayıs 2026",
      "y": 109724
     },
     {
      "x": "Aralık 2024",
      "y": 163034
     }
    ]
   },
   {
    "navn": "Künye",
    "rol": "kunye",
    "punkter": [
     {
      "x": "a",
      "y": 1
     },
     {
      "x": "b",
      "y": 2
     }
    ]
   }
  ],
  "valg": {
   "fremhev": [
    "Mayıs 2026"
   ]
  },
  "dil": "tr"
 },
 "minitabell": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "Alt başlık",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "minitabell",
  "serier": [
   {
    "navn": "Yolcu",
    "punkter": [
     {
      "x": "Otobüs",
      "y": 459.1
     },
     {
      "x": "Tren",
      "y": 120.4
     }
    ],
    "desimaler": 1
   },
   {
    "navn": "Değişim",
    "punkter": [
     {
      "x": "Otobüs",
      "y": 2.4
     },
     {
      "x": "Tren",
      "y": -1.2
     }
    ],
    "desimaler": 1,
    "prosent": true
   }
  ],
  "valg": {
   "fremhev": [
    "Tren"
   ]
  },
  "dil": "tr"
 },
 "rutenett": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "rutenett",
  "serier": [
   {
    "navn": "Pay",
    "punkter": [
     {
      "x": "A",
      "y": 40
     },
     {
      "x": "B",
      "y": 35
     },
     {
      "x": "C",
      "y": 25
     }
    ]
   }
  ],
  "dil": "tr"
 },
 "smultring": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 0,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "smultring",
  "serier": [
   {
    "navn": "Pay",
    "punkter": [
     {
      "x": "Solar",
      "y": 60
     },
     {
      "x": "Rüzgar",
      "y": 40
     }
    ]
   }
  ],
  "dil": "tr"
 },
 "bidrag-bilesim": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 1,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "bidrag",
  "serier": [
   {
    "navn": "Kalemler",
    "punkter": [
     {
      "x": "A",
      "y": 10
     },
     {
      "x": "B",
      "y": 5
     }
    ]
   },
   {
    "navn": "Toplam",
    "punkter": [
     {
      "x": "Toplam",
      "y": 15
     }
    ]
   }
  ],
  "dil": "tr"
 },
 "bidrag-degisim": {
  "tittel": "Başlık",
  "under": "Alt başlık",
  "enhet": "prosent",
  "desimaler": 2,
  "kilde": {
   "navn": "Kurum A"
  },
  "form": "bidrag",
  "serier": [
   {
    "navn": "Katkılar",
    "punkter": [
     {
      "x": "Gıda",
      "y": 2.5
     },
     {
      "x": "Enerji",
      "y": -1.25
     }
    ]
   },
   {
    "navn": "Toplam",
    "punkter": [
     {
      "x": "Toplam",
      "y": 1.25
     }
    ]
   }
  ],
  "dil": "tr"
 }
};

const esc = (t) => t.replace(/&/g, '&amp;');
const enhOf = (e) => (/^prosent$/i.test(String(e ?? '').trim()) ? '%' : String(e ?? '').trim());

test('zincir çıktısı: her biçimde doğrulayıcı geçer, iki dilde çizilir, her değer HTML içinde görünür', () => {
  const formlar = new Set();
  for (const [ad, ham] of Object.entries(ZINCIR)) {
    for (const dil of ['tr', 'en']) {
      const d = { ...ham, dil };
      assert.deepEqual(validerGraf(d), [], ad);
      const html = grafHtml(d, { id: 'g1', dosya: 'x' });
      assert.ok(!/NaN|undefined|Infinity|\[object/.test(html), `${ad}/${dil}: NaN/undefined`);
      assert.ok(!/ style="/.test(html), `${ad}: satır içi stil`);
      assert.ok(html.includes(esc(d.tittel)), `${ad}: başlık`);
      if (d.under) assert.ok(html.includes(`<p class="g-under">${esc(d.under)}</p>`), `${ad}: alt başlık`);
      setDil(dil);
      for (const s of d.serier) for (const p of s.punkter) {
        for (const y of [p.y, p.y2, p.mal]) {
          if (!Number.isFinite(y)) continue;
          const sayi = tall(y, s.desimaler ?? d.desimaler);
          assert.ok(html.includes(esc(sayi)), `${ad}/${dil} ${s.navn}/${p.x}: ${sayi} yok`);
        }
      }
      for (const m of d.merknader ?? []) assert.ok(html.includes(esc(tall(m.y, d.desimaler))), `${ad}: merknad değeri yok`);
      setDil('tr');
    }
    formlar.add(ham.form);
  }
  for (const f of ['linje', 'soyle', 'rangering', 'smultring', 'helning', 'manual', 'smaa', 'nokkeltall', 'minitabell', 'rutenett', 'bidrag', 'gruppert']) assert.ok(formlar.has(f), `örnek yok: ${f}`);
});

test('enhet: prosent yüzde gibi yazılır (tr %4,85, en 4.85%), başka birim sayının ardından', () => {
  const d = { ...ZINCIR['linje-yuzde-tahmin'], dil: 'tr' };
  setDil('tr');
  assert.ok(grafHtml(d).includes(esc(bi(64.77, 2, enhOf(d.enhet)))));
  assert.ok(grafHtml(d).includes('%64,77'));
  assert.ok(grafHtml({ ...d, dil: 'en' }).includes('64.77%'));
  assert.ok(!/prosent/.test(grafHtml(d)));
  setDil('tr');
  assert.ok(grafHtml({ ...ZINCIR.soyle, dil: 'tr' }).includes('1.350,5 milyon ton'));
});

test('under ve tall: alt başlık ve büyük rakam kart başlığının altında', () => {
  const h = grafHtml({ ...ZINCIR['rangering-boncuk-tall'], dil: 'tr' });
  assert.match(h, /<p class="g-under">Alt başlık<\/p>/);
  assert.match(h, /<p class="g-tall">8,8 puan<small>fark, artış<\/small><\/p>/);
  assert.ok(!grafHtml({ ...ZINCIR.soyle, dil: 'tr' }).includes('g-tall'));
});

test('linje: basamaklı çizgi, kesik eşik çizgisi (adı sonunda), tahmin kısmı kesik çizgi ve "tahmin / forecast" işareti', () => {
  const b = grafHtml({ ...ZINCIR['linje-basamak-esik'], dil: 'tr' });
  assert.match(b, /<g class="g-serie g-s0"><path d="M[^"]*H[^"]*V/, 'basamaklı yol');
  assert.match(b, /<g class="g-serie g-esik">/);
  assert.match(b, /class="g-esik-t"[^>]*>Hedef</);
  const t = grafHtml({ ...ZINCIR['linje-yuzde-tahmin'], dil: 'tr' });
  assert.match(t, /class="g-prognose"/);
  assert.ok(t.includes('2025 (tahmin)') && t.includes('2026 (tahmin)') && !t.includes('2024 (tahmin)'));
  const e = grafHtml({ ...ZINCIR['linje-yuzde-tahmin'], dil: 'en' });
  assert.ok(e.includes('2025 (forecast)'));
  // Tahmin ipucu verisinde de ve tabloda da işaretli.
  assert.ok(/data-graf-punkter[^<]*2025 \(tahmin\)/.test(t) || /2025 \(tahmin\)/.test(t.split('data-graf-punkter')[1]));
});

test('rangering: referans metni değeri taşıyorsa yinelenmez', () => {
  const h = grafHtml({ ...ZINCIR['rangering-referans'], dil: 'tr' });
  assert.ok(h.includes('Türkiye: %4,20'));
  assert.ok(!h.includes('Türkiye: %4,20 %4,20'));
});

test('bidrag: bileşimde işaretsiz, değişimde ▲/▼; toplam satırı adıyla', () => {
  const a = grafHtml({ ...ZINCIR['bidrag-bilesim'], dil: 'tr' });
  assert.ok(!a.includes('▲') && a.includes('Toplam') && a.includes('%15,0'));
  const b = grafHtml({ ...ZINCIR['bidrag-degisim'], dil: 'tr' });
  assert.ok(b.includes('▲ +%2,50') && b.includes('▼ %−1,25'));
});

test('gruppert: seriler yan yana, tabloda her seri bir sütun; CSV her seriyi taşır', () => {
  const d = { ...ZINCIR['gruppert-sutun'], dil: 'tr' };
  const h = grafHtml(d);
  assert.ok(h.includes('<th scope="col">A</th>') && h.includes('<th scope="col">B</th>'));
  assert.ok(h.includes('g-n-su') && h.includes('g-n-kontur'));
  assert.match(csvAv(d), /label|etiket/);
});

test('minitabell: seri başına prosent', () => {
  setDil('tr');
  const h = grafHtml({ ...ZINCIR.minitabell, dil: 'tr' });
  assert.ok(h.includes('+%2,4') || h.includes('%2,4'));
});
