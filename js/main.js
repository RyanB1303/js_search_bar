const search = document.querySelector("#search-bar");
const result = document.querySelector("#match-list");

// Searching in states.json
async function searchStates(searchText) {
  const res = await fetch("../data/state.json");
  const states = await res.json();

  // get matches to current text input
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    result.innerHTML = "";
  }

  outputHtml(matches);
}

function outputHtml(matches) {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span> </h4>
        <small>Lat : ${match.lat} / Long : ${match.long}</small>
        </div>
        `
      )
      .join("");
    result.innerHTML = html;
  }
}

search.addEventListener("input", () => searchStates(search.value));
