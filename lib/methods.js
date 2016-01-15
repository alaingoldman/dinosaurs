Meteor.startup(function() {

  return Meteor.methods({
  		  registerUsers: function(options){
		    Accounts.createUser({
		      username: options.username,
		      email: 	options.email,
		      password: options.password
		    });
		  },
		  emailUserVerification: function(email){
		  	found_user = Meteor.users.findOne({ 'emails.address' : email });
		  	if(found_user){
		  		Accounts.sendVerificationEmail(found_user._id);
		  	}
		  },
		  removeAllProducts: function() {
		    return Products.remove({});
		  },
		  removeAllImages: function() {
		    return Images.remove({});
		  },
		  removeThisImage: function(id){
		  	// removes one image aand the folder it's connected to
		  	folder = Folders.findOne({"image": id});
		  	if (folder.user == Meteor.userId()){
		  		Folders.remove(folder._id);
		  		return Images.remove(id);
		  	}
		  },
		  removeAllUsers: function(){
		  	return Meteor.users.remove({});
		  },
		  removeAllFolders: function(){
		  	return Folders.remove({});
		  },
		  updateFolders: function(array, productId){
		  	return Folders.update(
		  		{_id: {$in: array}}, 
		  		{$set: {claimed: true, product: productId}}, {multi: true});
		  },
		  clearUserFolders: function(){
		  	// clears all old images and folders when page loads
		  	oldFolders = Folders.find({user: Meteor.userId(), claimed: false});
		  	oldImages = oldFoldersArray = [];
		  	for(i=0; i<oldFolders.count(); i++){
		  		oldFoldersArray.push(oldFolders.fetch()[i]._id);
		  		oldImages.push(oldFolders.fetch()[i].image);
		  	}
		  		    Images.remove({'_id':{'$in':oldImages}});
		  	return Folders.remove({'_id':{'$in':oldFoldersArray}});
		  },
		  checkEmailVerification: function(email) {
		    found_user = Meteor.users.findOne({ 'emails.address' : email })
		    if(found_user){
		    	if(found_user.emails[0].verified == true){
		    		return "verified";
		    	}else{
		    		return "unverified";
		    	}
		    }else{
		    	return "notfound";
		    }
		  }
		});
});