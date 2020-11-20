({
    updateCart: function (component, event, helper) {
        var params = event.getParam('arguments');
        if (params) {
            var orderRecord = params.orderRecord;
            var existingRecords = component.get('v.recordList');
            if (existingRecords) {
                existingRecords.push(orderRecord);
                component.set('v.recordList', existingRecords);
            } else {
                existingRecords = [];
                existingRecords.push(orderRecord);
                component.set('v.recordList', existingRecords);
            }
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": orderRecord.Name + "has been added to the Order List."
            });
            toastEvent.fire();
        }
    },
    orderNow: function (component, event, helper) {
        var action = component.get('c.insertOrderList');
        action.setParams({
            customerName: component.get('v.customerName'),
            customerPhone: component.get('v.customerPhone'),
            totalPrice: component.get('v.totallPrice'),
            totalProfit: component.get('v.totallProfit'),
        });
        console.log('next');
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var existingRecords = component.get('v.recordList');
                var listLength = existingRecords.length;
                console.log(listLength);
                for(let i=0;i<listLength;i++){
                    var actionX = component.get('c.insertOrderItem');
                    actionX.setParams({
                        paanId: existingRecords[i].Id,
                        quantity: existingRecords[i].dummyQuantity__c,
                        selliPrice: existingRecords[i].SellingPrice__c,
                        buyingPrice: existingRecords[i].BuyingPrice__c,
                    });
                    actionX.setCallback(this, function (responseX) {
                        var stateX = responseX.getState();
                        if (stateX === 'SUCCESS') {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "title": "Success!",
                                "message": "The Order done successfully."
                            });
                            toastEvent.fire();
                            var pageReference = component.find("navigation");
                            var pageReferenceNav = {
                                type: "standard__navItemPage",
                                attributes: {
                                    "apiName": "Home"
                                }
                            };
                            pageReference.navigate(pageReferenceNav);
                        }
                        else {
                            console.log(responseX.getError());
                        }
                    });
                    $A.enqueueAction(actionX);
                }
            }
            else {
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    deleteOrderItem : function(component, event, helper) {
        var index = event.currentTarget.id;
        var existingRecords = component.get('v.recordList');
        var listLength = existingRecords.length;
        console.log(listLength);
        let newrecord = [];
        for(let i=0;i<listLength;i++){
            if(i==index){
                console.log('check');
                continue;
            }
            newrecord.push(existingRecords[i]);
        }
		component.set('v.recordList', newrecord);
    },
    quantityUpdate : function (component, event, helper) {
        var index = parseInt(event.currentTarget.getAttribute("id"));
        var value = parseInt(event.currentTarget.getAttribute("title"));
        var existingRecords = component.get('v.recordList');
        existingRecords[index].dummyQuantity__c=value;
        var listLength = existingRecords.length;
        var price=0,profit=0;
        for(let i=0;i<listLength;i++){
            if(existingRecords[i].dummyQuantity__c!=null){
                profit+= parseInt( existingRecords[i].dummyQuantity__c) * parseInt( existingRecords[i].BuyingPrice__c);
                price+= parseInt( existingRecords[i].dummyQuantity__c) * parseInt( existingRecords[i].SellingPrice__c);
            }
        }
        component.set('v.totallProfit', price-profit);
        component.set('v.totallPrice', price);
    }
})