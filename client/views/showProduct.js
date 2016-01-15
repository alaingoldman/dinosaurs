Template.showProduct.helpers({
    'seller': function(){
        return Meteor.users.findOne({_id : this.user });
    },
    'image': function(){
    	return Images.find({'_id':{'$in':this.images}});
    }
});
