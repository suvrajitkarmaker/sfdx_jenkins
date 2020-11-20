public with sharing class paansshop {
    @AuraEnabled
    public static void saveData(PaanBuy__c paan){
        upsert paan;
    }
    @AuraEnabled
    public static List<SObject>allItem(){
        
        String Query = 'select Id,Name,Quantity__c,BuyingPrice__c,SellingPrice__c,ProductImg__c From PaanBuy__c';
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static void deleteItem(String searchParam){
        List<PaanBuy__c> data =[ select Id From PaanBuy__c Where Id=:searchParam];
        delete data;
    }
    @AuraEnabled
    public static PaanBuy__c searchItemById(String searchParam){
        return [select Id,Name,Quantity__c,BuyingPrice__c,SellingPrice__c,ProductImg__c From PaanBuy__c Where id =:searchParam];

    }
    @AuraEnabled
    public static List<SObject>searchItem(String searchParam){
        String likeParam= '%' + searchParam + '%';
        String Query='';
        if(searchParam != null){
            Query = 'select Id,Name,Quantity__c,BuyingPrice__c,SellingPrice__c,ProductImg__c From PaanBuy__c Where Name Like :likeParam';
        }
        else{
            Query='select Id,Name,Quantity__c,BuyingPrice__c,SellingPrice__c,ProductImg__c From PaanBuy__c';
        }
        
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static void insertOrderList(String customerName, String customerPhone, 
                                        Integer totalPrice,Integer totalProfit){
        Datetime now = system.now();
        Date today = Date.today();
        // Integer offset = UserInfo.getTimezone().getOffset(now);
        // Datetime local = now.addSeconds(offset/1000);
        orderList__c order = new orderList__c(customerName__c=customerName,
                                                customerPhone__c=customerPhone,
                                                Totall_Price__c=totalPrice,
                                                Total_Profit__c=totalProfit,
                                                orderDayTime__c=now,
                                                orderDate__c=today
                                                );
        insert order;
    }
    @AuraEnabled
    public static void insertOrderItem(String paanId, Integer quantity, 
                                        Integer selliPrice,Integer buyingPrice){
        orderList__c orderId = [select Id from orderList__c order by CreatedDate desc limit 1];
        orderItem__c order = new orderItem__c(  orderListId__c=orderId.Id,
                                                PaanBuyId__c=paanId,
                                                Order_Quantity__c=quantity,
                                                Selling_Price__c=selliPrice,
                                                Buying_Price__c=buyingPrice
                                                );
        List<PaanBuy__c> data =[ select Quantity__c From PaanBuy__c where id=:paanId];
        Integer qun= (data[0].Quantity__c).intValue() - quantity;
        PaanBuy__c updatePaan = new PaanBuy__c( Id=paanId,
                                                Quantity__c=qun
                                                );
        update updatePaan;
        insert order;
    }
    @AuraEnabled
    public static List<SObject>orderList(Integer dateCount){
        // Date x=Date.today().addDays(-1);
        Integer pre=dateCount-1;
        String Query;
        if(dateCount==0){
            Query = 'select Id,Name,customerName__c,customerPhone__c,Total_Profit__c,Totall_Price__c,orderDate__c From orderList__c where orderDate__c = TODAY ORDER BY orderDayTime__c DESC';
        }else{
            Query = 'select Id,Name,customerName__c,customerPhone__c,Total_Profit__c,Totall_Price__c,orderDate__c From orderList__c where orderDate__c >= LAST_N_DAYS:'+dateCount+' AND orderDate__c <LAST_N_DAYS:'+pre+' ORDER BY orderDayTime__c DESC';
        }
        
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static void deleteOrderItem(String OrderId){
        // String Query = 'select Id From orderList__c where Id = '+OrderId;
        // Database.delete(Query);
        Database.delete(OrderId);
    }
    @AuraEnabled
    public static List<orderItem__c>orderItem(String orderListId){
        return [Select orderListId__r.customerName__c,orderListId__r.customerPhone__c,orderListId__r.Name, PaanBuyId__r.Name, Selling_Price__c,Buying_Price__c,Order_Quantity__c From orderItem__c where orderListId__c=:orderListId];
    }
    @AuraEnabled
    public static Integer getTotalAsset(){
        
        List<PaanBuy__c> data =[ select Quantity__c,BuyingPrice__c From PaanBuy__c];
        Integer result=0;
        for (Integer i=0;i<data.size();i++) {
            result+=(data[i].Quantity__c).intValue() * (data[i].BuyingPrice__c).intValue();
        }
        return result;
    }
    @AuraEnabled
    public static List<SObject>getTotalSellProfit(){
        
        List<SObject> data =[ select Order_Quantity__c,Buying_Price__c,Selling_Price__c  From orderItem__c];
        return data;
    }
    @AuraEnabled
    public static List<SObject>getLastMonthInfo(){
        String Query = 'select Total_Profit__c,Totall_Price__c,orderDate__c From orderList__c where orderDate__c >= LAST_N_MONTHS:1 AND orderDate__c <LAST_N_MONTHS:0';
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static List<SObject>stockOutList(){
        
        List<SObject> data =[ select Name  From PaanBuy__c where Quantity__c=0];
        return data;
    }
}