
import Rating from './rating';
import {log} from '../decorators';
import sleep from '../helpers/sleep';

export default class Book {
  title: string;
  publisher: string;
  ratings: Rating[] = [];

  constructor(title: string, publisher: string) {
    this.title = title;
    this.publisher = publisher;
  }

  @log
  addRating(username: string, rating: number, comment: string): Rating {
    let ratingObj = new Rating(username, rating, comment);
    this.ratings.push(ratingObj);
    return ratingObj;
  }
}
