#!/bin/sh
#script for building meteor app and pushing it to the openshift git
# Variables
GEAR_DIRECTORY='/home/magento/'
GEAR_NAME=$1

if [ "$GEAR_NAME" = "" ]; then
	echo "Please enter a valid Gear name"
	echo "exiting script..."
	exit 0
fi
cd $GEAR_DIRECTORY

OPENSHIFT_DIRECTORY="$GEAR_DIRECTORY/$GEAR_NAME"
METEOR_SOURCE='/home/magento/TDDD272016_project/src/stickman'
#METEOR_SOURCE='/home/magento/simple-todos'


cd $METEOR_SOURCE
#build meteor file
meteor build --directory $OPENSHIFT_DIRECTORY
cd $OPENSHIFT_DIRECTORY
cp -rf bundle/*  $OPENSHIFT_DIRECTORY
# copy to OPENSHIFT directory
rm -rf bundle

git add --all
git commit -m ""
git push
# commit
