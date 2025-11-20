# MiniPAM – Hafif ve İşlevsel Bir Privileged Access Management (PAM) Sistemi

MiniPAM, Spring Boot (backend) ve React.js (frontend) kullanılarak geliştirilmiş hafif fakat işlevsel bir **Yetkili Erişim Yönetimi (Privileged Access Management – PAM)** çözümüdür.  
Amaç, kurumsal ölçekte kullanılan PAM ürünlerinin (CyberArk, Wallix, Delinea vb.) temel kavramlarını küçük bir projede uygulamalı şekilde göstermektir.

Bu proje; sunucuya erişimin güvenli şekilde yönetilmesi, yetkili hesapların saklanması, rol bazlı yetkilendirme, oturum takibi ve detaylı loglama özelliklerini içerir.

---

## 🚀 Özellikler

### 🔐 Kimlik Doğrulama ve Yetkilendirme
- Admin / User rollerine göre yetkilendirme  
- JWT tabanlı güvenli kimlik doğrulama  
- Privileged işlemler için rol bazlı güvenlik  

### 🖥️ Sunucu ve Yetkili Hesap Yönetimi
- Sunucu ekleme, listeleme ve yönetme  
- Privileged hesapların güvenli bir şekilde saklanması  
- Normal kullanıcı → yetkili hesap eşleşmesi  
- Bağlanılacak sunucu ve kullanılacak hesabı seçebilme  

### 🧭 Oturum Yönetimi
- Aktif oturumların takibi  
- Kaydedilen bilgiler:
  - Oturum başlangıç zamanı  
  - Oturum bitiş zamanı  
  - Toplam oturum süresi  
  - Hangi sunucuya bağlanıldığı  
  - Hangi yetkili hesabın kullanıldığı  

### 📝 Loglama ve Denetim Kayıtları
- Her oturum için detaylı denetim kaydı  
- Loglar:
  - Bağlanan kullanıcı kimliği  
  - Bağlanılan sunucu  
  - Oturum süresi  
  - Erişim zamanı  
- Gerekirse CSV/Excel formatında dışa aktarma (opsiyonel)

---

## 🛠️ Teknolojiler

### **Backend**
- Java 17  
- Spring Boot  
- Spring Security (JWT)  
- Hibernate / JPA  
- H2 Database (Geliştirme aşamasında)  
- Maven  

### **Frontend**
- React.js  
- Axios  
- TailwindCSS (opsiyonel)

---

## 📂 Proje Yapısı

