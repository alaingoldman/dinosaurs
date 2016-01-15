Meteor.startup(function () {

   //  for reset password url
   Accounts.urls.resetPassword = function(token) {
      return Meteor.absoluteUrl('reset/' + token);
   };


    //  for email setup
	var options = {
	    apiKey:  Meteor.settings.mailgun_apikey,
	    domain:  Meteor.settings.mailgun_domain
	}
	var LootGun = new Mailgun(options);


	Accounts.emailTemplates.from = 'alain.goldman@gmail.com ';
	Accounts.emailTemplates.siteName = 'lootfly.com';
	Accounts.emailTemplates.verifyEmail.subject = function(user) {
	  return 'Confirm Your Email Address for MeteorFly';
	};
	Accounts.emailTemplates.verifyEmail.text = function(user, url) {
	  return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
	};
	Accounts.config({
	  sendVerificationEmail: true
	});
});