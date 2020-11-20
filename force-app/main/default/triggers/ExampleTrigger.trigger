trigger ExampleTrigger on Contact (after insert, after delete) {
    if (Trigger.isInsert) {
        Integer recordCount = Trigger.New.size();
        EmailManager obj = new EmailManager();
	obj.sendMail('Your email address', 'Trailhead Trigger Tutorial', 
                    recordCount + ' contact(s) were inserted.');

    }
    else if (Trigger.isDelete) {
        // Process after delete
    }
}