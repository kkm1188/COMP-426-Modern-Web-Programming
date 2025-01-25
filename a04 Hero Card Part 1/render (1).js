/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <Kendall Miller>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return `<div class = "container">
            <div class = "columns">
                 <div class = "column is-one-third" style = "background-color: ${hero.color}";>
                    <div class = "card" style = "color: ${hero.backgroundColor}";>
                        <div class = "card-header">
                            <p class="card-header-title" style = "color: ${hero.backgroundColor}";>${hero.name}</p>
                            <div class="card-image">
                                <figure class = "image is-110x110">
                                    <img src="${hero.img}" alt="${hero.name}">
                                </figure>
                            </div>
                        <div>
                            <p>${'Name: ' + hero.first + ' ' + hero.last}</p>
                            <p>${hero.description}</p>
                        </div>
                        <div class= "content has-text-centered" style="color:${hero.color}"; max-height: 300px;>
                            <span>${'First Seen  : ' + hero.firstSeen.getMonth() + '/' + hero.firstSeen.getFullYear()}
                        </div>
                        <button class= is-link is-light"> Edit</button>
                    </div>
                    </div>   
                </div>
            </div>
            </div>
            </div>
           `
};


/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `
        <form>
            <div class="field">
                <label class ="label">Hero Name</label>
                <div class = "control">
                    <input class = "input" type = "text" value ="${hero.name}">
            </div>

            <div class="field">
                <label class ="label">First Name Name</label>
                <div class = "control">
                    <input class = "input" type = "text" value ="${hero.first}">
            </div>

            <div class="field">
                <label class ="label">Last Name</label>
                <div class = "control">
                    <input class = "input" type = "text" value ="${hero.last}">
            </div>

            <div class="field">
                <label class ="label">Subtitle</label>
                <div class = "control">
                    <input class = "input" type = "text" value ="${hero.subtitle}">
            </div>

            <div class="field">
                <label class ="label">Description</label>
                <div class = "control">
                    <textarea name="description">${hero.description}"</textarea>
            </div>

            <div class="field">
                <label class ="label">First Seen</label>
                <div class = "control">
                    <input class = "input" type = "text" value ="${hero.firstSeen}">
            </div>

            <button class= is-link is-light" type = "submit"> Save</button>
            <button class= is-link is-dark" type = "submit"> Cancel</button>


        </form>
    `
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element

    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    for(let i = 0; i < heroes.length; i++){
        $root.append(renderHeroCard(heroes[i]));
    }

    // TODO: Append the hero cards to the $root element

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    let edit = renderHeroEditForm(randomHero);

    // TODO: Append the hero edit form to the $root element
    $root.append(edit);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
