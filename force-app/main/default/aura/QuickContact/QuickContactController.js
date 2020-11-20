({
    doSave : function(component, event, helper) {
        var action = component.get('c.createContact');
        action.setParams({
            con : component.get('v.CreateContact'),
            AccountId: component.get('v.accountId')
        });       
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state==='SUCCESS'|| state==='DRAFT'){
                var responseValue=response.getReturnValue();
                var componentEvent = component.getEvent('quickContact');
                componentEvent.setParams({
                    ContactRecord: responseValue
                });
                componentEvent.fire();
            }
            else if(state==='INCOMPLETE'){
                
            }
        },'ALL');
        $A.enqueueAction(action);
    }
})