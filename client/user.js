Template.newUser.events({

    'submit form': function(event){
      event.preventDefault();

      var username       = $('[name=username]').val();
      var password		   = $('[name=password]').val();
      var email          = $('[name=email]').val();

      Accounts.createUser({
      	  username: username,
          email: email,
          password: password

      }, function(error,id){
      		if(error){
            FlashMessages.sendError(error.reason);
      		}else{
				    FlashMessages.sendSuccess("Check your email to verify");
				    //Router.go('showProduct', {_id: id});
      		}
      });
    }
});


Template.newUser.helpers({
    'user': function(){
        return Meteor.users.find({});
    }
});