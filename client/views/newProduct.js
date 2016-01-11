Template.newProduct.events({

    'submit form': function(event){
      event.preventDefault();

      var title       = $('[name=title]').val();
      var price       = $('[name=price]').val();
	      price = price.substring(2); 
	      price = parseFloat(price.replace(/,/g, ''));
	      // convert the price string to a float and replaces the comma and $
      var description = $('[name=description]').val();

      Products.insert({
          title: title,
          price: price,
          description: description
      }, function(error,id){
      	if(error){
      		FlashMessages.sendError(error.message);
      	}else{
      		FlashMessages.sendSuccess("Message");
      		//Router.go('showProduct', id);
      		Router.go('showProduct', {_id: id});
      	}
      });
    },

    'change .myFileInput': function(event, template) {
       FS.Utility.eachFile(event, function(file) {
         Images.insert(file, function (err, fileObj) {
           if (err){
              FlashMessages.sendError("Error");
           } else {
              // handle success depending what you need to do
             var imagesURL = {
               "profile.image": "/cfs/files/images/" + fileObj._id
             };
             $(".myFileInput").val("");
           }
         });
      });
    },

    "click .del": function(){
    	// check if it belongs to this user
    	Meteor.call('removeThisImage', this._id);	
    }
});

Template.newProduct.helpers({
    'product': function(){
        return Products.find({}, {sort: {createdAt:-1}});
    },
    'image': function(){
        return Images.find();
    }
});


Template.newProduct.onRendered(function(){
    $('.auto').autoNumeric('init', {
    	aSign: '$ '
    });
});

