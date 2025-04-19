from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Transaction, MonthlyGoal

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class TransactionSerializer(serializers.ModelSerializer):
    month = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = '__all__'  # or list your fields including 'month'

    def get_month(self, obj):
        return obj.date.strftime("%Y-%m")  # Example: '2025-04'

class MonthlyGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyGoal
        fields = '__all__'

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=False)  # Mark email as optional


    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        try:
            # Print the incoming validated data for debugging
            print(f"Validated data: {validated_data}")

            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data.get('email', ''),
                password=validated_data['password']
            )
            return user
        except Exception as e:
            raise serializers.ValidationError(f"Signup failed due to: {str(e)}")


