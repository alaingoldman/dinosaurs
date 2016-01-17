Template.newProduct.events({
    'submit form': function(event){
      event.preventDefault();

      // this section identifies the folders
      // then creates two arrays. One with the new images and the other
      // with the new folders
            var folders    = Folders.find({user: Meteor.userId()});
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

        Products.insert({
            title: title,
            price: price,
            description: description,
            images: newImages
        }, function(error,id){
        	if(error){
        		FlashMessages.sendError(error.message);
        	}else{
            Meteor.call("removeUserFolders", newFolders);
        		Router.go('showProduct', {_id: id});
        	}
        });
      }

    },

    'change .myFileInput': function(event, template) {
         FS.Utility.eachFile(event, function(file) {
          imageCount++;
           if(imageCount >= 5){
             FlashMessages.sendError("You can't upload more than 4 images");
            }else{
              Images.insert(file, function (err, fileObj) {
                if (err){
                  FlashMessages.sendError("Images only");
                  imageCount--;
                } else {
                  folderFile  = {
                    user:    Meteor.userId(),
                    image:   fileObj._id,
                    product: null 
                  }
                  Folders.insert(folderFile);
                 var imagesURL = {"profile.image": "/cfs/files/images/" + fileObj._id};
                $(".myFileInput").val("");
                }
              });
            }
         });
    },
    "click .del": function(){
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
        newFolders =  Folders.find({user: Meteor.userId()});
        for(i=0;i<newFolders.count();i++){
            newImages.push(newFolders.fetch()[i].image);
        }
        return Images.find({'_id':{'$in':newImages}});
    }
});


Template.newProduct.onRendered(function(){
    $('.auto').autoNumeric('init', {
    	aSign: '$ '
    });
});

Template.newProduct.created = function() {
  imageCount = 0;
}

Template.newProduct.onDestroyed(function () {
  Meteor.call("clearUserFolders");
});
