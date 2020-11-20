({
    retrivAllOrder : function(component, event, helper) {
        var action = component.get('c.orderList');
        action.setParams({
            dateCount:2
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                console.log(responseValue);
                component.set('v.orderList',responseValue);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})