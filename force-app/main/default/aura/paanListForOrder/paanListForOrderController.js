({
    addToCart : function(component, event, helper) {
        var eventSource = event.getSource();
        var index = eventSource.get('v.value');
        var selectedorder= component.get('v.recordList')[index];
        var addToCartEvent = component.getEvent('addToCart');
        addToCartEvent.setParams({
            orderRecord: selectedorder
        });
        addToCartEvent.fire();
    }
})