<div align="center">
  
# Encounters

The majority of this project was built in one week for my capstone MERN project.

This project was built in React, and utilizes Axios and Express. 
MongoDB provided a simple non-relational database management system.
The frontend was styled using ReactStrap and some custom CSS.
  
</div>

## What is Encounters?

Encounters is a clone of DnDBeyond's Encounter Builder: https://www.dndbeyond.com/encounter-builder

It's purpose is to help create and balance encounters within Dungeons and Dragons 5th Edition. 
It uses the experience and challenge ratings within the Monster Manual to calculate the difficulty and adjusted experience of a selection of monsters to face, and relates it to the chosen levels of a standard adventuring party.

## Features and Demos

Adjusting the level of characters is done through a modal. Any level adjustments also adjusts the XP difficulty values in the Encounter Summary!

Changing the levels of characters here will update the average party level in both the modal and the Encounter Builder in real time:
![](EncounterModal.gif)

The Encounter Summary will update and display the difficulty of the created encounter whenever the party levels are updated or a creature is added to the encounter. Adjusted EXP is consistant with D&D rules regarding multiple monsters.

![](EncountersSummary.gif)

Selecting the Summary tab brings up the text summary page. Here you will find three fields for adding background, instructions, and even loot that the players might find:

![](EncountersTextSummary.gif)

## Build Instructions

From the server folder run:
```sh
nodemon server.js
```
This command will start up the server and get the database connected.

From the client folder run:
```sh
npm install
npm start
```
The first command will install the required Node_Modules.
The second will start the client, opening up the application in your browser.
