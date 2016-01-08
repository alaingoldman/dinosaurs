Accounts.onEmailVerificationLink(function (token, done) {
	Accounts.verifyEmail(token, function (error) {
	  if (!error) {
	    //Do stuff
	    FlashMessages.sendSuccess("Thank you for verifying your email. Enjoy!");
	  }else{
	  	FlashMessages.sendError(error.reason);
	  }
	  done();

	});
});