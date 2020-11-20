({
    
    doInit : function(component, event, helper) {
        if(component.get('v.insert')===true){
            component.set('v.studentObj', {
                Name:'',
                email__c:'',
                id__c:'',
                phone__c:'',
                image__c:''
            });
        }
        else{
            var action = component.get('c.searchStudentById');
                action.setParams({
                    searchParam: component.get('v.studentId')
                });
                action.setCallback(this, function (response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        var responseValue = response.getReturnValue();
                        component.set('v.studentObj', responseValue);
                    }
                    else {
                        console.log(response.getError());
                    }
                });
                $A.enqueueAction(action);
        }
    },
    save: function(component, event, helper) {
        
        var action = component.get("c.saveData");
        action.setParams({
            student:component.get('v.studentObj')
        });
        action.setCallback(this,function(response){
            var res = response.getState();
            if(res=="SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();
                
                var pageReference = component.find("navigation");
                if(component.get('v.insert')===true){
                    var pageReferenceNav = {
                        type: "standard__navItemPage",
                        attributes: {
                            "apiName": "All_Student"
                        }
                    };
                }else{
                    var pageReferenceNav = {
                        type: "standard__navItemPage",
                        attributes: {
                            "apiName": "Update"
                        }
                    };
                }
                
                pageReference.navigate(pageReferenceNav);
                
            }else{
                alert("not update");
            }

        });
        $A.enqueueAction(action);
    }
})