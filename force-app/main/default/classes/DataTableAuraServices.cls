public with sharing class DataTableAuraServices {
    @AuraEnabled
    public static List<Beer__c> fetchAccount(){
        return [Select name__c, tags__c, brewery_Name__c, image__c from Beer__c LIMIT 100];
    }
    @AuraEnabled//Get Account Records
    public static List<Account> getAccountList(Integer pageSize, Integer pageNumber){
        List<Account> accList = new List<Account>();
        ApexPages.StandardSetController ssc = new ApexPages.StandardSetController(Database.getQueryLocator('SELECT Id, Name, AccountNumber, Industry, Phone FROM Account'));
        ssc.setpagesize(pageSize);
        ssc.setPageNumber(pageNumber);
        accList = (List<Account>)ssc.getRecords();
        return accList;
    }
}