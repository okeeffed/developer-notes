---
name: Cocoa Pods Workshop
menu: Ruby 
---
# COCOA PODS WORKSHOP

## PODS-1: Keywords

To start the project, go to the project folder...

pod init
open -a Xcode Podfile

Remove the pounds sign that sets the platform.

Then under the #Pod for..., you can add your pods!

Check cocoapods website for pods.

Then, to install the selected pods, type...
pod install

Now, we will want to open up the .xcworkspace file!

## PODS-2: Updating

Change the pod file...

eg pod 'Hue', '~> 1.1.0' // update to anything up to 1.2 but not above

THEN just back in terminal

pod update
