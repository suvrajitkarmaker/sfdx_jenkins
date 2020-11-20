({
    setUpKeyEvents: function (component, helper) {
        var ENTER_KEYCODE = 13;
        var F2_KEYCODE = 113;
        var F4_KEYCODE = 115;
        var auraCallback = $A.getCallback(addEnterKeyEvent);
        window.addEventListener('keyup', auraCallback, true);
        function addEnterKeyEvent(event) {
            if (event.keyCode === ENTER_KEYCODE) {
                alert(event.keyCode);
                window.removeEventListener('keyup', auraCallback);
                helper.fetchAccounts(component, helper);
            } else if (event.keyCode === F2_KEYCODE || event.keyCode === F4_KEYCODE) {
                alert(event.keyCode);
            }
        }
    }, 
    fetchAccounts : function(component, helper){
        var action = component.get('c.fetchAllAccounts');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' || state === 'DRAFT'){
                var responseValue = JSON.parse(response.getReturnValue());
                component.set('v.recordList', responseValue);
            }else if( state === 'INCOMPLETE'){
                console.log(' Unable to process the Request. System does not support offline ');
            }else if( state === 'ERROR'){
                var errors = response.getError();
                if(errors || errors[0].message){
                    console.log(' An Error has been occured ');
                }else if(errors || errors[0].pageError){
                    
                }else if(errors || errors[0].duplicateRecords){
                    
                }else{
                    
                }
            }else{
                console.log(' An Error occured. Please try again!! ');
            }
        },'ALL');
        $A.enqueueAction(action);
    }
})