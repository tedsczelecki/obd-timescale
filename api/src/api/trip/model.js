const BaseModel = require('../base.model');

class Post extends BaseModel {
  static get tableName() {
    return 'trip_details';
  }
  static get relationMappings() {
    return {};
  }
}

module.exports = Post;
