({
    addStudent : function(component, event, helper) {
        $A.createComponent(
            "c:studentUpdate",
            {
                "insert":true 

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