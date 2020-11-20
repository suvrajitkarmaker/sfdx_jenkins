({
    
    doInit : function(component, event, helper) {
         if(component.get('v.update')===true){
            var action = component.get('c.searchItemById');
            action.setParams({
                searchParam: component.get('v.paanId')
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var responseValue = response.getReturnValue();
                    component.set('v.buyObj', responseValue);
                }
                else {
                    console.log(response.getError());
                }
            });
            $A.enqueueAction(action);
         }
         else{
            component.set('v.buyObj', {
                Name:'',
                Quantity__c:'',
                BuyingPrice__c:'',
                SellingPrice__c:'',
                ProductImg__c:''
            });
         }
    },
    save: function(component, event, helper) {
        
        var action = component.get("c.saveData");
        action.setParams({
            paan:component.get('v.buyObj')
        });
        action.setCallback(this,function(response){
            var res = response.getState();
            if(res=="SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();
                
                var pageReference = component.find("navigation");
                var pageReferenceNav = {
                    type: "standard__navItemPage",
                    attributes: {
                        "apiName": "Buy"
                    }
                };
                
                pageReference.navigate(pageReferenceNav);
                
            }else{
                alert("not update");
            }

        });
        $A.enqueueAction(action);
    },
    deleteFromObj: function (component, event, helper) {
        var eventSource = event.getSource();
        var itemId = eventSource.get('v.name');
        var action = component.get('c.deleteItem');
        action.setParams({
            searchParam: itemId
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been deleted successfully."
                });
                toastEvent.fire();
                var pageReference = component.find("navigation");
                var pageReferenceNav = {
                    type: "standard__navItemPage",
                    attributes: {
                        "apiName": "Buy"
                    }
                };
                pageReference.navigate(pageReferenceNav);
            }
            else {
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})