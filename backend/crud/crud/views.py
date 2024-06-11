from crud import serialize
from crud.models import DetailsModel
from crud.serialize import DetailSerializer
from rest_framework.views  import APIView
from rest_framework.response import Response

#Api creation gg ez pz lemon squizy
class DetailsTable(APIView):
    def get(self,request):
        detailsObj=DetailsModel.objects.all()
        dlSerializeObj=DetailSerializer(detailsObj,many=True)
        return Response(dlSerializeObj.data)
    
    def post(self,request):
        serializeobj=DetailSerializer(data=request.data)
        if serializeobj.is_valid():
            serializeobj.save()
            return Response(200)
        return Response(serializeobj.errors)
    

class DetailsUpdate(APIView):
    def post(self,request,pk):
        try:
            detailObj=DetailsModel.objects.get(pk=pk)
        except:
            return Response("Not Found in database")
        
        serializeobj=DetailSerializer( detailObj,data=request.data)
        if serializeobj.is_valid():
            serializeobj.save()
            return Response(200)
        return Response(serializeobj.errors)
    

class DetailsDelete(APIView):
    def post(self,request,pk):
        try:
            detailObj=DetailsModel.objects.get(pk=pk)
        except:
            return Response("Not Found in database")
        
        detailObj.delete()
        return Response(200)
