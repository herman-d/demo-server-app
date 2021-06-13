const Client = require('oc-client');

const client = new Client({
  registries: { serverRendering: 'https://herman-registry.herokuapp.com/' },
  components: {
    "hello-world-react": '1.0.7',
  }
});

client.init({
  headers: { 'accept-language': 'en-US' }
}, function (error, responses) {
  console.log(error);
  // => something like null or Error making request to registry

  console.log(responses);
  // => something like { hello: '<b>hello</b>'}
});

const getComponent = async (name) => {
  return new Promise((resolve, reject) => {
    client.renderComponent('hello-world-react', {
      container: false,
      headers: {
        'accept-language': 'en-GB'
      },
      parameters: {
        name
      },
      timeout: 2
    }, function (err, html, details) {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

module.exports = { getComponent };
