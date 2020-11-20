({
    retrivAllStockOut : function(component, event, helper) {
        var action = component.get('c.stockOutList');
        action.setParams({
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state ==='SUCCESS')
            {
                var responseValue=response.getReturnValue();
                component.set('v.recordList',responseValue);
            }
            else{
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    openModal: function(component, event, helper) {
        var recid, rectype,RecTypeID;
        rectype = event.currentTarget;
        RecTypeID =  rectype.getAttribute("id");
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