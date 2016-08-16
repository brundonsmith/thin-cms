# Thin CMS
A lean, mean, headless CMS built in Angular 2 that will let you manage existing Mongoose data without designing your project around it.

```
var cms = require('thin-cms');

cms.init(
  'my-mongo-domain.com/my-db',
  {
    MongooseModel1.modelName: MongooseModel1.schema,
    MongooseModel2.modelName: MongooseModel2.schema,
    MongooseModel3.modelName: MongooseModel3.schema,
    ...
  }
);
```

# Philosophy
A content management system shouldn't be a monolithic system that you build your app 
within. It should be a lightweight and friendly management interface you can easily add to whatever 
kind of application you want to build. It's only used to manage data, so its only concern should be data.

# Features
- Define data models with vanilla Mongoose schemas for simple configuration
- Log in with existing Mongo user accounts for simple permission management
- Optional CMS-specific schema attributes for tailoring user interface, but **vanilla 
Mongoose schemas will always work in the CMS**, and **extended schemas will 
always work in Mongoose**
- Completely independent from application; only requires schemas and database access
- Can be run on the same Node.js process as the application, or on a separate one

# CMS-specific schema property attributes
Example:
```
var Post = new Schema({
  published : { type: Boolean },
  title     : { type: String },
  body      : { type: String, customProp: 'val' },
  url       : { type: String }
});
```

## Optional Attribtues for `String`
### `stringType`: String
Value can be `'short'`, `'long'`, or `'rich'`. Defaults to `'short'` when 
no value given. Can be added to properties of type `String` to specify what kind of input 
should appear in the editor. `'short'` yields a single-ling text input, `'long'` yields a 
text area input, and `'rich'` yields a rich text editor. Note that text created by the 
`'rich'` editor type will be styled HTML, and will need to be rendered as such.

## Optional Attribtues for `Number`
### `isMoney`: Boolean
Whether or not this number is considered to be money. Affects appearance
and decimal precision in the Admin UI.

# Roadmap
- Toast/flash messages for confirmations and notifications
- Site global settings
- Admin UI theming?
- Rich text editor
- Datepicker
- Sort/search in collection views
- Pagination/infinite scroll in collection views
- Intelligent support for Mongoose validation attributes
- Support for object relationship properties
