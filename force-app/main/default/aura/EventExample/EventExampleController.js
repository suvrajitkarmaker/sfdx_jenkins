({
	doChange : function(component, event, helper) {
		//alert('value changed');
	},
    Changevalue:function(component, event, helper){
        component.set('v.test','Test');
        var aeEvent=$A.get('e.c:aeEvent');
        aeEvent.fire();
    },
    doInit:function(component, event, helper){
        component.set('v.test','ON Init');
    }
})