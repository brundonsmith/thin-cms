var mongoose = require('mongoose');

function slug(originalString) {
  var slug = originalString;
  slug = slug.replace(/[.,\/#!$%\^&\*;:{}=\-_`\'\"~()]/g, '')
  slug = slug.replace(/[\s\n\t]+/g, '-');
  slug = slug.toLowerCase();
  return slug;
}

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Post = new Schema({
    isPublished   : { type: Boolean },
    type          : { type: String, enum: ['project-link', 'blog-post', 'external-blog-post'] },
    date          : { type: Date, default: Date.now },
		title					: { type: String, stringType: 'short' },
    titleSlug			: { type: String, stringType: 'short', hidden: true },
    imageUrl      : { type: String, stringType: 'short' },
		body        	: { type: String, stringType: 'long' },
    externalUrl   : { type: String, stringType: 'short' }
});

Post = mongoose.model('Post', Post);

Post.schema.pre('update', function(next) {
  var newValues = this._update['$set'];
  
  this.update({
    titleSlug: slug(newValues.title)
  });

	next();
});

module.exports = { Post: Post };
