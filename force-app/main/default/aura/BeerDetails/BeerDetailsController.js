({
	doOrder : function(component, event, helper) {
		var pageReference = component.find("navigation");
		//alert(pageReference);
		var pageReferenceNav = {
			"type": "standard__component",
			"attributes":{
				"componentName": "c__CreateBeerOrder"
			},
			"state":{
				c__beerId : component.get('v.beerId'),
				c__name: component.get('v.name')
			}
		};
		pageReference.navigate(pageReferenceNav);
		
	}
})