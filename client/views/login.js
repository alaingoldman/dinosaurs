Template.login.events({

  'submit #login-form' : function(event, template){
    event.preventDefault();

    var email    = template.find('#login-email').value.toLowerCase();
    var password = template.find('#login-password').value.toLowerCase();

    Meteor.call('checkEmailVerification', email, function(error,data){
      if (data == "verified"){
          Meteor.loginWithPassword(email, password, function(err){
            if (err){
              FlashMessages.sendError("Either email or password is incorrect");
            }
            else{
              FlashMessages.sendSuccess("Logged in");
              Router.go('home');
             }
          });
      }else if(data == "unverified"){
          FlashMessages.sendError("Check your email for a verification link");
      }else{
          FlashMessages.sendError("Either email or password is incorrect");
      }
    });

    
  }
});