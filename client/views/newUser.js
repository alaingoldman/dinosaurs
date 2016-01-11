Template.newUser.events({

    'submit form': function(event){
      event.preventDefault();
      var options = {
        "username": $('[name=username]').val().toLowerCase(),
        "password": $('[name=password]').val().toLowerCase(),
           "email": $('[name=email]').val().toLowerCase()
      }
      Meteor.call('registerUsers', options, function(error){
        if(error){
            FlashMessages.sendError(error.reason);
        }
        else{
            Meteor.call('emailUserVerification', options.email);
            FlashMessages.sendSuccess("Check your email to verify");
        }
      });
    }
});


Template.newUser.helpers({
    'user': function(){
        return Meteor.users.find({});
    }
});