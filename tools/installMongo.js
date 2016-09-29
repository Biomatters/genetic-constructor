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
import { promisedExec } from './processUtils';

const MONGODB_VERSION = '3.2.9';

let platform;

switch (process.platform) {
case 'darwin': {
  platform = 'osx-x86_64';
  break;
}
case 'linux': {
  platform = 'linux-x86_64';
  break;
}
case 'win32': {
  if (process.arch === 'x64') {
    platform = '';
  } else {
    platform = '';
  }
  break;
}
default:
}

//todo - update docs about mongo

async function installMongo() {
  console.log(`

***** Attention ******

You must install mongo for installation to work

https://docs.mongodb.com/manual/administration/install-community/

`);
  return Promise.resolve();

  /*
   //todo - lots of contingencies dependent on OS etc... need to reconcile those

   //install mongo
   await promisedExec(`wget http://fastdl.mongodb.org/linux/mongodb-${platform}-${MONGODB_VERSION}.tgz`);
   await promisedExec(`tar xfz mongodb-${platform}-${MONGODB_VERSION}.tgz`);
   await promisedExec(`export PATH=\`pwd\`/mongodb-${platform}-${MONGODB_VERSION}/bin:$PATH`);
   */
}

export default installMongo;
