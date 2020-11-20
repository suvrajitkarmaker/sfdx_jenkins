({
    retrivAllOrder : function(component, event, helper) {
        var action = component.get('c.orderList');
        var dateCount = component.get('v.numberOfDay');
        action.setParams({
            dateCount:dateCount
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                console.log(responseValue);
                var totallPrice=0,totallProfit=0;
                for(let i=0;i<responseValue.length;i++){
                    totallPrice+=responseValue[i].Totall_Price__c;
                    totallProfit+=responseValue[i].Total_Profit__c;
                }
                component.set('v.recordList',responseValue);
                component.set('v.totallPrice',totallPrice);
                component.set('v.totallProfit',totallProfit);
                var d = new Date();
                // d.format("MM-dd-YYYY");
                d.setDate(d.getDate() - parseInt(dateCount));
                component.set('v.today', d.toLocaleDateString());
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    previous : function(component, event, helper) {
        var action = component.get('v.numberOfDay');
        component.set('v.numberOfDay',action+1);
        var actionx = component.get('c.retrivAllOrder');
        $A.enqueueAction(actionx);
    },
    next : function(component, event, helper) {
        var action = component.get('v.numberOfDay');
        component.set('v.numberOfDay',action-1);
        var actionx = component.get('c.retrivAllOrder');
        $A.enqueueAction(actionx);
    },
    deleteOrder : function(component, event, helper) {
        var id = event.currentTarget.id;
        var action = component.get('c.deleteOrderItem');
        action.setParams({
            OrderId:id
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var actionx = component.get('c.retrivAllOrder');
                $A.enqueueAction(actionx);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    orderDetail : function(component, event, helper) {
        var id = event.currentTarget.id;
        console.log(id);
        $A.createComponent(
            "c:orderDetailModal",
            {
                "OrderListId": id,
            },
            function (modalContent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.find('overLayLib').showCustomModal({
                        header: "Order Details",
                        body: modalContent,
                        showCloseButton: true,
                        closeCallback: function () {

                        }
                    });

                } else if (status === "INCOMPLETE") {
                    console.log("No response from server from server or client is offline")
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    }
})