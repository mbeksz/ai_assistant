from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'), 
    path('api/get-answer', views.get_response, name='get_response'),
]
