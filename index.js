// Function that renders a character element.

function renderCharacter(character) {
  const names = document.createElement("li"); // Create an <li> element for the characters names.
  names.className = "names";

  const ul = document.querySelector("#names_section ul");
  ul.appendChild(names);

  // Creates a link element for the character details.
  const link = document.createElement("a");
  link.className = "character_details";
  link.href = `http://localhost:3000/characters/${character.id}`;
  link.textContent = `${character.name}`;

  names.appendChild(link);

  // Adds an event listener for the name click.
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevents the href from opening the url in a new tab.

    // Updates the name in the details section.
    const name = document.querySelector("#details_section h4");
    name.textContent = character.name;

    // Updates the image in the details section.
    const image = document.querySelector("#details_section img");
    image.alt = character.name;
    image.src = character.image;

    const card = document.querySelector("#details_section div"); // Handles the rendering of the card on a character.
    card.id = "card";

    handleVotes(character);
  });
}

// Function to handle the addition of votes.

function handleVotes(character) {
  // Create a form element for voting.
  const form = document.querySelector("#votes");
  form.innerHTML = `
  <input id="vote" type="number" placeholder="Enter votes here"/>
  <input type="submit" />
  `;

  const inputForm = document.querySelector("form");
  const inputValue = document.querySelector("#vote");

  // Update the votes in the details section.
  const votes = document.querySelector("#details_section p");
  votes.textContent = `Votes: ${character.votes}`;

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault();

    votes.textContent = `Votes: ${inputValue.value}`; // Update the votes with the input value.
    inputValue.value = inputValue.defaultValue; // Reset the input field back to its default value.
  });
}

// Function to get all characters from the API.

function getAllCharacters() {
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => renderCharacter(character));
    })
    .catch((error) => {
      console.error("Error fetching characters:", error); // Display an error message to the user
    });
}

// Function to render everything from the "getAllCharacters" function.

function render() {
  getAllCharacters();
}

document.addEventListener("DOMContentLoaded", render); // Renders everything when the page loads.
