({
    retrivAllPaan : function(component, event, helper) {
        var searchParam = event.getParam('searchText');
        
        var action = component.get('c.searchItem');
        action.setParams({
            searchParam: searchParam
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                console.log(responseValue);
                component.set('v.paanList',responseValue);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    updateCart : function(component, event, helper) {
        var params= event.getParam('orderRecord');
        var orderComp=component.find('orderComp');
        orderComp.updateCart(params);
    }
})