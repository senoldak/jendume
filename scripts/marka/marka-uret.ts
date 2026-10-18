// Marka dosyaları (BRAND.md §5, §6, §10): favicon ve uygulama simgeleri (levha), varsayılan paylaşım görseli,
// sosyal profil ve kapak görselleri, kullanıma hazır logo paketi. Çizim src/lib/kimlik.ts (glif yolu).
// Kullanım (proje kökünden): node --experimental-strip-types scripts/marka/marka-uret.ts
import fs from 'node:fs';
import sharp from 'sharp';
import { KIMLIK, genislik, levhaIc, levhaSvg, logo, logotip, metin } from '../../src/lib/kimlik.ts';

const SLOGAN = { tr: 'kelimelerin ötesinde', en: 'Beyond Words' };
const svgSar = (g: number, y: number, ic: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(g)}" height="${Math.ceil(y)}" viewBox="0 0 ${Math.ceil(g)} ${Math.ceil(y)}">${ic}</svg>\n`;
const png = (svg: string, genislik?: number) =>
  (genislik ? sharp(Buffer.from(svg), { density: 300 }).resize({ width: genislik }) : sharp(Buffer.from(svg))).png({ compressionLevel: 9 }).toBuffer();

// ── Favicon ve uygulama simgeleri: levha kendi zeminidir ──
const levha = (b: number) => svgSar(b, b, `<svg width="${b}" height="${b}" viewBox="0 0 1000 1000">${levhaIc()}</svg>`);
function ico(pngler: [number, Buffer][]) {
  const bas = Buffer.alloc(6 + 16 * pngler.length);
  bas.writeUInt16LE(0, 0);
  bas.writeUInt16LE(1, 2);
  bas.writeUInt16LE(pngler.length, 4);
  let ofset = bas.length;
  pngler.forEach(([boyut, veri], i) => {
    const o = 6 + i * 16;
    bas.writeUInt8(boyut >= 256 ? 0 : boyut, o);
    bas.writeUInt8(boyut >= 256 ? 0 : boyut, o + 1);
    bas.writeUInt16LE(1, o + 4);
    bas.writeUInt16LE(32, o + 6);
    bas.writeUInt32LE(veri.length, o + 8);
    bas.writeUInt32LE(ofset, o + 12);
    ofset += veri.length;
  });
  return Buffer.concat([bas, ...pngler.map(([, v]) => v)]);
}
fs.writeFileSync('public/favicon.svg', levhaSvg(64));
for (const [ad, b] of [['favicon-32x32.png', 32], ['favicon-32.png', 32], ['favicon-192.png', 192], ['favicon-512.png', 512], ['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]] as const) {
  fs.writeFileSync(`public/${ad}`, await png(levha(b)));
}
fs.writeFileSync('public/favicon.ico', ico([[16, await png(levha(16))], [32, await png(levha(32))], [48, await png(levha(48))]]));

// ── Kapak görselleri: kâğıt zemin, sağ üstten taşan büyük yeşil daire, logo ve iki dilli slogan ──
function kapakGorseli(G: number, Y: number, { L, s, daire, logoX }: { L: number; s: number; daire: number; logoX?: number }) {
  let ic = `<rect width="${G}" height="${Y}" fill="${KIMLIK.kagit}"/><circle cx="${G - daire * 0.3}" cy="${daire * 0.17}" r="${daire}" fill="${KIMLIK.yesil}"/>`;
  const olc = logo(0, 0, L);
  const x = logoX ?? (G - olc.genislik) / 2;
  const alt = (Y - L - s * 1.6) / 2 + L;
  ic += logo(x, alt, L).svg;
  const xs = x + L * 1.28;
  ic += metin(SLOGAN.tr, xs, alt + s * 1.5, { wght: 600, boyut: s, renk: KIMLIK.yesilYazi });
  const trG = genislik(SLOGAN.tr, { wght: 600, boyut: s, renk: '' });
  ic += metin(`· ${SLOGAN.en}`, xs + trG + s * 0.4, alt + s * 1.5, { wght: 400, boyut: s, renk: KIMLIK.gri });
  return svgSar(G, Y, ic);
}

fs.writeFileSync('public/og-default.png', await png(kapakGorseli(1200, 630, { L: 120, s: 34, daire: 260, logoX: 96 })));

fs.mkdirSync('brand/sosyal', { recursive: true });
for (const f of fs.readdirSync('brand/sosyal')) fs.rmSync(`brand/sosyal/${f}`);
const SOSYAL: Record<string, [number, number, { L: number; s: number; daire: number }]> = {
  'x-kapak-1500x500': [1500, 500, { L: 110, s: 30, daire: 230 }],
  'facebook-kapak-1640x624': [1640, 624, { L: 120, s: 34, daire: 270 }],
  'linkedin-kapak-1128x191': [1128, 191, { L: 56, s: 17, daire: 120 }],
};
for (const [ad, [G, Y, o]] of Object.entries(SOSYAL)) fs.writeFileSync(`brand/sosyal/${ad}.png`, await png(kapakGorseli(G, Y, o)));
fs.writeFileSync('brand/sosyal/profil-1080.png', await png(levha(1080)));

// ── Logo paketi (brand/logo/) ──
const K = 'brand/logo';
fs.mkdirSync(K, { recursive: true });
const M = 200;
const B = M * 0.25;
const PARCALAR: Record<string, (koyu: boolean) => { g: number; y: number; ic: string }> = {
  'jendume-logo-yatay': (koyu) => {
    const l = logo(B, B + M, M, koyu ? KIMLIK.kagit : KIMLIK.murekkep, koyu);
    return { g: B * 2 + l.genislik, y: B * 2 + M, ic: l.svg };
  },
  'jendume-logotip': (koyu) => {
    const boy = M * 0.62;
    const t = logotip(B, B + boy * 0.72, boy, koyu ? KIMLIK.kagit : KIMLIK.murekkep);
    return { g: B * 2 + t.genislik, y: B * 2 + boy * 0.95, ic: t.svg };
  },
  'jendume-levha': (koyu) => ({ g: M + B * 2, y: M + B * 2, ic: levhaSvg(M, `x="${B}" y="${B}"`, koyu) }),
};
for (const [ad, ciz] of Object.entries(PARCALAR)) {
  for (const koyu of [false, true]) {
    const p = ciz(koyu);
    const svg = svgSar(p.g, p.y, p.ic);
    const dosya = `${K}/${ad}${koyu ? '-koyu-zemin' : ''}`;
    fs.writeFileSync(`${dosya}.svg`, svg);
    fs.writeFileSync(`${dosya}.png`, await png(svg, 2000));
  }
}
fs.writeFileSync(
  `${K}/BENIOKU.txt`,
  `JEN DUME logo paketi (BRAND.md §5–6). Üretici: scripts/marka/marka-uret.ts — elle düzenlemeyin, yeniden üretin.

- jendume-logo-yatay   Levha + "jen dume": site, e-posta imzası, sunum (varsayılan logo)
- jendume-logotip      Yalnız "jen dume" yazısı, j'nin noktası yeşil
- jendume-levha        Yalnız işaret: profil fotoğrafı, uygulama simgesi, favicon
Profil fotoğrafı ve kapak görselleri: ../sosyal/

"-koyu-zemin" ekli dosyalarda levha ters döner (kâğıt rengi levha, mürekkep J) ve yazı kâğıt rengine geçer; yeşil aynı kalır. PNG'ler saydam zeminlidir.
Kurallar: levhayı döndürmek, yuvarlatmak, kareyi başka renge boyamak, gölge, kontur, J'yi ya da yazıyı başka yazı
tipiyle çizmek yapılmaz. Renkler: Esperanto yeşili ${KIMLIK.yesil}, mürekkep ${KIMLIK.murekkep}, kâğıt ${KIMLIK.kagit}.
Yazı tipi: Instrument Sans (OFL).
`,
);
console.log('favicon + simgeler, og-default, brand/sosyal (4), brand/logo');
