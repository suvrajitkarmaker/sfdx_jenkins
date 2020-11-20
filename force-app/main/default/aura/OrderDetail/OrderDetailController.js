({
    doInit: function (component, event, helper) {
        var pageReference = component.get('v.pageReference');
        if (pageReference) {
            var state = pageReference.state;
            component.set('v.orderId', state.c__orderId);
            //alert(state.c__beerId)
            component.find("recordViewer").reloadRecord();
        }
        
    }
})