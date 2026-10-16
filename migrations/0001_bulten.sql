-- Haftalık bülten aboneleri (jendume-bulten D1). Göç uzak veritabanına bu depoda otomatik uygulanmaz.
-- Ayrılan abonenin satırı silinir; onaylanmayan (bekliyor) kayıtlar 7 gün sonra silinir.
-- IP ya da tarayıcı bilgisi saklanmaz.
CREATE TABLE abone (
  id INTEGER PRIMARY KEY,
  eposta TEXT UNIQUE NOT NULL,
  dil TEXT NOT NULL DEFAULT 'tr',
  durum TEXT NOT NULL CHECK(durum IN ('bekliyor','onayli')),
  belirtec TEXT UNIQUE NOT NULL,
  olusturma TEXT NOT NULL,
  onay TEXT,
  -- Son onay e-postasının zamanı: aynı adrese 10 dakikadan sık onay e-postası gitmesin diye.
  son_mail TEXT
);

-- Aynı haftanın bir dil için iki kez gönderilmemesi için.
CREATE TABLE gonderim (
  hafta TEXT,
  dil TEXT,
  zaman TEXT,
  adet INTEGER,
  PRIMARY KEY(hafta, dil)
);
