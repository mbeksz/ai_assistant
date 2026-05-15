# Yapay Zeka Asistan

<p align="center">
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
</p>

---

## Genel Bakış

Django tabanlı **yapay zeka sohbet asistanı**. Kullanıcıların doğal dille sorular sormasına ve AI destekli yanıtlar almasına olanak tanır.

---

## Teknoloji Yığını

```
Backend    → Python · Django
AI         → OpenAI API
Veritabanı → SQLite
```

---

## Mimari

```
chatbot/
├── manage.py
├── ai_assistant/        # Ana chatbot modülü
│   ├── chatbot/         # Konuşma mantığı ve AI entegrasyonu
│   └── ...
└── requirements.txt

django/                  # Django yapılandırma modülü
```

---

## Kurulum

```bash
git clone https://github.com/mbeksz/ai_assistant
cd ai_assistant/chatbot
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## Özellikler

- Doğal dil ile AI sohbet arayüzü
- Django tabanlı web backend
- Konuşma geçmişi yönetimi
- Genişletilebilir modül yapısı
