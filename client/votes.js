/*
Votes = new Meteor.Collection(null);


Template.votes.events({

    'submit form': function(event,template){
      event.preventDefault();
      var text = template.find('#text').value;
      	Votes.insert({
      		text: text

      	},function(error,id){
      		console.log(error);
      		console.log(id);
      		$("#text").val("");
      	})

  	}

})


Template.votes.helpers({
    'vote': function(){
        return Votes.find();
    }
});

*/