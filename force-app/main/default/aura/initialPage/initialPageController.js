({
    doInit : function(component, event, helper) {
        var action = component.get('c.sms');
        action.setParams({
                      
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                //console.log('responseValue ',responseValue);
                console.log(responseValue[0].id);
                console.log(responseValue[0].title);
                //component.set('v.beerList',responseValue);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})