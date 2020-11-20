({
    doInit : function(component, event, helper) {
        var action = component.get('c.projectInformation');
        action.setParams({
                      
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                
                console.log(responseValue[0]);
                //console.log(responseValue[0].getName());
                console.log('successfully update project information');
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})