({
    rerender : function(component, helper){
        this.superRerender();
    },
    afterRender: function (component, helper) {
        this.superAfterRender();
        helper.setUpKeyEvents(component, helper);
    },
    unrender: function () {
        this.superUnrender();
    }
})