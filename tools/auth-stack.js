import path from 'path';
import { promisedExec, spawnWaitUntilString } from './processUtils';

//todo - have a check to make sure docker is running

/** paths **/

const pathProjectRoot = path.resolve(__dirname, '../');
let pathBioNanoPlatform = path.resolve(pathProjectRoot, '../bio-user-platform');

/** config **/

//if this isnt working, you can debug with --DEBUG flag
const DEBUG = process.argv.includes('--DEBUG');
if (!DEBUG) {
  console.log('debug auth startup by passing --DEBUG');
}

//allow overwriting the bio-user-platform path
process.argv.forEach((val, index) => {
  const argFlag = 'PLATFORM_PATH';
  if (val.startsWith(argFlag)) {
    const newPath = val.substr(argFlag.length + 1);
    pathBioNanoPlatform = newPath;
  }
});
console.log('path for bio-user-platform is ' + pathBioNanoPlatform + '. Set by passing --PLATFORM_PATH=/your/path');

/** scripts **/

let dockerEnv;

const setupBioNanoPlatform = (useGenomeDesignerBranch = false) => {
  const checkoutPromise = useGenomeDesignerBranch == true ?
    promisedExec(`git checkout genome-designer`,
      { cwd: pathBioNanoPlatform }
    ) :
    Promise.resolve();

  return checkoutPromise
    .then(() => promisedExec(`npm install`,
      { cwd: pathBioNanoPlatform }
    ));
};

const startBioNanoPlatform = () => {
  return spawnWaitUntilString('npm', ['run', 'storage-background'],
    {
      cwd: pathBioNanoPlatform,
      env: Object.assign({}, process.env, dockerEnv),
    },
    { waitUntil: 'database system is ready to accept connections' }
  );
};

const startAuthServer = () => {
  return spawnWaitUntilString('npm', ['start'],
    { cwd: pathBioNanoPlatform },
    { waitUntil: `{ address: { address: '::', family: 'IPv6', port: 8080 } } 'started'` });
};

const startRunAuth = () => {
  console.log('\n\n');
  return spawnWaitUntilString('npm', ['run', 'auth'],
    { cwd: pathProjectRoot },
    {
      waitUntil: 'Server listening at http://0.0.0.0:3000/',
      forceOutput: true,
      failOnStderr: false,
    }
  );
};

async function auth() {
  try {
    await setupBioNanoPlatform();
    await startBioNanoPlatform();
    await startAuthServer();
    await startRunAuth();
  } catch (err) {
    console.log('CAUGHT', err);
    throw err;
  }
}

export default auth;
