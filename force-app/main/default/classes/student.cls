public with sharing class student {
    @AuraEnabled
    public static List<SObject>allStudent(){
        
        String Query = 'select id__c,image__c,Name,phone__c,email__c From students__c';
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static List<SObject>searchStudent(String searchParam){
        String likeParam= '%' + searchParam + '%';
        String Query='';
        if(searchParam != null){
            Query = 'select id__c,image__c,Name,phone__c,email__c From students__c Where Name Like :likeParam';
        }
        else{
            Query='select id__c,image__c,Name,phone__c,email__c From students__c';
        }
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static students__c searchStudentById(String searchParam){
        return [Select id__c,image__c,Name,phone__c,email__c From students__c Where id =:searchParam];

    }
    @AuraEnabled
    public static void deleteStudent(String searchParam){
        List<students__c> data =[ select id__c,image__c,Name,phone__c,email__c From students__c Where Id=:searchParam];
        delete data;
    }
    @AuraEnabled
    public static void saveData(students__c student){
        upsert student;
    }
}