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
		  	// removes one image and the folder it's connected to
		  	folder = Folders.findOne({"image": id});
		  	if (folder.user == Meteor.userId()){
		  		Folders.remove(folder._id);
		  		return Images.remove(id);
		  	}
		  },
		  editOutThisImage: function(image, product){
		  	thisProduct = Products.findOne(product);
		  	if (thisProduct.images.length !== 1){
			  	if (thisProduct.user === Meteor.userId()){
			  		imageList = thisProduct.images
			  		indexA = imageList.indexOf(image);
			  		if(indexA > -1){
			  			imageList.splice(indexA, 1);
			  		}
	  		         Images.remove(image);
	  		         return Products.update(product, {$set: {images: imageList}});
			  	}
			  	return true;
		  	}else{
		  		FlashMessages.sendError("At least one photo required");
		  	}
		  },
		  removeAllUsers: function(){
		  	return Meteor.users.remove({});
		  },
		  removeAllFolders: function(){
		  	return Folders.remove({});
		  },
		  removeUserFolders: function(array){
		  	return Folders.remove(
		  		{_id: {$in: array}});
		  },
		  clearUserFolders: function(){
		  	// clears all old images and folders when page loads
		  	oldFolders = Folders.find({user: Meteor.userId()});
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
		  },

		  editProductImages: function(id,image){
		  	currentProduct = Products.find({_id: id}).fetch()[0];
		  	imageList = currentProduct.images;
		  	imageList.push(image);
		  	if (currentProduct.user === Meteor.userId()){
		  		if(imageList.length < 5){
		  		   return Products.update(currentProduct._id, {$set: {images: imageList}});
		  		}
		  	}
		  }
		});
});