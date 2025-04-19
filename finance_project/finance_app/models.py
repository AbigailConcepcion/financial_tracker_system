from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    is_income = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.date} - {self.category.name} - {self.amount}"

class MonthlyGoal(models.Model):
    month = models.DateField()
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.month.strftime('%B %Y')} - {self.target_amount}"
