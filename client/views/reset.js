Template.reset.events({

  'submit #reset-form' : function(event, t){
    event.preventDefault();

    var password = t.find('#password').value;
    var confirmation = t.find('#confirmation').value;
    if(password == confirmation){
      //FlashMessages.sendSuccess("dey the same");
      // Accounts.resetPassword(token, newPassword, function(){

      // })this.params._id

      //this.params.token
      console.log(this.params);
      console.log(token);
    }else{
      FlashMessages.sendError("Passwords don't match");
    }

  }
});