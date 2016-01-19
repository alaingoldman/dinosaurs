  AWS.config.update({
    accessKeyId: Meteor.settings.accessKeyId,
    secretAccessKey: Meteor.settings.secretAccessKey
  });

s3 = new AWS.S3();