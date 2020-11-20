({
    handleCompEvent: function (component, event, helper) {
        var searchParam = event.getParam('searchText');
        
            var action = component.get('c.searchStudent');
            action.setParams({
                searchParam: searchParam
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var responseValue = response.getReturnValue();
                    component.set('v.studentList', responseValue);
                }
                else {
                    console.log(response.getError());
                }
            });
            $A.enqueueAction(action);
        
    }
})