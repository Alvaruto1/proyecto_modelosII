# Generated by Django 2.2.3 on 2019-07-20 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gaming', '0003_auto_20190720_1856'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jugador',
            name='fechaNacimiento',
        ),
        migrations.AddField(
            model_name='jugador',
            name='fecha_nacimiento',
            field=models.DateTimeField(blank=True, null=True, verbose_name='fecha_nacimiento'),
        ),
    ]