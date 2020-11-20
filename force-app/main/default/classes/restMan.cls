@RestResource(urlMapping='/v1/Bookmanagement/')
global class restMan {
	@httpGet
    global static Book__c doGetBook(){
        Book__c book =new Book__c();
        Map<String,String> paramsMap =RestContext.request.params;
        String bookId = paramsMap.get('Id');
        book =[Select Id, Name, Price__c From Book__c Where Id=: bookId];
        return book;
    }
    @httpDelete
    global static String doDeleteBook(){
        Book__c book =new Book__c();
        Map<String,String> paramsMap =RestContext.request.params;
        String bookId = paramsMap.get('Id');
        book =[Select Id, Name, Price__c From Book__c Where Id=: bookId];
        delete book;
        return 'Record Deleted!';
    }
    @httpPost
    global static Book__c doCreateBook(String NameValue){
        Book__c book =new Book__c(Name=NameValue);
        insert book;
        return book;
    }
    @httpPut
    global static Book__c doUpdateBook(String NameValue){
        Map<String,String> paramsMap =RestContext.request.params;
        String bookId = paramsMap.get('Id');
        Book__c book =new Book__c(Name=NameValue, Id=bookId);
        update book;
        return book;
    }
    
}