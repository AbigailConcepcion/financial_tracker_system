from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from finance_app import views
from finance_app.views import home, api_welcome, SignupAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'goals', views.MonthlyGoalViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Your API routes
    path('api/', include(router.urls)),
    path('api/signup/', SignupAPIView.as_view(), name='signup'),

    # ✅ SimpleJWT token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Other views
    path('', home, name='home'),
    path('api/welcome/', api_welcome),  # If this is supposed to match exactly /api/, you may want to adjust its path
]
