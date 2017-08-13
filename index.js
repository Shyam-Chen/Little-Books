/**
 * $ node index.js
 */

// console.log('Welcome to Big Little Books.');

const bar = () => 'Bar';

const foo = async () => {
  const result = await bar();

  if (result) {
    return `Foo, ${result}`;
  } else {
    throw new Error('Problem!');
  }
};

foo()
  .then(value => console.log(value))
  .catch(error => console.error(error));
