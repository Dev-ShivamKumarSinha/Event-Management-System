# Generated by Django 4.1.5 on 2023-01-26 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EMSUsers', '0009_alter_eventusermapping_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventusermapping',
            name='token',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]