public with sharing class apiModel {
    @AuraEnabled
    public static Object projectInformation(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:basecamp/4458367/projects.json');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        List<PropertyModelWrapper> a = (List<PropertyModelWrapper>) JSON.deserialize(response.getBody(), List<PropertyModelWrapper>.class);

        return JSON.deserializeUntyped(JSON.serialize(a));
    }
}