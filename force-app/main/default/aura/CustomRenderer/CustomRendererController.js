({
    doInit : function(component, event, helper) {
        console.log('suvra ' + document.documentURI)
    },
	onRender : function(component, event, helper) {
        component.set('v.testAttr', 'Mogambo Kush Hua :)');
	}
})