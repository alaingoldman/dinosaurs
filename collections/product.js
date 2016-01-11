Products = new Meteor.Collection('products');

ProductSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200,
        min: 6
    },
    description: {
        type: String,
        label: "Description"
    },
    price: {
        type: Number,
        label: "Product price",
        min: 10,
        max: 1100,
        decimal: true
    },
    createdAt: {
        type: Date,
        label: "createdAt",
        autoValue: function(){
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    },
    user: {
        type: String,
        autoValue: function(){
            return this.userId
        }
    }
});


Products.attachSchema(ProductSchema);


// how to check validation
// Products.insert({title: "Ulysses", author: "James Joyce"}, function(error, result) {});

// The list of errors is available on `error.invalidKeys` or by calling Products.simpleSchema().namedContext().invalidKeys()