# Generated by Django 2.2.3 on 2019-07-21 06:12

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('gaming', '0009_auto_20190721_0611'),
    ]

    operations = [
        migrations.AlterField(
            model_name='juego',
            name='fechaCreacion',
            field=models.DateField(default=datetime.datetime(2019, 7, 21, 6, 12, 5, 347157, tzinfo=utc), verbose_name='fecha Creacion'),
        ),
    ]