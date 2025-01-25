/**
 * a06:s06
 * Promise chaining solution to the maze
 */


/**
 * Runs when the page loads
 */

window.addEventListener('load',async() => {
  const item_ids = await getItemIDs();
  let item_views = [];
  for(let i = 0; i < item_ids.length; i++){
    const item_info = await getItemInfo(item_ids[i]);
    const item_view = createItemView(item_info);
    item_views.push(item_view);
    item_views[i].addEventListener('click', () => {
      item_views[i].toggleMetaInformation();
    });
}});
const getItemIDs = async() => {
  const result = await fetch('http://backend/item');
  return await result.json();
}
const getItemInfo = async(info) => {
  const result = await fetch(info);
  return await result.json();
}



document.body.onload = async function () {
  // Create a basic maze
  const maze = new Maze();

  // Add a token to the maze
  const token = new Token(maze);

  // Attach the maze to the dom
  document.getElementById('root').appendChild(maze.dom);

  // TODO: Write code to solve the maze here
  //  \/ \/ \/ \/ \/
  token.moveAsync('north').then(function() {
    return token.moveAsync('east');
}).then(function() {
    return token.moveAsync('east');
}).then(function() {
    return token.moveAsync('north');
});


  //  /\ /\ /\ /\ /\
}
