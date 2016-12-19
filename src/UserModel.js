class User {
  constructor(name, image, gif) {
    this.name = name;
    this.image = image;
    this.gif = `/images${gif}`;
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
