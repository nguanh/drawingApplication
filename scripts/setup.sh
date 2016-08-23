#!/bin/bash
# Script for setting up new Openshift gear for Meteor
# First parameter is the Gear name
# All files will be replaced, such that Meteor can run on the Gear

GEAR_DIRECTORY='/home/magento/'
GEAR_NAME=$1

if [ "$GEAR_NAME" = "" ]; then
	echo "Please enter a valid Gear name"
	echo "exiting script..."
	exit 0
fi
cd $GEAR_DIRECTORY
rhc app-create $GEAR_NAME diy-0.1 mongodb-2.4 cron-1.4
#rhc app-create $GEAR_NAME diy-0.1 mongodb-2.4 cron-1.4 nodejs-0.6
#create gear
git clone https://github.com/tutaslabs/openshift-meteor.git pushscripts
cd $GEAR_NAME

rm -r "$GEAR_DIRECTORY/$GEAR_NAME/.openshift"
rm -r "$GEAR_DIRECTORY/$GEAR_NAME/diy"
rm -r "$GEAR_DIRECTORY/$GEAR_NAME/misc"
#remove old files
cp -r "$GEAR_DIRECTORY/pushscripts/.openshift" "$GEAR_DIRECTORY/$GEAR_NAME"
cp    "$GEAR_DIRECTORY/pushscripts/meteorshim.js" "$GEAR_DIRECTORY/$GEAR_NAME"
cp -r "$GEAR_DIRECTORY/pushscripts/package.json" "$GEAR_DIRECTORY/$GEAR_NAME"
rm -rf "$GEAR_DIRECTORY/pushscripts"
#Copy all repository files to openshift repo, except for the .git files



