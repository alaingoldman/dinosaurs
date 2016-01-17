Template.editProduct.events({
	  'submit form': function(event){
	    event.preventDefault();


	      var title       = $('[name=title]').val();
	      var price       = $('[name=price]').val();
		      price = price.substring(2); 
		      price = parseFloat(price.replace(/,/g, ''));
		      // convert the price string to a float and replaces the comma and $
	      var description = $('[name=description]').val();
	      Products.update(this._id, {$set: {
	      	  title: title,
	          price: price,
	          description: description
	      }},function(error,id){
	      	if(error){
	      		FlashMessages.sendError(error.message);
	      	}else{
	      		FlashMessages.sendSuccess('updated');
	      	}

	      });

	},
	'change .myFileInput': function(event, template) {
		 
		 var productId = this._id
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
                  Meteor.call('editProductImages', productId, fileObj._id);
	            	var imagesURL = {"profile.image": "/cfs/files/images/" + fileObj._id};
	            	$(".myFileInput").val("");
	            }
	          });
	        }

	     });
	},
	"click .del": function(){
      product = Products.findOne({"images":this._id})

	  Meteor.call('editOutThisImage', this._id, product,function(){
	    imageCount--;
	  });	
	}
});

Template.editProduct.onCreated(function(){
    if(this.data.user === Meteor.userId()){
    }else{
    	Router.go('home');
    }
});


Template.editProduct.helpers({
    'image': function(){
    	return Images.find({'_id':{'$in':this.images}});
    }
});

Template.editProduct.created = function() {
  imageCount = this.data.images.length;
};

Template.editProduct.onRendered(function(){
    $('.auto').autoNumeric('init', {
    	aSign: '$ '
    });
});
