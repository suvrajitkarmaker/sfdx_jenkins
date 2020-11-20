public class newContact {
	@AuraEnabled
    public static List<Contact>getnewContact(String accountId){
        
        return [select Id,FirstName,LastName,Email,Phone From Contact where Email!=null AND AccountId =: accountId]; 
    }
    @AuraEnabled
    public static Contact createContact(Contact con, Id AccountId){
        con.AccountId=AccountId;
        insert con;
        return con;
    }
}