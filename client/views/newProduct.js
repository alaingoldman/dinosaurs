Template.newProduct.events({
    'submit form': function(event){
      event.preventDefault();

      // this section identifies the folders
      // then creates two arrays. One with the new images and the other
      // with the new folders
            var folders    = Folders.find({user: Meteor.userId(), claimed: false});
            var newImages  = [];
            var newFolders = [];

            for(i=0; i<folders.count(); i++){
              if (i === 4) { break; } // safety to make sure only x amount of images
              newImages.push(folders.fetch()[i].image);
              newFolders.push(folders.fetch()[i]._id);
            }
      // end of section-------

      if (folders.count() === 0){
        FlashMessages.sendError("Upload an image please");
      }else{

        var title       = $('[name=title]').val();
        var price       = $('[name=price]').val();
  	      price = price.substring(2); 
  	      price = parseFloat(price.replace(/,/g, ''));
  	      // convert the price string to a float and replaces the comma and $
        var description = $('[name=description]').val();

        // attempts to create a product
        Products.insert({
            title: title,
            price: price,
            description: description,
            images: newImages
        }, function(error,id){
        	if(error){
        		FlashMessages.sendError(error.message);
        	}else{
        		FlashMessages.sendSuccess("Success");
            Meteor.call("updateFolders", newFolders, id);
        		// Router.go('showProduct', id);
        		// Router.go('showProduct', {_id: id});
        	}
        });
      }

    },

    'change .myFileInput': function(event, template) {
      if(imageCount >= 4){
        FlashMessages.sendError("You can't upload more than 4 images");
      }else{
         FS.Utility.eachFile(event, function(file) {
           Images.insert(file, function (err, fileObj) {
             if (err){
                FlashMessages.sendError("Images only");
             } else {
                folderFile  = {
                  user:    Meteor.userId(),
                  image:   fileObj._id,
                  claimed: false,
                  product: null 
                }
                Folders.insert(folderFile);
                imageCount++;
               var imagesURL = {"profile.image": "/cfs/files/images/" + fileObj._id};
              $(".myFileInput").val("");
             }

           });
        });
      }
    },

    "click .del": function(){
    	// check if it belongs to this user
    	Meteor.call('removeThisImage', this._id, function(){
        imageCount--;
      });	
    }
});

Template.newProduct.helpers({
    'product': function(){
        return Products.find({}, {sort: {createdAt:-1}});
    },
    'image': function(){
        newImages = [];
        newFolders =  Folders.find({user: Meteor.userId(), claimed: false});
        for(i=0;i<newFolders.count();i++){
            newImages.push(newFolders.fetch()[i].image);
        }
        return Images.find({'_id':{'$in':newImages}});
    }
});


Template.newProduct.onRendered(function(){
    // delete all images that belong this this user  
    $('.auto').autoNumeric('init', {
    	aSign: '$ '
    });
});

Template.newProduct.created = function() {
  Meteor.call("clearUserFolders");
  imageCount = 0;
}