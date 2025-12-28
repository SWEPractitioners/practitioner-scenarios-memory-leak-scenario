# 🐛 Senaryo: Memory Leak Detection

## Problem

Bir e-ticaret platformunun ürün arama servisi var. Son günlerde servis performansı kötüleşiyor ve düzenli olarak crash oluyor.

## Belirtiler

- Her 4-6 saatte bir `OutOfMemoryError` alınıyor
- Heap kullanımı sürekli artıyor
- GC süreleri giderek uzuyor
- Servis restart edildikten sonra sorun bir süre düzeliyor

## Göreviniz

1. `src/services/SearchCacheService.js` dosyasını inceleyin
2. Memory leak'e neden olan kodu bulun
3. Sorunu düzeltin
4. `npm test` ile testlerin geçtiğinden emin olun
5. `git push` yaparak çözümünüzü gönderin

## Başlangıç

```bash
# Repo'yu klonla
git clone <your-fork-url>
cd memory-leak-scenario

# Bağımlılıkları yükle
npm install

# Uygulamayı çalıştır
npm start

# Testleri çalıştır
npm test
```

## Dosya Yapısı

```
memory-leak-scenario/
├── src/
│   ├── index.js           # Ana uygulama
│   └── services/
│       └── SearchCacheService.js  # 🐛 Bug burada!
├── tests/
│   ├── run-tests.js       # Test runner
│   └── check-solution.js  # Çözüm kontrolü
└── package.json
```

## Beklenen Davranış

✅ Cache belirli bir boyutu aşmamalı
✅ Eski cache entry'leri temizlenmeli
✅ Memory kullanımı stabil kalmalı

---

🚀 **Practitioner** | Debug. Learn. Master.

