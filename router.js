//---------   main routes ------------ //
Router.configure({layoutTemplate: 'index'});

Router.route('/',{
	template: "home",
	name: "home"
});


//---------     users     ------------ //
Router.route('/newUser');
Router.route('/login');
Router.route('/recover');
Router.route('/reset/:token',{
  template: "reset",
  name:     "reset",
  onBeforeAction: function(){
    //console.log(this.params.token);
    resetToken = this.params.token;
    this.next();
  }
  // ,
  // data: function(){
  //   //return this.params.token;
  // }
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