# FenoHook - Webhook İzleme Aracı

<div align="center">
  <img src="public/logo.png" alt="FenoHook Logo" width="200"/>
  <p><strong>HTTP İsteklerini Yakalama, İzleme ve Test Etme Aracı</strong></p>
  <p>
    <a href="https://github.com/fenokingtr/FenoHOOK/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/fenokingtr/FenoHOOK" alt="License"/>
    </a>
    <a href="https://github.com/fenokingtr/FenoHOOK/stargazers">
      <img src="https://img.shields.io/github/stars/fenokingtr/FenoHOOK" alt="GitHub stars"/>
    </a>
  </p>
</div>

FenoHook, [webhook.site](https://webhook.site) benzeri bir webhook test etme ve izleme aracıdır. Test ve gösterim amaçları için HTTP isteklerini yakalamak ve incelemek için sabit bir URL oluşturmanıza olanak tanır.

## 🚨 Önemli Uyarı

**Bu proje SADECE eğitim amaçlı ve penetrasyon testi için tasarlanmıştır. Kötü amaçlı kullanımı yasa dışı ve etik değildir. Herhangi bir güvenlik testi senaryosunda kullanmadan önce mutlaka uygun yetkilendirme alın.**

## ✨ Özellikler

- 🔗 HTTP isteklerini yakalamak için sabit bir webhook URL'si
- 🔍 İstek detaylarını (başlıklar, gövde ve parametreler dahil) inceleme
- 🌐 Birden fazla HTTP metodu desteği (GET, POST, PUT, PATCH, DELETE)
- 📋 Webhook URL'sini tek tıklamayla kopyalama
- ⚡ Gerçek zamanlı istek izleme
- 🔄 İstekleri temizleme özelliği

## 📸 Ekran Görüntüleri

<div align="center">
  <img src="public/dashboard.png" alt="FenoHook Dashboard" width="80%"/>
</div>

## 🛠️ Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/fenokingtr/FenoHOOK.git
cd FenoHOOK
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Gerekli Next kurulumu:
```bash
npm run build
```

4. Geliştirme sunucusunu çalıştırın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📝 Kullanım

1. Siteyi ziyaret ettiğinizde, sabit bir webhook URL'si otomatik olarak oluşturulur.
2. Bu URL'ye herhangi bir yöntemle HTTP istekleri gönderin (curl, Postman, uygulamanız vb.).
3. Tüm istekler sol panelde görünecektir.
4. Herhangi bir isteğe tıklayarak başlıklar ve gövde dahil ayrıntılı bilgileri görüntüleyin.
5. İstekleri temizlemek için "İstekleri Temizle" düğmesine tıklayın.

## 📁 Dosya Yapısı ve Açıklamalar

- `/src/app/page.tsx`: Ana uygulama sayfası, kullanıcı arayüzünü ve istek mantığını içerir
- `/src/app/layout.tsx`: Temel sayfa düzeni ve meta bilgileri
- `/src/app/globals.css`: Genel stil tanımlamaları
- `/src/app/api/webhook/route.ts`: Webhook API'sinin tüm mantığı

## 🧩 Önemli Bileşenler

1. **Webhook API** (`/src/app/api/webhook/route.ts`)
   - Gelen tüm HTTP isteklerini yakalama
   - İstek verilerini bellekte depolama
   - İstekleri getirme ve temizleme mantığı

2. **Ana Sayfa** (`/src/app/page.tsx`)
   - Webhook URL'sini görüntüleme ve kopyalama
   - Gelen istekleri listeleme
   - İstek detaylarını görüntüleme
   - İstekleri temizleme

## 🔌 API Kullanım Örnekleri

### POST İsteği Gönderme

```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"kullaniciadi":"test","sifre":"sifre123"}'
```

### GET İsteği Gönderme

```bash
curl http://localhost:3000/api/webhook
```

### İstekleri Programatik Olarak Alma

```bash
curl http://localhost:3000/api/webhook \
  -H "X-Get-Requests: true"
```

### İstekleri Programatik Olarak Temizleme

```bash
curl http://localhost:3000/api/webhook \
  -H "X-Clear-Requests: true"
```

## 🔧 Teknik Detaylar

### Nasıl Çalışır?

1. `/api/webhook` endpoint'i tüm HTTP isteklerini dinler.
2. İstekler alındığında, istek verileri sunucu belleğinde saklanır.
3. Özel başlıklar kullanılarak (`X-Get-Requests` ve `X-Clear-Requests`) istekler alınır veya temizlenir.
4. Ana sayfa, düzenli aralıklarla API'den istekleri alır ve görüntüler.

### Özelleştirme Seçenekleri

- **Gerçek zamanlı güncelleme süresini değiştirme**: `src/app/page.tsx` dosyasında `setInterval` süresini değiştirin (varsayılan 5000 ms).
- **Arayüz renklerini değiştirme**: `src/app/globals.css` dosyasındaki tema değişkenlerini güncelleyin.
- **Webhook URL'sini özelleştirme**: `src/app/page.tsx` dosyasında `webhookUrl` state'ini ayarlayan kodu değiştirin.

## ⚠️ Mevcut Sınırlamalar (Demo Sürümü)

Bu demo sürümünde:

1. Tüm istekler sabit bir URL kullanır (`/api/webhook`)
2. Veriler bellekte tutulur ve sunucu yeniden başlatıldığında kaybolur
3. Kullanıcı kimlik doğrulama sistemi yoktur
4. İstek sayısı/boyutu için sınırlamalar yoktur

## 🚀 Gelecek Güncellemeler İçin Yol Haritası

1. **Kullanıcı Hesapları Sistemi** (v1.1):
   - Oturum açma ve kayıt olma entegrasyonu
   - Her kullanıcı için özel dashboard
   - Profil yönetimi ve ayarlar paneli
   - Kullanıcıya özel istek geçmişi ve analitik
   - Sosyal medya ile giriş seçenekleri

2. **UUID Tabanlı Benzersiz URL'ler** (v1.2):
   - Her kullanıcı için benzersiz ve kalıcı UUID oluşturma
   - İsteğe bağlı özel URL desenleri oluşturma
   - URL'leri gruplandırma ve etiketleme
   - URL aktivite izleme ve analitik
   - URL süre sonu ve otomatik imha seçenekleri

3. **Abonelik Sistemi** (v2.0):
   - **Ücretsiz Plan**:
     - 50 istek saklama limiti
     - 24 saat veri saklama
     - Temel analitik özellikleri
     - 1 aktif webhook URL'si
   - **Premium Plan**:
     - Sınırsız istek saklama
     - 30 gün veri saklama
     - Gelişmiş analitik ve görselleştirme
     - 10 aktif webhook URL'si
     - İsteğe bağlı bildirimler
   - **Kurumsal Plan**:
     - Sınırsız istek saklama ve saklama süresi
     - Özel alan adı desteği
     - Takım yönetimi ve çoklu kullanıcı
     - API anahtarları ve entegrasyon
     - Öncelikli destek ve SLA garantisi

4. **Gelişmiş Güvenlik Özellikleri** (v2.1):
   - IP kısıtlamaları ve beyaz liste
   - CORS ve Origin politikası yönetimi
   - Webhook güvenlik anahtarları ve token doğrulama
   - İstek doğrulama ve filtreleme kuralları
   - İstek içeriği şifreleme
   - Güvenlik günlükleri ve uyarılar

5. **Veritabanı Entegrasyonu** (v2.2):
   - MongoDB ile kalıcı veri saklama
   - İstek verisi yedekleme ve dışa aktarma
   - Gelişmiş arama ve filtreleme özellikleri
   - İstek geçmişi raporlama ve analitik
   - API ile programatik erişim

6. **Webhook Tetikleyiciler ve İş Akışları** (v3.0):
   - Belirli isteklere göre webhook tetikleyicileri oluşturma
   - Koşullu iş akışları ve istek yönlendirme
   - Otomatik yanıt şablonları
   - Zamanlanmış webhook çağrıları
   - Entegrasyon ile diğer servislere bildirim gönderme (Slack, Discord, Email)

7. **Mobil Uygulama ve API** (v3.1):
   - iOS ve Android için mobil uygulama
   - Kapsamlı API dokümantasyonu
   - SDK'lar ve entegrasyon kütüphaneleri
   - Gerçek zamanlı bildirimler
   - Offline mod ve senkronizasyon

8. **Topluluk Özellikleri** (v3.2):
   - Webhook şablonlarını paylaşma
   - Topluluk kütüphanesi
   - İstek senaryoları ve test senaryoları oluşturma
   - Geri bildirim ve destek sistemi
   - Dokümantasyon ve eğitim kaynakları

Bu özellikler, kullanıcı geribildirimleri ve ihtiyaçlara göre değişebilir. Katkıda bulunmak veya özellik talep etmek için [Issues](https://github.com/fenokingtr/FenoHOOK/issues) sayfasını kullanabilirsiniz.

## 📋 API Referansı

| Endpoint | Metod | Başlıklar | Açıklama |
|----------|-------|-----------|----------|
| `/api/webhook` | GET | - | Webhook'a GET isteği gönderir |
| `/api/webhook` | POST | - | Webhook'a POST isteği gönderir |
| `/api/webhook` | GET | `X-Get-Requests: true` | Tüm kaydedilmiş istekleri getirir |
| `/api/webhook` | GET | `X-Clear-Requests: true` | Tüm kaydedilmiş istekleri temizler |

## 💻 Sistem Gereksinimleri

- Node.js 18.0.0 veya üstü
- npm veya yarn
- Modern bir web tarayıcısı (Chrome, Firefox, Edge, Safari)

## 🌐 Üretim Ortamına Dağıtma

FenoHook'u üretim ortamına dağıtmak için:

```bash
npm run build
npm start
```

En iyi sonuçlar için, Vercel, Netlify veya kendi sunucunuz gibi bir bulut hosting sağlayıcısına dağıtın.

## 🔐 Güvenlik Hususları

Bu aracı meşru testler için kullanıyorsanız:

1. Hassas bilgileri genel webhook URL'lerine göndermeyin.
2. Webhook verilerinin bellekte saklandığını ve sunucu yeniden başlatıldığında kaybolabileceğini unutmayın.
3. Güvenlik testleri için her zaman uygun yetkilendirmeye sahip olduğunuzdan emin olun.

## 🤝 Katkıda Bulunma

Katkıda bulunmak isterseniz:

1. Bu depoyu forklayın
2. Özellik dalınızı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Amazing feature added'`)
4. Dala push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request açın

## 📝 Lisans

Bu proje [MIT Lisansı](https://github.com/fenokingtr/FenoHOOK/blob/main/LICENSE) altında lisanslanmıştır.
