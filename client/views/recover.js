Template.recover.events({

  'submit #recover-form' : function(event, template){
    event.preventDefault();
    var email = template.find('#login-email').value;
    var options = {"email": email};
    
    Accounts.forgotPassword(options, function(error){
     FlashMessages.sendSuccess("Please check you email");
     // I send success regardless of error
     // because I don't want hackers to find out
     // the emails that are currently being used
     })
	}
});