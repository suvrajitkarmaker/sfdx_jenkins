public with sharing class BeerSearchAuraService {
    @AuraEnabled
    public static List<SObject>searchBeer(String searchParam){
        String likeParam= '%' + searchParam + '%';
        String Query='';
        if(searchParam != null)
        {
            Query = 'select Id, id__c, name__c, image__c,alcohol__c,brewery_id__c,brewery_Name__c,Price__c,Remaining_Quantity__c,tags__c,Total_Quantity__c From Beer__c where name__c Like :likeParam LIMIT 50';
        }
        else{
            Query = 'select Id, id__c, name__c, image__c,alcohol__c,brewery_id__c,brewery_Name__c,Price__c,Remaining_Quantity__c,tags__c,Total_Quantity__c From Beer__c LIMIT 50';
        }
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static string fetchUlr(){
            
        String fullFileURL = URL.getSalesforceBaseUrl().toExternalForm();
        return fullFileURL;

    }
}