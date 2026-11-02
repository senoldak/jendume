// Yayın odası: ajan kaydı, yazı türüne göre adımlar ve "Bu haber nasıl hazırlandı" kartının olgu satırı (iki dilli).
// Adlar, roller ve görünüm yayın odası sayfasıyla (src/scripts/yayin-odasi.mjs) aynıdır. Ajan adları otomatik adımların
// adıdır, insan değildir. tidsrost src/lib/redaksjon.mjs'in jendume eşi.
import { kisiYazariMi } from './yazi-turu.mjs';

const G = '#00924a', KG = '#00783d', AG = '#d3ecdd', TAS = '#a9ada2', KTAS = '#8b8f86', GRI = '#5a5d63', MUR = '#2d3135', BEYAZ = '#fdfdfb';

/** @typedef {{ ad: string, rol: { tr: string, en: string }, yz: boolean, u: object }} Ajan */
/** @type {Record<string, Ajan>} */
export const AJANLAR = {
  ada: { ad: 'Ada', rol: { tr: 'Keşifçi', en: 'Scout' }, yz: true, u: { sac: 'uzun', sacRenk: '#e2c26a', ten: '#f2cfb0', ust: G, ustGolge: KG } },
  kaan: { ad: 'Kaan', rol: { tr: 'Değerlendirici', en: 'Assessor' }, yz: true, u: { sac: 'kisa', sakal: true, sacRenk: '#6b4226', ten: '#e3b48f', ust: TAS, ustGolge: KTAS } },
  elif: { ad: 'Elif', rol: { tr: 'Yazar', en: 'Writer' }, yz: true, u: { sac: 'topuz', sacRenk: '#b5482a', ten: '#f5d4ba', ust: KG, ustGolge: '#006a37', gozluk: true } },
  mert: { ad: 'Mert', rol: { tr: 'Masa editörü', en: 'Desk editor' }, yz: true, u: { sac: 'kel', sakal: true, sacRenk: '#b8b8b0', ten: '#efc9a8', ust: AG, ustGolge: '#b9d8c6', gozluk: true } },
  selin: { ad: 'Selin', rol: { tr: 'Denetçi', en: 'Checker' }, yz: true, u: { sac: 'kivircik', sacRenk: '#1f1611', ten: '#8d5a3b', ust: GRI, ustGolge: '#474d53' } },
  arda: { ad: 'Arda', rol: { tr: 'Çizer', en: 'Illustrator' }, yz: true, u: { sac: 'kakul', sacRenk: '#16191c', ten: '#d2a079', ust: BEYAZ, ustGolge: '#e6e6e0', alt: G } },
  lale: { ad: 'Lale', rol: { tr: 'Yayıncı', en: 'Publisher' }, yz: true, u: { sac: 'atkuyrugu', sacRenk: '#2a1c14', ten: '#a8714e', ust: MUR, ustGolge: '#24282c' } },
  deniz: { ad: 'Deniz', rol: { tr: 'Konu', en: 'Topic' }, yz: true, u: { sac: 'kisa', sacRenk: '#8a8a82', ten: '#f0cdb2', ust: MUR, ceket: MUR } },
  ece: { ad: 'Ece', rol: { tr: 'Araştırma', en: 'Research' }, yz: true, u: { sac: 'kivircik', sacRenk: '#a0643c', ten: '#f2cfb0', ust: GRI, sakal: true } },
  can: { ad: 'Can', rol: { tr: 'Yazım', en: 'Drafting' }, yz: true, u: { sac: 'uzun', sacRenk: '#3b2a1f', ten: '#c98e66', ust: KG, ustGolge: '#006a37' } },
  nil: { ad: 'Nil', rol: { tr: 'Doğrulama', en: 'Fact check' }, yz: true, u: { sac: 'kisa', sacRenk: '#e2c26a', ten: '#f5d4ba', ust: GRI, gozluk: true } },
  defne: { ad: 'Defne', rol: { tr: 'Redaksiyon', en: 'Copy edit' }, yz: true, u: { sac: 'kel', sacRenk: '#3b2a1f', ten: '#e3b48f', ust: TAS, ceket: MUR } },
  umut: { ad: 'Umut', rol: { tr: 'Grafik', en: 'Graphics' }, yz: true, u: { sac: 'topuz', sacRenk: '#16191c', ten: '#8d5a3b', ust: G, ustGolge: KG } },
  bora: { ad: 'Bora', rol: { tr: 'Dil', en: 'Language' }, yz: true, u: { sac: 'atkuyrugu', sacRenk: '#b5482a', ten: '#f2cfb0', ust: TAS, ustGolge: KTAS } },
  ipek: { ad: 'İpek', rol: { tr: 'Hukuk', en: 'Legal' }, yz: true, u: { sac: 'kisa', sacRenk: '#16191c', ten: '#d2a079', ust: BEYAZ, ceket: MUR, gozluk: true } },
  tuna: { ad: 'Tuna', rol: { tr: 'Kapak', en: 'Cover' }, yz: true, u: { sac: 'kakul', sacRenk: '#16191c', ten: '#e3b48f', ust: BEYAZ, ustGolge: '#e6e6e0', alt: G } },
  su: { ad: 'Su', rol: { tr: 'Yayın editörü', en: 'Publishing editor' }, yz: true, u: { sac: 'uzun', sacRenk: '#6b4226', ten: '#f0cdb2', ust: AG, ustGolge: '#b9d8c6', ceket: G } },
  cem: { ad: 'Cem', rol: { tr: 'Çevirmen', en: 'Translator' }, yz: true, u: { sac: 'kakul', sacRenk: '#6b4226', ten: '#f2cfb0', ust: KG, ustGolge: '#006a37' } },
  mina: { ad: 'Mina', rol: { tr: 'Dil düzeltmeni', en: 'Language editor' }, yz: true, u: { sac: 'uzun', sacRenk: '#e2c26a', ten: '#f5d4ba', ust: TAS, gozluk: true } },
  senol: { ad: 'Şenol Dak', rol: { tr: 'Gazeteci', en: 'Journalist' }, yz: false, u: { sac: 'kisa', sacRenk: '#2b211b', ten: '#e6bc96', ust: BEYAZ, ceket: '#16191c' } },
};

