//---------   main routes ------------ //
Router.configure({layoutTemplate: 'index'});

Router.route('/',{
	template: "home",
	name: "home"
});



//--------- check before actions  --------- //
var OnBeforeActions;
OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        //this.render('login'); // if u dont want to change url
        Router.go('login');
        FlashMessages.sendError("Login please");
      }else{
        this.next();
      }
    },
    logoutRequired: function(pause) {
      if (Meteor.userId()) {
        Router.go('home');
      }else{
        this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['newProduct', 'editProduct', 'buyProduct']
});
Router.onBeforeAction(OnBeforeActions.logoutRequired, {
    only: ['login','recover','newUser']
});


//---------     users     ------------ //
Router.route('/newUser');
Router.route('/login');
Router.route('/recover');
Router.route('/reset/:token',{
  template: "reset",
  name:     "reset",
  onBeforeAction: function(){
    resetToken = this.params.token;
    this.next();
  }
})


//---------     products  ------------ //
Router.route('newProduct');

Router.route('/showProduct/:_id',{
	template: "showProduct",
	name: "showProduct",
	data: function(){
		return Products.findOne({_id: this.params._id});
	}
});

Router.route('/editProduct/:_id',{
  template: "editProduct",
  name: "editProduct",
  data: function(){
    return Products.findOne({_id: this.params._id});
  }
});

Router.route('/buyProduct/:_id',{
  template: "buyProduct",
  name: "buyProduct",
  data: function(){
    return Products.findOne({_id: this.params._id});
  }
});


//---------     note    ------------ //
/*

   Try to keep the names unified
   attempt to give the same value to 
                - route
                - template
                - name
                - javascript file



ㅤㅤㅤ▀ㅤㅤㅤ█ █ㅤ█▀▀▄ㅤ▄▀▀▄ㅤ█   █
ㅤㅤㅤ█ㅤㅤㅤ█▀▄ㅤ█  █ㅤ█  █ㅤ█▄█▄█
ㅤㅤㅤ▀ㅤㅤㅤ▀ ▀ㅤ▀  ▀ㅤ ▀▀ ㅤ ▀ ▀

▀█▀ █ █ㅤ█▀   █▀ █▀ █▀ █ ㅤㅤ█▀▄ █▀▄ ▄▀▄
 █  █▀█ㅤ█▀   █▀ █▀ █▀ █ ㅤㅤ█▀▄ █▄▀ █ █
 ▀  ▀ ▀ㅤ▀▀   ▀  ▀▀ ▀▀ ▀▀ㅤㅤ▀▀  ▀ ▀  ▀ 

                      ▄█▀▀▀▀▀█▄
            ▄▄▄▄▄▄▄ █▀         ▀█▄
           █       ▀█▄█           ▀█
         ██          █      ▄▄      █
        █             █ ▄▄▀▀  ▀▀▀▀   █
       █              █    ▀▀▄▄▄▀▀   █
      ▐                █             █
     ▐                 █ ▀▀▀▄    ▄   █
     ▐                 █     ▀  ▀ ▀▄ █
     ▐                 █ ███▄        █
     ▐                 █    ▀    ██ ▐
     ▐                 █       ▄     █▄▄
     ▐                █         ▌    ██ ▌
     ▐                 █   ▄▀ ▄ ▌   █   ▌
     ▐█                █    ▀  ▀   █    ▌
       ██               █   ▄▄▄▄  █     ▌
      ▄▀▀▄   ▌          ██       █▌     ▌
    ▄▀    █  ▌          ▀▀█████▀▀      ▌
  ▄▀       ███▌           ▌           ▌
▄▀            █                      █
█       ▄██▀▀▀▀                     ▌
█     ▄██▄                          ▌
█        ▀▄      ▄▀▀▀▀▄            █
█          ▀▄  ▄▀  ▄▄▄▀            ▌
▀▄           ▀▀    █               ▌
█ ▀▄                ▀▀▀▀▀▄         ▌
█   ▀▄▄               ▄▄▄▀         ▌*/