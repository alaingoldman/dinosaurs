Template.showProduct.helpers({
    'seller': function(){
        return Meteor.users.findOne({_id : this.user });
    }
});