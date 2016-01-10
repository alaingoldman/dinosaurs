Template.reset.events({

  'submit #reset-form' : function(event, t){
    event.preventDefault();

    var password = t.find('#password').value;
    var confirmation = t.find('#confirmation').value;
    if(password == confirmation){

      Accounts.resetPassword(resetToken, password, function(error){
        if(error){
          FlashMessages.sendError(error.reason);
        }
        else{
          FlashMessages.sendSuccess("Password Reset");
        }
      })

    }else{
      FlashMessages.sendError("Passwords don't match");
    }

  }
});