import test from 'node:test';
import assert from 'node:assert/strict';
import { gorunenAd, gosterilecekKaynaklar, konuTutar } from './kaynak-adlari.mjs';

// Gerçek yayın adları şifreli listede durur; testler uydurma adlarla çalışır.
const metinler = ['Curtin Üniversitesi araştırması sohbet botlarının ruh sağlığı risklerine dikkat çekti', 'Curtin University study warns of chatbot mental health risks'];

test('gorunenAd: parantez içi açıklama ve AI eki atılır', () => {
  assert.equal(gorunenAd('Örnek Yayın (Teknoloji)'), 'Örnek Yayın');
  assert.equal(gorunenAd('Başka Haber AI'), 'Başka Haber');
  assert.equal(gorunenAd('Düz Ad'), 'Düz Ad');
});

test('konuTutar: adreste ya da kaynak başlığında iki ortak sözcük', () => {
  assert.equal(konuTutar({ url: 'https://ornek.example/2026/10/curtin-study-chatbot-mental-health' }, metinler), true);
  assert.equal(konuTutar({ url: 'https://ornek.example/p?id=12345', baslik: 'Chatbots and mental health: Curtin study' }, metinler), true);
  assert.equal(konuTutar({ url: 'https://ornek.example/2026/10/new-phone-launch-event-today' }, metinler), false);
  assert.equal(konuTutar({ url: 'https://ornek.example/a/1' }, metinler), false);
  assert.equal(konuTutar({ url: 'bozuk adres' }, metinler), false);
});

test('gosterilecekKaynaklar: tutmayan, resmî, gösterilmez ve yinelenen kaynak çıkar', () => {
  const liste = [
    { ad: 'Örnek Yayın (Teknoloji)', url: 'https://ornek.example/curtin-chatbot-mental-health-study' },
    { ad: 'Örnek Yayın', url: 'https://ornek.example/curtin-chatbot-mental-health-study' },
    { ad: 'İlgisiz Yayın', url: 'https://ilgisiz.example/new-phone-launch-event-today' },
    { ad: 'Kapalı Yayın', url: 'https://kapali.example/curtin-chatbot-mental-health' },
    { ad: 'Resmî Kurum', url: 'https://kurum.example/curtin-chatbot-mental-health', resmi: true },
    { ad: 'Adressiz', url: 'javascript:alert(1)' },
  ];
  assert.deepEqual(gosterilecekKaynaklar(liste, metinler, { gosterilmez: ['Kapalı Yayın'] }), [
    { ad: 'Örnek Yayın', url: 'https://ornek.example/curtin-chatbot-mental-health-study' },
  ]);
});
