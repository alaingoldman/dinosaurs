Images = new Meteor.Collection('images');

var profileStore, profileThumbsStore;

thumbStore = new FS.Store.S3('thumb', {
  accessKeyId: Meteor.settings.accessKeyId,
  secretAccessKey: Meteor.settings.secretAccessKey,
  bucket: 'lootfly',
  folder: 'img/thumb',
  ACL: "public-read",
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize("500", "500").stream().pipe(writeStream);
  }
});

originalStore = new FS.Store.S3('original', {
  accessKeyId: Meteor.settings.accessKeyId,
  secretAccessKey: Meteor.settings.secretAccessKey,
  bucket: 'lootfly',
  folder: 'img/original',
  ACL: "public-read"
});

this.Images = new FS.Collection('profile',{
  stores: [originalStore, thumbStore]
});