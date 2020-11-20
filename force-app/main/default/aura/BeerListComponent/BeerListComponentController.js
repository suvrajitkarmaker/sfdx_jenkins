({
	showinfo : function(component, event, helper) {
		var eventSource = event.getSource();
        var beerObj=eventSource.get('v.name');
        console.log(beerObj);
        component.set('v.beerId',beerObj);
        $A.createComponent(
            "c:BeerDetails",
            {
                "beerId":beerObj
            },
            function(BeerDetails,status,errorMessage){
                if(status==="SUCCESS"){
                    component.find('overLayLib').showCustomModal({
                        header:"Beer Details",
                        body: BeerDetails,
                        footer: 'Footer ',
                        showCloseButton: true,
                        closeCallback: function(){

                        }
                    });

                }else if(status==="INCOMPLETE"){
                    console.log("No response from server from server or client is offline")
                }else if(status==="ERROR"){
                    console.log("Error: "+ errorMessage);
                }
            }
        );
    },
    addToCart : function(component, event, helper) {
        var eventSource = event.getSource();
        var beerId = eventSource.get('v.name');
        var index = eventSource.get('v.value');
        var selectedBeer = component.get('v.recordList')[index];
        //alert(selectedBeer.Id);
        var addToCartEvent = component.getEvent('addToCart');
        addToCartEvent.setParams({
            beerRecord: selectedBeer
        });
        addToCartEvent.fire();
    }
})