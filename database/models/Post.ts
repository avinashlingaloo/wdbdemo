// model/Post.js
import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
    static readonly table = 'posts';

    @text('title') title;
    @text('subtitle') subtitle;
    @text('body') body;
}
