
import Rating from './rating';
import {log, perf, memoize} from '../decorators';
import sleep from '../helpers/sleep';

@log
export default class Book {
  @log title: string;
  @log publisher: string;
  ratings: Rating[] = [];

  constructor(title: string, publisher: string) {
    this.title = title;
    this.publisher = publisher;
  }

  @log
  @perf
  @memoize
  addRating(username: string, rating: number, comment: string): Rating {
    sleep(1);
    let ratingObj = new Rating(username, rating, comment);
    this.ratings.push(ratingObj);
    return ratingObj;
  }

  toJSON() {
    return {
      title: this.title,
      publisher: this.publisher,
      ratings: this.ratings
    };
  }
}
