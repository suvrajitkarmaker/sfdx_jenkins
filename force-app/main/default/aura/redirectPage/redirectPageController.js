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
                //var responseValue=response.getReturnValue();
                // helper.saveData(component,responseValue);
                //console.log(responseValue);
                 //console.log(responseValue);
                //component.set('v.beerList',responseValue);

                console.log('successfully update massage');
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})