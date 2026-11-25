// Medya kaynaklı haberde adsız kaynak satırı: kaynak izi dolu, resmî kaynak listesi boş ya da haber karma (karmaKaynak); bülten, açıklayıcı/referans
// (sahibin) yazıları ve yazı işleri zinciri yazıları hariç.
import { aciklayiciMi } from './yazi-turu.mjs';

export function medyaKaynakli(veri) {
  if (!veri?.kaynakIzi) return false;
  if ((veri.kaynaklar?.length ?? 0) > 0 && veri.karmaKaynak !== true) return false;
  if (veri.category === 'gunluk-bulten') return false;
  if (veri.uretim === 'yazi-isleri') return false;
  return !aciklayiciMi(veri);
}
