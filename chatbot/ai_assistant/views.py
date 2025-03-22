from django.shortcuts import render
from django.http import JsonResponse
import spacy
import json

# SpaCy modelini yüklüyoruz
nlp = spacy.load('xx_ent_wiki_sm')

def home(request):
    return render(request, 'ai_assistant/index.html')

def get_response(request):
    # JSON verisini alıyoruz
    try:
        data = json.loads(request.body)
        message = data.get('message', '')
    except json.JSONDecodeError:
        return JsonResponse({'answer': 'Geçersiz veri formatı.'})

    # Eğer mesaj boşsa, kullanıcıya hata mesajı döndürelim
    if not message:
        return JsonResponse({'answer': 'Mesajınız alınamadı.'})

  # Mesajı spaCy ile işleyelim
    doc = nlp(message)

    # Entity Recognition (NER): Metindeki özel isimleri (yer, kişi adı vb.) çıkarıyoruz.
    entities = [(ent.text, ent.label_) for ent in doc.ents]

    # Günler için manuel kontrol
    days_of_week = ['pazartesi', 'salı', 'çarşamba', 'perşembe', 'cuma', 'cumartesi', 'pazar']
    detected_days = [day for day in days_of_week if day in message.lower()]

    # Anahtar kelimelere göre basit bir yanıt üretelim
    if "merhaba" in message.lower():
        answer = "Merhaba! Size nasıl yardımcı olabilirim?"
    elif "hava" in message.lower():
        answer = "Bugün hava oldukça güzel!"
    elif "yemek" in message.lower():
        answer = "Ne tür yemek tarifleri istersiniz?"
    elif len(detected_days) > 0:
        # Eğer bir gün tespit edildiyse, o günü içeren bir yanıt verelim
        answer = f"Metninizde şu gün(ler) tespit edildi: {', '.join(detected_days)}."

    else:
        # Diğer durumlarda genel cevap
        answer = "Üzgünüm, bu konuda size yardımcı olamıyorum."


    response_data = {
        'answer': answer
    }

    return JsonResponse(response_data)
