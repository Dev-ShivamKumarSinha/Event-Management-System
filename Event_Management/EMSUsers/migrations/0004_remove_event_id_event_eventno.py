# Generated by Django 4.1.5 on 2023-01-26 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EMSUsers', '0003_rename_events_event'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='id',
        ),
        migrations.AddField(
            model_name='event',
            name='eventNo',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
    ]
