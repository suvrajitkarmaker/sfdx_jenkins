({
    doInit : function(component, event, helper) {        
        helper.getAccounts(component, event);
    },
     
    handleNext : function(component, event, helper) { 
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber+1);
        helper.getAccounts(component, helper);
    },
     
    handlePrev : function(component, event, helper) {        
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber-1);
        helper.getAccounts(component, helper);
    },
     
    handleDeleteAccount: function (component, event, helper) {
        alert('Selected Account to delete - ' + event.getSource().get("v.name"));
    },
})