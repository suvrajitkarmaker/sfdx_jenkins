({
	doSelect : function(component, event, helper) {
        var index = event.currentTarget.id;
        var selectedRecord = component.get('v.recordList')[index];
        console.log(' selectedRecord ', selectedRecord);
        var selectEvent = component.getEvent('selectEvent');
        selectEvent.setParams({
            record : selectedRecord
        });
        selectEvent.fire();
	}
})