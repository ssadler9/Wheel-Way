# project1

This was a fun and unique challenge for my first Project of the Bootcamp.

The goal here was to develop an interactive map for people who are dependent on wheelchairs to get around in public.  We wanted to design an app that is easy to use and intuitive.

We used Google Maps API for the map.  The Google Maps directions can be set to default for sidewalks, and appears to be the best documented map to use.

My specific task was to make the map interactable.  You will see a Google Maps image display.  There are preset locations entered in the code localized to UT Austin's Campus.  The user can select where to go by using the options in the drop down.  That will the best route on the map to get to the destination.

The really cool thing here is the pins.  A user can identify "trouble areas" in the path.  The user can then click on the map where the trouble is, and a form will appear.  The user will select what the trouble is - Construction, Ramp, Rough Road, Stairs, or Obstruction.  The pin that is selected will be stored in our Firebase Database.  Upon refresh, you will notice a custom pin will be placed on the map for other users to clearly see in real time!

This app is currently being developed further using Express, Node and Sequelize to provide an even better user experience!