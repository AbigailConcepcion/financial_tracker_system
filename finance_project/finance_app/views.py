from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse

from .models import Category, Transaction, MonthlyGoal
from .serializers import (
    CategorySerializer,
    TransactionSerializer,
    MonthlyGoalSerializer,
    SignupSerializer,
)

# 🌐 Public welcome endpoint (optional, no auth required)
def api_welcome(request):
    return JsonResponse({
        "message": "🎉 Welcome to the Finance Tracker API!",
        "endpoints": {
            "categories": "/api/categories/",
            "transactions": "/api/transactions/",
            "goals": "/api/goals/",
            "signup": "/api/signup/",
            "token": "/api/token/",
            "token/refresh": "/api/token/refresh/"
        }
    })

# 🔐 Simple home fallback (optional, for testing)
def home(request):
    return HttpResponse("<h1>Welcome to the Financial Tracker System</h1>")

# ✅ Category API (GET, POST, PUT, DELETE)
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]  # Enforce JWT login

# ✅ Transaction API (with optional ?month=YYYY-MM filter)
class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Transaction.objects.all()
        month = self.request.query_params.get("month")
        if month:
            queryset = queryset.filter(date__startswith=month)
        return queryset

# ✅ Monthly Goals API
class MonthlyGoalViewSet(viewsets.ModelViewSet):
    queryset = MonthlyGoal.objects.all()
    serializer_class = MonthlyGoalSerializer
    permission_classes = [IsAuthenticated]

# ✅ Public signup endpoint
class SignupAPIView(APIView):
    permission_classes = [AllowAny]  # Anyone can sign up

    def post(self, request):
        print("Received data:", request.data)  # Debug: incoming data
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                "message": "User created successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)

        print("Validation errors:", serializer.errors)  # Debug: errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
