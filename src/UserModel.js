import shuffle from 'lodash/shuffle';

class User {
  constructor(name, image, gifList) {
    this.name = name;
    this.image = image;
    this.gifList = shuffle(gifList);
    this.gif = this.gifList[0];
  }
}

class GiveToUser {
  constructor(user, giveTo) {
    this.user = user;
    this.giveTo = giveTo;
  }
}

export {
  User,
  GiveToUser,
}
