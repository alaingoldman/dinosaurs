Template.editProduct.events({
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
			// console.log("0: test");
			// console.log("1: " + this._id);
			//
			//console.log('');
			//
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