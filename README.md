# Tate Braeckel Phase 5 Project: Barter Barn
Tate Braeckel's Barter Barn is the capstone project for Tate Braeckel's Flatiron School journey.  The site was created to be a to be a site similar to Craigslist that would be a resource for people who want to barter good or services or to give goods or services away for free. Barter Barn was created with the intention of bringing more connection to community members, to help people save money and time, and to perhaps cultivate a sense of connectedness, kindness, and compassion amongst community members. 

It is a full CRUD site that allows the user to login, to access the three forums (Goods, Services, and Free Stuff), to save a copy of those items for future reference in their user profile or to "claim" and good or service, which makes that item dissappear from the general forum, appear in their user profile, and will eventually have messaging and contact infor for the item creator.  

The React front end is an SPA with a navbar that clients can use to navigate to Home, Things to Barter, a featured item page, and the user profile. The back end is Ruby on Rails.  This site has basic tools like a navbar, logout button, and a logo image that links to the home page,  

Live demo [_here_](https://youtu.be/b4JDXWqOegs). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- Drawing Ideas Now was created to inspire every artist or budding artist for drawing or creative ideas.   One of the most frustrating aspects of art creation or art education is having enough creative ideas to inspire art creation itself.  That's where this app comes to the rescue. This site is intended to be a comprehensive search database for all random drawing ideas curated by members themselves.
- Their are so many resources online for educators but this site is a singularity for all of those resources. 


## Technologies Used
- Frontend: ReactJS 18.2.0
- Backend: Ruby on Rails 7.0.7.2
- VS Code - version 1.81.1


## Features
List the ready features here:
- Category link that goes to all drawing categories.
- CategoryCard that holds all associated drawings.
- User specific login and associated User Profile.
- Each drawing in the UserProfile can be edited or deleted. Drawings in the general category card can be added to the UserProfile.


## Screenshots
(https://github.com/tbraeck/PHASE4_PROJECT/blob/Tate-Main/Screenshot%202023-09-02%20at%204.59.55%20PM.png)
(https://github.com/tbraeck/PHASE4_PROJECT/blob/Tate-Main/Screenshot%202023-09-02%20at%205.00.36%20PM.png)
(https://github.com/tbraeck/PHASE4_PROJECT/blob/Tate-Main/Screenshot%202023-09-02%20at%205.00.46%20PM.png)


## Setup
To setup this project go to my Github repository.
Full App: https://github.com/tbraeck/PHASE4_PROJECT

Start with the README file and then open the CSS, React, and Rails files in a text editor like VS Code.


## Usage
Below are snippets of some code within the project.

//React example for EditDrawing component//

`fetch(`http://localhost:3000/users/${user_id}/user_drawings/${drawing_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(drawingBody),
      })
        .then((response) => response.json())
        .then((updatedDrawing) => {
          console.log(updatedDrawing)
          handleUpdateUserDrawings(updatedDrawing);
          setIsEditFormVisible(!isEditFormVisible);
        })
        .catch((error) => {
          console.error("Error updating drawing:", error);
        });
    };` 

//Rails example for UserDrawings Controller backend routing//

`# PATCH/PUT /users/:user_id/user_drawings/:id
    def update
      if @user_drawing.update(user_drawing_params)
        render json: @user_drawing
      else
        render json: @user_drawing.errors, status: :unprocessable_entity
      end
    end
    
    # DELETE /users/:user_id/user_drawings/:id
    def destroy
      @user_drawing.destroy
      head :no_content
    end`


## Project Status
Project is: _in progress_ The project is ever-evolving and will grow as I grow as a developer. I really do want this project to be deployed and for it to help any artist in need of creative inspiration.


## Room for Improvement

Room for improvement:
- I need to improve the aesthetics of the overall site 
- Improve the use interface/ experience
- Add randomizer functionality for idea creation
- Utilize a CSS framework to unify styling

To do:
- Work on the styling/ placement of elements
- Add or subtract other features, interactions, experiences


## Acknowledgements

- This project was inspired by my years as an educator/ artist, thinking of how difficult and frustrating it is at times to find ideas for new creations without scraping the entire net.
- Trying to solve a simple problem for educators and artists.

## Contact
Created by [Tate Braeckel](www.linkedin.com/in/tate-braeckel) - feel free to contact me!


