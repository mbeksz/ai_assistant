from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return render(request, 'ai_assistant/index.html')


def get_response(request):
    response_data = {
        'message': 'Hello, World!'
    }
    return JsonResponse(response_data)