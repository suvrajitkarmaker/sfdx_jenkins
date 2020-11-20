({
    doInit : function(component, event, helper) {
        var action = component.get('c.orderItem');
        var id = component.get('v.OrderListId');
        action.setParams({
            orderListId:id
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                var buy=0,sell=0;
                for(let i=0;i<responseValue.length;i++){
                    buy+=parseInt(responseValue[i].Buying_Price__c)*parseInt(responseValue[i].Order_Quantity__c);
                    sell+=parseInt(responseValue[i].Selling_Price__c)*parseInt(responseValue[i].Order_Quantity__c);
                }
                component.set('v.totalSell', sell);
                component.set('v.totalProfit', sell-buy);
                component.set('v.itemList', responseValue);
                component.set('v.cutomerName', responseValue[0].orderListId__r.customerName__c);
                component.set('v.customerPhone', responseValue[0].orderListId__r.customerPhone__c);
                component.set('v.orderName', responseValue[0].orderListId__r.Name);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})