const adim = (id, tr, en) => ({ id, metin: { tr, en } });

/** Yazının üretim türü: 'sahip' | 'zincir' | 'bot-resmi' | 'bot-medya' | null (bülten ve bilinmeyen: kart yok). */
export function uretimTuru(veri) {
  if (veri?.category === 'gunluk-bulten') return null;
  if (kisiYazariMi(veri)) return 'sahip';
  if (veri?.uretim === 'yazi-isleri') return 'zincir';
  if ((veri?.kaynaklar?.length ?? 0) > 0) return 'bot-resmi';
  if (veri?.kaynakIzi) return 'bot-medya';
  return null;
}

const degerVar = (veri) => Number.isInteger(veri?.haberDegeri);

/** Kartın adımları (sırayla) ya da kart gösterilmeyecekse null. */
export function adimlar(veri) {
  const tur = uretimTuru(veri);
  if (tur === 'sahip') {
    return [
      adim('senol', 'Konuyu, veriyi ve bakış açısını seçti, yazıyı yazdı, bütün hesaplamaları yaptı.', 'Chose the topic, data and angle, wrote the piece and did all the calculations.'),
      adim('cem', 'Öteki dildeki metni hazırladı.', 'Prepared the text in the other language.'),
      adim('mina', 'İmla ve dili düzeltti; içeriğe dokunmadı.', 'Corrected spelling and language without changing the content.'),
    ];
  }
  if (tur === 'zincir') {
    return [
      adim('deniz', 'Konuyu ve bakış açısını seçti.', 'Chose the topic and angle.'),
      adim('ece', 'Rakamları ve belgeleri resmî kaynaklardan topladı.', 'Gathered figures and documents from official sources.'),
      adim('can', 'Taslağı yazdı.', 'Wrote the draft.'),
      adim('nil', 'Rakamları ve alıntıları kaynaklarla karşılaştırdı.', 'Checked figures and quotes against the sources.'),
      adim('defne', 'Metni sıkılaştırdı.', 'Tightened the text.'),
      adim('umut', 'Grafikleri hazırladı.', 'Made the charts.'),
      adim('bora', 'Dili gözden geçirdi.', 'Reviewed the language.'),
      adim('ipek', 'Hukuki riski değerlendirdi.', 'Assessed legal risk.'),
      adim('tuna', 'Kapak görselini çizdi.', 'Drew the cover image.'),
      adim('su', 'Yazıyı yayına hazırladı.', 'Prepared the piece for publication.'),
    ];
  }
  if (tur === 'bot-resmi' || tur === 'bot-medya') {
    const resmi = tur === 'bot-resmi';
    const ilk = veri.kaynaklar?.[0]?.ad;
    const deger = degerVar(veri)
      ? adim('kaan', `Haber değerini 100 üzerinden ${veri.haberDegeri} olarak puanladı. 70'in altındaki haberler yazılmaz.`, `Scored its news value at ${veri.haberDegeri} out of 100. Stories below 70 are not written.`)
      : adim('kaan', 'Haberin yeterince önemli olup olmadığına baktı. 70/100 altındaki haberler yazılmaz.', 'Checked whether the story mattered enough. Stories below 70/100 are not written.');
    return [
      resmi
        ? adim('ada', ilk ? `Duyuruyu ${ilk} kaynağında buldu.` : 'Duyuruyu resmî bir kaynakta buldu.', ilk ? `Found the announcement at ${ilk}.` : 'Found the announcement at an official source.')
        : adim('ada', 'Haberi birden fazla bağımsız yayında buldu.', 'Found the story in more than one independent outlet.'),
      deger,
      adim('elif', 'Türkçe ve İngilizce metni kaynaklardan yazdı.', 'Wrote the Turkish and English text from the sources.'),
      adim('mert', 'Metni okudu, düzeltme turlarını yürüttü.', 'Read the text and ran the correction rounds.'),
      adim('selin', 'Rakamları, tarihleri ve adları kaynaklarla karşılaştırdı; metnin kaynaklara fazla benzemediğine baktı.', 'Checked figures, dates and names against the sources, and that the text does not copy them too closely.'),
      adim('arda', 'Kapak görselini çizdi.', 'Drew the cover image.'),
      adim('lale', 'Haberi iki dilde yayımladı.', 'Published the story in both languages.'),
    ];
  }
  return null;
}

