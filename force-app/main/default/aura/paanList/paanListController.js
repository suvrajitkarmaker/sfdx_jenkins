({
    openModal: function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        var recid, rectype,RecTypeID;
        rectype = event.currentTarget;
        RecTypeID =  rectype.getAttribute("title");
        console.log(RecTypeID);
        $A.createComponent(
            "c:inputItemModal",
            {
                "paanId": RecTypeID,
                "update":true

            },
            function (modalContent, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.find('overLayLib').showCustomModal({
                        header: "Paan Details",
                        body: modalContent,
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