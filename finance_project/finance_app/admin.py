from django.contrib import admin
from .models import Category, Transaction, MonthlyGoal

admin.site.register(Category)
admin.site.register(Transaction)
admin.site.register(MonthlyGoal)
