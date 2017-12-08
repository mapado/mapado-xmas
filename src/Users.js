import { User }  from './UserModel';
import config from './config';

export default config.users.map(user =>
  new User(user.name, user.avatar, user.gif)
);
