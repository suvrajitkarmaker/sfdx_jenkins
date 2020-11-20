({
    deleteFromObj: function (component, event, helper) {
        var eventSource = event.getSource();
        var studentId = eventSource.get('v.name');
        var action = component.get('c.deleteStudent');
        action.setParams({
            searchParam: studentId
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been deleted successfully."
                });
                toastEvent.fire();
                
                var pageReference = component.find("navigation");
                var pageReferenceNav = {
                    type: "standard__navItemPage",
                    attributes: {
                        "apiName": "delete"
                    }
                };
                pageReference.navigate(pageReferenceNav);
            }
            else {
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    updateFromObj: function (component, event, helper) {
        var eventSource = event.getSource();
        var id = eventSource.get('v.name');
        $A.createComponent(
            "c:studentUpdate",
            {
                "studentId": id

            },
            function (modalContent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.find('overLayLib').showCustomModal({
                        header: "Student Details",
                        body: modalContent,
                        footer: 'Footer ',
                        showCloseButton: true,
                        closeCallback: function () {

                        }
                    });

                } else if (status === "INCOMPLETE") {
                    console.log("No response from server from server or client is offline")
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    }
})