({
    getAsset : function(component, event, helper) {
        var action = component.get('c.getTotalAsset');
        action.setParams({
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                console.log(responseValue);
                component.set('v.ToTalAsset',responseValue);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    getSellProfit : function(component, event, helper) {
        var action = component.get('c.getTotalSellProfit');
        action.setParams({

        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                console.log('new '+state);
                var responseValue=response.getReturnValue();
                var sell=0,buy=0;
                for(let i=0;i<responseValue.length;i++){
                    sell+=parseInt(responseValue[i].Order_Quantity__c)*parseInt(responseValue[i].Selling_Price__c);
                    buy+=parseInt(responseValue[i].Order_Quantity__c)*parseInt(responseValue[i].Buying_Price__c);
                }
                component.set('v.TotalSell',sell);
                component.set('v.TotallProfit',sell-buy);

                var Newaction = component.get('c.getLastMonthSellProfit');
                $A.enqueueAction(Newaction);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    getLastMonthSellProfit : function(component, event, helper) {
        console.log('last month info');
        var action = component.get('c.getLastMonthInfo');
        action.setParams({

        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log('last month'+state);
            if(state ==='SUCCESS')
            {
                
                var responseValue=response.getReturnValue();
                var profit=0;
                for(let i=0;i<responseValue.length;i++){
                    profit+=parseInt(responseValue[i].Total_Profit__c);
                }
                component.set('v.lastMonthProfit',profit);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

})