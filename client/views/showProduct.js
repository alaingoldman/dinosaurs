Template.showProduct.helpers({
    'seller': function(){
        return Meteor.users.findOne({_id : this.user });
    },
    'image': function(){
    	return Images.find({'_id':{'$in':this.images}});
    },
    'isSeller': function(){
    	if(Meteor.userId() == this.user){
    		return true;
    	}else{
    		return false;
    	}
    }
});
