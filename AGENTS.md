## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

## Haber kaynakları gizlidir

Repo herkese açık. Resmi olmayan haber kaynaklarının (haber siteleri, dergiler, ajanslar, bloglar) adı, kısa adı,
alan adı ve besleme adresi repoya hiçbir yerde yazılmaz: kod, test, fixture, belge, commit mesajı ve log dahil.
Liste `scripts/bot/gizli-kaynaklar.sifreli` dosyasında şifreli durur; anahtar `KAYNAK_ANAHTARI` (GitHub Secret,
yerelde `.env`). Düzenlemek için `node scripts/bot/gizli.mjs ac`, sonra `kapat` (açık hali git'e girmez).
Loglarda ve `gorulen.json` kimliklerinde kaynak adı yerine kısa kod (`k1a2b3c`), adres yerine anahtarlı özet geçer;
haberin kaynakları frontmatter'da şifreli `kaynakIzi` alanında durur (`node scripts/bot/gizli.mjs iz <haber.md>`).
Testlerde `haber.example.com` gibi uydurma adlar kullanılır. Laboratuvarların, şirketlerin ve kurumların kendi
duyuru akışları (OpenAI, Google, DeepMind, Hugging Face, üniversiteler) bu kurala dahil değildir.
