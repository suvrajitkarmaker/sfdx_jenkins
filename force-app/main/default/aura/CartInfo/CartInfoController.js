({
    goToCart : function(component, event, helper) { 
		var action = component.get('c.getCartId');
		action.setParams({
			'beerList' : component.get('v.beerNameList')
		});
		action.setCallback(this,function(response){
			var state = response.getState();
			if(state==='SUCCESS'|| state ==='DRAFT'){
				var pageReference = component.find("navigation");
				var pageReferenceNav = {
					type: "standard__component",
					attributes:{
						"componentName": "c__CartDetail"
					},
					state:{
						c__cartId: response.getReturnValue()
					}
				};
				pageReference.navigate(pageReferenceNav);
			}else if(state==='INCOMPLETE'){
				console.log('User is offline system does not support offline');
			}else if(state==='ERROR'){
				var errors = response.getError();
				if(errors||errors[0].pageReference){
					console.log('page error ',errors[0].pageMessage);
				}
				if(errors||errors[0].duplicateResults){
					console.log('page error ',errors[0].duplicateResults);
				}
			}else{

			}
		});
		$A.enqueueAction(action);
	},
	createCartItems : function(component, event, helper) {
		var names = [];
		for(var i=0;i<component.get('v.recordList').length;i++)
		{
			names.push(component.get('v.recordList')[i].Id);
		}
		component.set('v.beerNameList',names);
	}
})