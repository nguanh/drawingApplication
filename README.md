Phu Anh Tuan Nguyen

SVG Drawing Program.
The goal of this Project is to create a Web Application for colloborative 
drawing using SVG.
The app allows creating SVG shapes such as rects, lines, circles and texts.
Already created shapes can be modified by resizing and moving  on the 
drawing board. The appearance can be changed by adapting recoloring and 
changing the size of strokes. The layering tool can be used to move shapes to
the foreground and hiding other shapes behind.
With these tools it is possible to create different images on the drawing board.

Every drawing board is stored inside a frame. Users can create different frames
to draw different images. Images can be shared for other users allowing them 
to collaborate in painting. All changes done are shown in real time.


Frontend:
For Frontend we'll use React as this allows efficient DOM manipulation,
this might be crucial for creating several objects in a collaborate.
The D3js libarary is used for creating and manipulating svg objects
such as Lines,Circles,Texts and Images.

Backend:
Meteor has a lot of functionality integrated and can be used with React,
as React should always be used with another Framework.
Also Meteor offers many tutorials with React.

Deployment:
For Deployment we'll use Openshift. The LIU Servers offer
up to 10 Gears without any time limitation, this allows more freedom
when testing. Also it scales automatically.

updated Screencast:
https://youtu.be/eaDhphI-8Ag
