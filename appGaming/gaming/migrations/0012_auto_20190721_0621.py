# Generated by Django 2.2.3 on 2019-07-21 06:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('gaming', '0011_auto_20190721_0612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='juego',
            name='fechaCreacion',
            field=models.DateField(verbose_name='fecha Creacion'),
        ),
        migrations.AlterField(
            model_name='puntaje',
            name='fecha',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='fecha puntaje'),
        ),
    ]