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
    },
    draft: {
        type: Boolean,
        optional: true
    },
     images: {
         type: [String],
         label: "Images",
         minCount: 1,
         maxCount: 5
     }
});


Products.attachSchema(ProductSchema);