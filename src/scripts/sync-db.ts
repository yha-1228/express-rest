import User from '../models/User';

async function main() {
  await User.sync({ force: true });
}

main()
  .then((result) => {
    console.log('Done', result);
  })
  .catch((err) => {
    console.log('Fail', err);
  });
