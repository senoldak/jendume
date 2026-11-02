-- "Bu haber işine yaradı mı?": haber başına anonim günlük sayı. IP ya da okur bilgisi yok.
CREATE TABLE IF NOT EXISTS cevap (
  gun TEXT NOT NULL,
  kimlik TEXT NOT NULL,
  cevap TEXT NOT NULL CHECK (cevap IN ('evet', 'hayir')),
  sayi INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (gun, kimlik, cevap)
);
