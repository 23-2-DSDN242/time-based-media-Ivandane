# MDDN 242 Project 1: Time-based Media
## Clock Name: Petals in Time
#### By Ivan Mangubat
### Part 1: Sketch
I plan to have two/three circular ring-like objects in the middle of the canvas, rotating and/or expanding in length according to hours, minutes and seconds. I also want to incorporate greenery such as vines and flowers that sprout from the rings and grow outwards (depending on the time of day, month etc.), with garden insects such as butterflies, ladybugs and bees encircling the overall picture.
### Part 2: Maeda Clock
I recreated the second Maeda Clock from [John Maeda's designs](https://codingtrain.github.io/12oclocks/) using a function and a grid system to align the circles. If I were to make this a functional clock, I would have to implement functions and calculations to determine which circles will appear to represent the correct time values.
### Part 3: Original Clock
The clock can be viewed [here](https://23-2-dsdn242.github.io/time-based-media-Ivandane/).

My final design is a little different from my original concept but still retains certain aspects such as the circular motif in the centre of the canvas. The idea was changed to encompass a sakura pond theme, which is based off the Aston Norwood Sakura Blossom Garden in Upper Hutt, Wellington. A particular attribute I aimed to include from this inspiration was the bright neon lights that illuminate after dark, which gave me the concepts needed for a day and night theme for my clock.

The amount of sakura blossoms denotes the hour, the lanterns denote the minutes in groups of ten, and the petals denote the singular minutes. For example, if there were five sakura blossoms, three lanterns and seven petals within the night scene, the current time would be 5:37 PM. The tail animation of the koi also represents one second for each repetition.

Initially, I wanted a pond to be in the centre of the canvas and base my placement of assets around that. I created  the pond by overlapping circles with changes in size and transparency. However, I realised the amount of space that could be used on either side of the pond, and instead of disregarding the sides as empty spaces I decided to make the pond stretch across the whole screen.

The creation of the sakura blossom, petals, floating lanterns and the koi fish were done entirely in code using basic custom shapes and colour gradients.
The petals and floating lanterns were saved as .PNG images to save on processing power when loading the sketch, as many instances of these objects may appear on the canvas at certain times.
However, the sakura blossom uses a [P5 graphic](https://p5js.org/reference/#/p5/createGraphics) layer instead, as I originally intended for slight colour variations with each subsequent sakura. As this function is still within the code, this change can be easily implemented if I were to revisit and refine this project.
The koi fish is also drawn within the sketch and uses multiple [map](https://p5js.org/reference/#/p5/map) functions to control its animations. It also uses [Perlin noise](https://p5js.org/reference/#/p5/noise) to generate the red and black scale patterns on its body.

The generation of these assets is controlled by its class, which creates a new object based on the current hour, minute and seconds.
The sakura blossoms class originally had more motion, as each object was supposed to spawn in the centre of the canvas and would move accordingly to avoid overlap with other sakura. However, this was not an appealing effect when considering that hours increment one by one, and the calculations for the movement of the sakura were done using [atan2](https://p5js.org/reference/#/p5/atan2) which defaults to moving objects along only the X-axis. This original idea resulted in a straight line of sakura blossoms which is not what I intended, so instead I opted for a ring of blossoms in the centre.
The lanterns and petals class were more straightforward, utilising simple logic statements and modulo equations to display the correct amount of objects for the value of minutes. I also used noise functions to add controlled random parameters to the object, ranging from scale to rotation speed, to add subtle movements on the screen.
### Part 4: Clock Alarm
I had an idea from the start of my project that the alarm function for my clock would feature a change in motion or appearance to the sketch's assets. As the process of creating my clock took a significant amount of time, I was not able to develop my clock alarm design as thoroughly as I wished.
As the sakura blossoms in the centre were stationary, I wanted to introduce movement to the ring when the alarm went off. I had to modify the class and its move function to achieve the effect I wanted, which was to move the blossoms in and out during the duration of the alarm. The sakura are then reset to their initial positions.
The more complex change I wanted to implement was the flashing lights of the lanterns. It was also more of a challenge that I set the lanterns to be unlit during the day and lit during the night, so I needed slightly different processes for each scenario. With the use of complicated logic statements and ternary operators, I was able to make the lanterns toggle their state as the alarm counts down, then repeatedly flash as it goes off.
With the petals, it was just a matter of multiplying their rotation speed to make them spin faster during the alarm. I had initially wanted to disperse the petals towards the edges of the canvas or make each petal travel a repeating path, but with the time constraints given, I had to discard that idea.
### Part 5: Final Clock
Overall, Project One was an exciting way to further explore data visualisation and object-oriented programming, which I was introduced to last year. I am content with the final product, but I am also able to see the improvements that can be made to make this clock more visually appealing. I did my best to space my workload appropriately, but, due to my time being divided across the other courses in my schedule, it ultimately did affect the outcome of the project as a whole. Nevertheless, this assignment has encouraged me to think outside the box and design a familiar medium in a completely new way.
### Citing External Influence
There is a line of code that is derived from a prompt for ChatGPT, specifically on line 323 of my code. I needed a shorthand way of toggling the state of the lanterns during the countdown and alarm phases, which was made more complicated due to the day and night cycle. I asked ChatGPT for the best way of triggering booleans with arguments in this case, which helped me save time and not make my code overly complicated.