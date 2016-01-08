Template.login.events({

  'submit #login-form' : function(event, template){
    event.preventDefault();

    var email    = template.find('#login-email').value;
    var password = template.find('#login-password').value;

    Meteor.loginWithPassword(email, password, function(err){
      if (err){
        FlashMessages.sendError("Either user or email is incorrect");
      }
      else{
        FlashMessages.sendSuccess("Logged in");
       }
      });
         return false; 
    }
});