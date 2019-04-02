// Make all accordions work with the bulma library
let accordions = bulmaAccordion.attach();

// Load the values script
const values = remote.require(path.join(__dirname, '../backend/values'));

// Read the prologue file
let data = readFile('databases/prologue.json');

// Parse the json file
let prologue = JSON.parse(data);

// Get the element with all the data
let el = document.getElementById('data')

// Loop through all the fields in de element
for (let i = 0; i < el.children.length; i++) {
  // Get the title of this part
  let title = el.children[i].id;
  // Set the text of the field
  el.children[i].children[1].children[0].children[0].value = prologue[title];
}


/**
 * Save the prologue to the backend.
 */
function saveData() {
  // Get the element with all the data
  let el = document.getElementById('data')

  // Declare the prologue variable
  let prologue = {};

  // Loop through all the fields in de element
  for (let i = 0; i < el.children.length; i++) {
    // Get the title from the id
    let title = el.children[i].id;
    // Get the text of the field
    let text = el.children[i].children[1].children[0].children[0].value;
    // Save the data to the prologue
    prologue[title] = "<w:p><w:r><w:t>" + text.replace(/(?:\r\n|\r|\n)/g, "&#xD;") + "</w:t></w:r></w:p>";
    console.log(text);
  }

  // Send the prologue to the backend
  values.set("prologue", prologue);

  // Go to the next page
  window.location.href = "options.html";
}
