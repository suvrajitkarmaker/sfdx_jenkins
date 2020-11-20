global with sharing class apiClass {
    
    global static Object parseJsonNested(Object obj, String[] ar){ 
        for(Integer i=0;i<ar.size();i++){
            map<String,Object> tempObj = (map<String,Object>) obj;
            obj=tempObj.get(ar[i]);
        }
        return obj;
    }
    @AuraEnabled
    public static void sms(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:basecamp/4458367/buckets/16072990/message_boards/2467690042/messages.json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        List<Object> myObject = new List<Object>();

        if (response.getStatusCode() == 200) {
            myObject = (List<Object>)JSON.deserializeUntyped(response.getBody());
        }
        List<massage__c> sms = new List<massage__c>();
        for (Object obj : myObject) {
            map<String,Object> tempObj = (map<String,Object>) obj;
            massage__c newObj = new massage__c(
                creator_company_name__c=(String)parseJsonNested(obj,new String[]{'creator','company','name'}),
                massage_Id__c=(Decimal)tempObj.get('id'),
                status__c=(String)tempObj.get('status'),
                Name=(String)tempObj.get('title'),
                content__c=(String)tempObj.get('content'),
                creator_id__c=(Decimal)parseJsonNested(obj,new String[]{'creator','id'})
            );
            sms.add(newObj);
        }
        delete [SELECT id FROM massage__c];
        insert sms;
    }

}