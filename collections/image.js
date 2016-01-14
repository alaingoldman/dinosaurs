var imageStore = new FS.Store.GridFS("images");

var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('400').stream().pipe(writeStream);
};


Images = new FS.Collection("images", {
  
  stores: [
    new FS.Store.FileSystem("thumb", { transformWrite: createThumb }),
    new FS.Store.FileSystem("original")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});