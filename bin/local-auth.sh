#!/usr/bin/env bash
set -e

VERSION_FILE="./node_modules/bio-user-platform/package.json"
VERSION=$(cat ./auth-version.txt)
LOCALHOST="http://localhost:3000"

GIT_AUTH_MODULE_URL="git+https://git.autodesk.com:bionano/bio-user-platform.git#v${VERSION}"

if [ ! -z ${AUTH_MODULE_KEY} ] && [ ! -z ${AUTH_MODULE_SIG} ] && [ ! -z ${AUTH_MODULE_EXPIRES} ];
then
    BASE="https://s3-us-west-2.amazonaws.com/bionano-npm/bio-user-platform-latest.tgz?AWSAccessKeyId="
    AUTH_MODULE_URL="${BASE}${AUTH_MODULE_KEY}&Expires=${AUTH_MODULE_EXPIRES}&Signature=${AUTH_MODULE_SIG}"
    echo "Auth Module URL set in environment: ${AUTH_MODULE_URL}"
else
    AUTH_MODULE_URL=${GIT_AUTH_MODULE_URL}
    echo "Using git+https to install Auth Module: ${AUTH_MODULE_URL}"
fi

correct_cwd () {
    if [ ! -f "package.json" ]
    then
        echo "current working directory error: are you in the genome-designer root directory?"
        exit 1
    fi
    PROJECT=$(grep '"name":' package.json | tr -d ' ' | tr -d ',' | tr -d '"' | cut -f 2 -d :)
    if [ "$PROJECT" != "genetic-constructor" ]
    then
        echo "unexpected project name: $PROJECT"
        exit 1
    fi
}

install_platform () {
    if [ -f "$VERSION_FILE" ]
    then
        CURRENT_VERSION=$(grep '"version":' ${VERSION_FILE} | tr -d ' ' | tr -d ',' | tr -d '"' | cut -f 2 -d :)
        if [ "$CURRENT_VERSION" == "$VERSION" ]
        then
            return 0
        fi
    fi
    npm install ${AUTH_MODULE_URL}
}

correct_cwd
install_platform

TARGET="npm start"
if [ "$COMMAND" != "" ]
then
    TARGET=${COMMAND}
fi

echo "executing $TARGET with authentication enabled..."
BIO_NANO_AUTH=1 HOST_URL=${LOCALHOST} ${TARGET}
