/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import MongoClient from 'mongodb';

const url = 'mongodb://localhost:27017/constructor';

//this is what is exported
let connection;

//queue waiters
let connecting = false;
const queue = [];

export default function connect() {
  return new Promise((resolve, reject) => {
    if (connection) {
      return resolve(connection);
    }

    if (connecting === true) {
      queue.push(resolve);
      return;
    }

    connecting = true;
    MongoClient.connect(url, (err, db) => {
      if (err) {
        return reject(err);
      }

      console.log('connected to Mongo at ', url);

      connecting = false;
      connection = db;

      queue.forEach(resolver => resolver(connection));
      resolve(connection);
    });
  });
}
