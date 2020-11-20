({
    doInit : function(component, event, helper) {
        var action= component.get('c.getnewContact');
        action.setParams({
            accountId : component.get('v.recordId'),
        });
        action.setCallback(this,function(response){
            var responseValue = response.getReturnValue();
            //console.log('responseValue',responseValue);
            component.set('v.contactList',responseValue);
        },'SUCCESS');
        $A.enqueueAction(action,false);
    },
    doRedirect: function(component, event, helper){
        var eventSource = event.getSource();
        var id= eventSource.get('v.name');
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": id,
            "slideDevName": "related"
        });
        navEvt.fire();
    },
    handleCompEvent: function(component, event, helper){
        var availableContact = component.get('v.contactList');
        var ContactRecord = event.getParam('ContactRecord');
        availableContact.push(ContactRecord);
        component.set('v.contactList',availableContact);
    }
})