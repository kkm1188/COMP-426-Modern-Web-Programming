/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
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
    // TODO: Copy your code from a04 to render the hero card
    return `<div class = columns>
        <div class = "column is-one-third" style = "background-color: ${hero.backgroundColor}";>
            <div class = "card" style = "color: ${hero.color}";>
                <div class = "card-header">
                    <p class="card-header-title" style = "color: ${hero.color}";>${hero.name}</p>
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
                    <span>${'First Seen  : ' + hero.firstSeen}
                </div>
                <button id = "${hero.id}" type = "button" class= "editbutton"> Edit</button>
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
    // TODO: Copy your code from a04 to render the hero edit form
    return `
        <form>   
            <div class="field">
                <label class ="label">Hero Name</label>
                <div class = "control">
                    <input id = "name" class = "input" type = "text" value ="${hero.name}">
            </div>

            <div class="field">
                <label class ="label">First Name Name</label>
                <div class = "control">
                    <input id = "first" class = "input" type = "text" value ="${hero.first}">
            </div>

            <div class="field">
                <label class ="label">Last Name</label>
                <div class = "control">
                    <input id = "last" class = "input" type = "text" value ="${hero.last}">
            </div>

            <div class="field">
                <label class ="label">Subtitle</label>
                <div class = "control">
                    <input id = "subtitle" class = "input" type = "text" value ="${hero.subtitle}">
            </div>

            <div class="field">

                <label class ="label">Description</label>
                <div class = "control">
                    <textarea id = "description" name="description">${hero.description}"</textarea>
            </div>

            <div class="field">
                <label class ="label">First Seen</label>
                <div class = "control">
                    <input id = "firstSeen" class = "input" type = "text" value ="${hero.firstSeen}">
            </div>
            <button id = "${hero.id}" class = "submitbutton" type = "submit"> Save </button>
            <button id = "${hero.id}" class = "cancelbutton" > Cancel </button>
        </form>
    `
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    const $root = $('#root');
    let a = heroicData.find(h => h.id == event.target.id);
    $root.append(renderHeroEditForm(a));
    event.target.parentNode.parentNode.remove();
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    const $root = $('#root');
    let a = heroicData.find(h => h.id == event.target.id);   
    $root.append(renderHeroCard(a));
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    const $root = $('#root');
    let a = heroicData.find(h => h.id == event.target.id);

    a.name =$("input[id=name]").val();
    a.first =$("input[id=first]").val();
    a.last =$("input[id=last]").val();
    a.description=$("textarea[id=description]").val();
    a.firstSeen= new Date($("input[id=firstSeen]").val());

    let c = renderHeroCard(a);
    
    heroicData.forEach(b => {
        if(b.id == a.id){
            b.name = a.name;
            b.first = a.first;
            b.last = a.last;
            b.description = a.description;
            b.firstSeen = a.firstSeen; 
        }
    });
    $('#form').replaceWith(c);
    $root.append(renderHeroCard(a));
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for(let i = 0; i < heroes.length; i++){
        $root.append(renderHeroCard(heroes[i]));
    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $root.on('click', '.editbutton',handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on('click', '.submitbutton',handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', '.cancelbutton',handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
