Template.index.events({
    'click #logout': function(event){
    	Meteor.logout(function(){
    		FlashMessages.sendSuccess("Loged out");
    	});
    },
    "click .b": function(){
		Meteor.call('removeAllProducts');
		Meteor.call('removeAllImages');  
		Meteor.call('removeAllUsers');
    }
});