/** Kapalı kartın olgu satırı (kısa parçalar). */
export function olguSatiri(veri, dil) {
  const tur = uretimTuru(veri);
  const t = (tr, en) => (dil === 'en' ? en : tr);
  if (tur === 'sahip') return [t('Yazan: Şenol Dak', 'By Şenol Dak'), t('Rakamlar resmî kaynaklardan', 'Figures from official sources')];
  if (tur === 'zincir') return [t('Rakamlar resmî kaynaklardan', 'Figures from official sources')];
  if (tur === 'bot-resmi' || tur === 'bot-medya') {
    const ut = [tur === 'bot-resmi' ? t('Resmî kaynaktan', 'From an official source') : t('Birden fazla kaynak', 'Several sources')];
    if (degerVar(veri)) ut.push(t(`Haber değeri ${veri.haberDegeri}/100`, `News value ${veri.haberDegeri}/100`));
    return ut;
  }
  return [];
}

/** Yayından önce hiçbir insanın okumadığı yazılar (bot haberleri). */
export function insanOkumadi(veri) {
  const tur = uretimTuru(veri);
  return tur === 'bot-resmi' || tur === 'bot-medya';
}

/** Kartın metinleri (kısa özet, açıklama, not, sorumluluk cümlesi). */
export function kartMetinleri(veri, dil) {
  const tur = uretimTuru(veri);
  const yz = (adimlar(veri) ?? []).filter((a) => AJANLAR[a.id]?.yz);
  const adlar = yz.map((a) => AJANLAR[a.id].ad);
  const liste = (dizi) => (dizi.length < 2 ? dizi.join('') : `${dizi.slice(0, -1).join(', ')} ${dil === 'en' ? 'and' : 've'} ${dizi.at(-1)}`);
  const SAYI = { tr: { 2: 'İki', 3: 'Üç', 7: 'Yedi', 10: 'On' }, en: { 2: 'Two', 3: 'Three', 7: 'Seven', 10: 'Ten' } };
  const kac = SAYI[dil][yz.length] ?? String(yz.length);
  if (tur === 'sahip') {
    return dil === 'en'
      ? {
        kisa: 'Written by Şenol Dak. AI was used only for translation and language editing.',
        aciklama: 'The piece is Şenol Dak’s own. AI was not used for content, angle or figures, and is never used as a source. All figures come from official sources and were checked against them before publication.',
        not: `${liste(adlar)} are the names of automated steps, not people.`,
        sorumluluk: ', journalist, publisher and editor, read the text and approved it before publication.',
      }
      : {
        kisa: 'Şenol Dak yazdı. Yapay zekâ yalnız çeviri ve dil düzeltmesinde kullanıldı.',
        aciklama: 'Yazı Şenol Dak’ındır. Yapay zekâ içerik, bakış açısı ya da rakamlar için kullanılmadı ve hiçbir zaman kaynak olarak kullanılmaz. Bütün rakamlar resmî kaynaklardan alındı ve yayından önce kaynaklarla karşılaştırıldı.',
        not: `${liste(adlar)}, otomatik adımların adıdır; insan değil.`,
        sorumluluk: ', gazeteci, yayıncı ve editör, metni yayından önce okudu ve onayladı.',
      };
  }
  const ortakNot = dil === 'en'
    ? `The ${kac.toLowerCase()} names below are the automated steps of the JEN DUME newsroom, not people.`
    : `Aşağıdaki ${kac.toLocaleLowerCase('tr')} ad, JEN DUME yayın odasındaki otomatik adımların adıdır; bunlar insan değil.`;
  if (tur === 'zincir') {
    return dil === 'en'
      ? { kisa: `${kac} AI agents prepared it.`, aciklama: 'The piece was prepared by the automated editorial chain from official sources.', not: ortakNot, sorumluluk: ', journalist, publisher and editor, approved it before publication.' }
      : { kisa: `${kac} yapay zekâ ajanı hazırladı.`, aciklama: 'Yazıyı, resmî kaynaklardan yola çıkan otomatik yazı işleri zinciri hazırladı.', not: ortakNot, sorumluluk: ', gazeteci, yayıncı ve editör, yayından önce onayladı.' };
  }
  const resmi = tur === 'bot-resmi';
  return dil === 'en'
    ? {
      kisa: `Written automatically by ${kac.toLowerCase()} AI agents.`,
      aciklama: resmi ? 'The story was written automatically from an official announcement. No journalist read it before publication.' : 'The story was written automatically from the reports of the outlets on our source list. No journalist read it before publication.',
      not: ortakNot,
      sorumluluk: ', journalist, publisher and editor, sets the rules for what may be published automatically.',
    }
    : {
      kisa: `${kac} yapay zekâ ajanı otomatik olarak yazdı.`,
      aciklama: resmi ? 'Haber, resmî bir duyurudan otomatik olarak yazıldı. Hiçbir gazeteci yayından önce okumadı.' : 'Haber, kaynak listesindeki yayınların haberlerinden otomatik olarak yazıldı. Hiçbir gazeteci yayından önce okumadı.',
      not: ortakNot,
      sorumluluk: ', gazeteci, yayıncı ve editör, hangi haberin otomatik yayımlanabileceğinin kurallarını koyar.',
    };
}

