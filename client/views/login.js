Template.login.events({

  'submit #login-form' : function(event, template){
    event.preventDefault();

    var email    = template.find('#login-email').value;
    var password = template.find('#login-password').value;

    //var check = Meteor.users.findOne({"email":email})//.verified;
    var check = Meteor.users.findOne({"emails.address":email})//.verified;
    console.log("check: " + check);
    Meteor.loginWithPassword(email, password, function(err){
      if (err){
        FlashMessages.sendError("Either email or password is incorrect");
      }
      else{
        FlashMessages.sendSuccess("Logged in");
       }
      });
         return false; 
    }
});