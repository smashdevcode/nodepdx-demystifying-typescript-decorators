
import Rating from './rating';
import log from '../decorators/log-decorator';

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
    // console.log(`addRating method called with args: ${JSON.stringify(arguments)}`);

    let ratingObj = new Rating(username, rating, comment);
    this.ratings.push(ratingObj);

    // console.log(`addRating method return value: ${JSON.stringify(ratingObj)}`);

    return ratingObj;
  }
}
