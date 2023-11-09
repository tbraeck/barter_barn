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
-  The site was created to be a to be a site similar to Craigslist that would be a resource for people who want to barter good or services or to give goods or services away for free. Barter Barn was created with the intention of bringing more connection to community members, to help people save money and time, and to perhaps cultivate a sense of connectedness, kindness, and compassion amongst community members. This site is intended to be a comprehensive forum-centered community space where members can share. trade, barter, and give freely of their goods and services.


## Technologies Used
- Frontend: ReactJS 18.2.0
- Backend: Ruby on Rails 7.0.7.2
- VS Code - version 1.81.1
- Active Storage (image_uploading/ storage)

## Features
List the ready features here:
- Things to Barter button links to all three of the forums.
- Forumcard holds all of the forum data for the different forums.
- User specific login and associated User Profile.
- User can create new items and save or claim other user's items.


## Screenshots
(https://github.com/tbraeck/barter_barn/blob/Tate-New/Screenshot%202023-11-08%20at%209.21.15%20PM.png)
(https://github.com/tbraeck/barter_barn/blob/Tate-New/Screenshot%202023-11-08%20at%209.20.55%20PM.png)
(https://github.com/tbraeck/barter_barn/blob/Tate-New/Screenshot%202023-11-08%20at%209.21.02%20PM.png)


## Setup
To setup this project go to my Github repository.
Full App: https://github.com/tbraeck/barter_barn

Start with the README file and then open the CSS, React, and Rails files in a text editor like VS Code.

## Usage
Below are snippets of some code within the project.

//React example for FreeStuffsCard component//

` const handleClaim = () => {

      if (stuff.user_id === user.id) {
        setErrors(["You cannot claim your own item."]);
        return;
      }

      fetch(`/user_free_stuffs/${stuff.id}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stuff)
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to claim item. Please try again.');
          }
        })
        .then((newStuff) => {
          handleUpdateFreeStuffs(newStuff);
        })
        .catch((error) => {
          console.error('Error claiming item:', error);
          setErrors(['Failed to claim item. Please try again.']);
        });
  };` 

//Rails example for FreeStuffs Controller actions//

`def return
    @free_stuff = FreeStuff.find(params[:id])

    if @free_stuff.claimant_id 
      @free_stuff.update(claimant_id: nil)

      render json: @free_stuff
    else
      render json: { error: 'Item could not be returned' }, status: :unprocessable_entity
    end
  end

  def update
    if @free_stuff.update(free_stuffs_params)
      render json: @free_stuff
    else
      render json: @free_stuff.errors, status: :unprocessable_entity
    end
  end`


## Project Status
Project is: _in progress_ The project is still growing. I want to complete this and make something positive for the world. 


## Room for Improvement

Room for improvement:
- I need to improve the aesthetics of the overall site. I want it to be more liek Craigslist and easy to use 
- Improve the use interface/ experience
- The functionality needs to be usable across the whole site.
- Utilize a CSS framework to unify styling
- Make it safe for users. 

To do:
- Work on the styling/ placement of elements
- Add or subtract other features, interactions, experiences
- A way to calculate the "value" of a good or service that users can use to trade? 


## Acknowledgements

- People are struggling and at the same time have fewer people in their own communities they can lean on for help or support. This site can help alleviate some of those problems by cutting out the monetary side of goods and services and returning to a bartering system.
- I see that many people feel disconnected from their own communities and this is a way to help reconnect people.

## Contact
Created by [Tate Braeckel](www.linkedin.com/in/tate-braeckel) - feel free to contact me!


