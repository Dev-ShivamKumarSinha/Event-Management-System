# Generated by Django 4.1.5 on 2023-01-26 13:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('EMSUsers', '0005_alter_event_eventno'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventUserMapping',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='EMSUsers.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='EMSUsers.registereduser')),
            ],
        ),
    ]