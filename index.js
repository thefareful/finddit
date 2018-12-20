import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

//form event listener
searchForm.addEventListener("submit", event => {
  //get search term
  const searchTerm = searchInput.value;
  //get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //get limit
  const searchLimit = document.getElementById("limit").value;

  //check input

  if (searchTerm === "") {
    //show message
    showMessage("Please add a search term", "alert-danger");
  }

  searchInput.value = "";

  //search reddit

  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    //loop throuhg posts
    results.forEach(post => {
      //check for image
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      output += `
                <div class="card" >
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${truncateText(post.selftext, 200)}</p>
                  <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                  <hr>
                  <span class="badge badge-secondary> Subreddit: ${post.subreddit}</span>
                  <span class="badge badge-dark> Score: ${post.score}</span>
                </div>
              </div>
                `;
    });
    output += "</div>";

    document.getElementById("results").innerHTML = output;
  });

  event.preventDefault();
});

function showMessage(message, className) {
  //create div
  const div = document.createElement("div");
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const searchContainer = document.getElementById("search-container");
  //get search
  const search = document.getElementById("search");

  //insert message
  searchContainer.insertBefore(div, search);

  //message timeout
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

//truncate text

function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened === -1) return text;
  return text.substring(0, shortened);
}
