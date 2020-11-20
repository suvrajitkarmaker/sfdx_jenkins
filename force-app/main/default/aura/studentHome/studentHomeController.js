({
    retrivAllStudent : function(component, event, helper) {
        var action = component.get('c.allStudent');
        action.setParams({
                
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                component.set('v.studentList',responseValue);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})