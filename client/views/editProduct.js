Template.editProduct.onCreated(function(){
    if(this.data.user === Meteor.userId()){
    }else{
    	Router.go('home');
    }
});