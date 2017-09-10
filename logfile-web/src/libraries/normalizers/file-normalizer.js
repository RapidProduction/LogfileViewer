const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const deserailizer = new JSONAPIDeserializer();

export const deserializeFile = (response) => {
  return new Promise((resolve, reject) => {
    deserailizer.deserialize(response, (error, file) => {
      if(error) reject(error);
      resolve(file);
    });
  });
};