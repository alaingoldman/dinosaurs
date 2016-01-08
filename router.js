Router.route('/newUser');
Router.route('/login');
Router.route('/',{
	template: "home",
	name: "home"
});

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/products/new',{
	template: "newProduct",
	name: "newProduct"
});

Router.route('/products/:_id',{
	template: "showProduct",
	name: "showProduct",
	data: function(){
		return Products.findOne({_id: this.params._id});
	}
});