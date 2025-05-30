# Generated by Django 5.1.7 on 2025-03-28 04:01

import django.db.models.deletion
import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='current_hash_key',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.CreateModel(
            name='HashKeyRotation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('previous_hash_key', models.CharField(db_index=True, max_length=128)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('expires_at', models.DateTimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hash_rotations', to='users.appuser')),
            ],
            options={
                'indexes': [models.Index(fields=['previous_hash_key'], name='users_hashk_previou_f6e1a3_idx'), models.Index(fields=['is_active'], name='users_hashk_is_acti_909ff2_idx')],
            },
        ),
    ]
