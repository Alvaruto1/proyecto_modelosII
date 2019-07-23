# Generated by Django 2.2.3 on 2019-07-20 16:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Juego',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
                ('creador', models.CharField(max_length=200)),
                ('fechaCreacion', models.DateTimeField(verbose_name='fecha Creacion')),
            ],
        ),
        migrations.CreateModel(
            name='Puntaje',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor', models.IntegerField(default=0)),
                ('fecha', models.DateTimeField(verbose_name='fecha puntaje')),
            ],
        ),
        migrations.CreateModel(
            name='Tipo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Recomendado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField(default=0)),
                ('tipo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gaming.Tipo')),
            ],
        ),
        migrations.CreateModel(
            name='Jugador',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('apellido', models.CharField(max_length=50)),
                ('alias', models.CharField(max_length=50)),
                ('contrasena', models.CharField(max_length=50, verbose_name='password')),
                ('fechaNacimiento', models.DateTimeField(verbose_name='fecha nacimiento')),
                ('juegos', models.ManyToManyField(to='gaming.Juego')),
                ('tiposRecomendados', models.ManyToManyField(to='gaming.Recomendado')),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='juego',
            name='puntaje',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gaming.Puntaje'),
        ),
        migrations.AddField(
            model_name='juego',
            name='tipo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gaming.Tipo'),
        ),
    ]