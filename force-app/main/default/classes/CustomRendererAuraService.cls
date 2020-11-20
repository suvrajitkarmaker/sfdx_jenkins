public class CustomRendererAuraService {
	@AuraEnabled
    public static String fetchAllAccounts(){
        List<Account> accList = [Select Id, Name, Industry From Account Limit 10];
        return JSON.serialize(accList);
    }
}