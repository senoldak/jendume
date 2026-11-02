// Renk sırası (çok kategorili biçimler): yeşil, mürekkep, gri, orta gri, açık yeşil, açık gri.
export const FARGER = ['g-f-su', 'g-f-kontur', 'g-f-gul', 'g-f-rod', 'g-f-su2', 'g-f-bar'];
export const farge = (i) => FARGER[Math.min(i, FARGER.length - 1)];
