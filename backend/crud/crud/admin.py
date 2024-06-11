from django.contrib import admin
from crud.models import DetailsModel

# Register your models here.
class DetailsAdmin(admin.ModelAdmin):
    pass
admin.site.register(DetailsModel,DetailsAdmin)