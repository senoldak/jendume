#!/usr/bin/env python3
# Haftalık yapay zekâ dili ölçümü (28 Ekim 2026, kalite-dedektor.yml). Son GUN gündeki İngilizce haberleri DeepMind'ın
# DetectorScope'u (liamdugan/detector-scope, İngilizce eğitilmiş) ile okur. Amaç yapay zekâyı saklamak değil (sitede
# KI notu var): hangi kalıpların metni "makine yazmış gibi" gösterdiğini görüp istemleri ve düzeltmeyi iyileştirmek.
# Yalnız iş özetine yazar (GITHUB_STEP_SUMMARY); repoya hiçbir şey yazmaz. Haberler zaten yayımlanmış, açık metinlerdir.
# Kullanım: python dedektor.py [gün]
import collections
import datetime
import os
import pathlib
import re
import sys

from detectorscope import AuditableDetector

GUN = int(sys.argv[1]) if len(sys.argv) > 1 else 7
KLASOR = pathlib.Path(__file__).resolve().parents[2] / 'src/content/haberler/en'
AZAMI = 60


def haberler():
    sinir = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=GUN)
    out = []
    for p in KLASOR.glob('*.md'):
        s = p.read_text(encoding='utf8')
        m = re.match(r'---\n(.*?)\n---\n(.*)', s.replace('\r\n', '\n'), re.S)
        if not m:
            continue
        on, govde = m.groups()
        t = re.search(r'^date:\s*(\S+)', on, re.M)
        b = re.search(r'^title:\s*"?(.*?)"?\s*$', on, re.M)
        if not t:
            continue
        tarih = datetime.datetime.fromisoformat(t.group(1).replace('Z', '+00:00'))
        if tarih >= sinir:
            out.append((tarih, p.stem, f'{b.group(1) if b else ""}\n\n{govde.strip()}'))
    return [x[1:] for x in sorted(out, reverse=True)[:AZAMI]]


def main():
    liste = haberler()
    ozet = [f'## Yapay zekâ dili ölçümü (son {GUN} gün, {len(liste)} İngilizce haber)', '']
    if not liste:
        ozet.append('Ölçülecek haber yok.')
    else:
        detektor = AuditableDetector.from_pretrained('liamdugan/detector-scope', torch_dtype='bfloat16')
        sayac = collections.Counter()
        etki = collections.defaultdict(float)
        satirlar = []
        oranlar = []
        for slug, metin in liste:
            d = detektor(metin)
            ust = [f for f in d.features if f.importance > 0][:3]
            for f in d.features:
                if f.importance > 0:
                    sayac[f.description] += 1
                    etki[f.description] += f.importance
            oranlar.append(d.p_ai)
            satirlar.append(f'| {slug[:60]} | {d.p_ai:.2f} | {"; ".join(f.description for f in ust)} |')
            print(f'{slug[:60]}: p_ai={d.p_ai:.2f}', flush=True)
        ortalama = sum(oranlar) / len(oranlar)
        ozet += [f'Ortalama p_ai: **{ortalama:.2f}**', '', '### En sık "yapay zekâ" kalıpları', '',
                 '| Kalıp | Haber sayısı | Toplam etki |', '|---|---|---|']
        ozet += [f'| {k} | {n} | {etki[k]:.2f} |' for k, n in sayac.most_common(15)]
        ozet += ['', '### Haber başına', '', '| Haber | p_ai | En güçlü 3 kalıp |', '|---|---|---|', *satirlar]
    metin = '\n'.join(ozet) + '\n'
    print(metin)
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf8') as f:
            f.write(metin)


if __name__ == '__main__':
    main()
