// Pronađi HTML elemente
const container = document.getElementById("articlesContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Varijable za spremanje linkova za sljedeću i prethodnu stranicu
let nextPage = null;
let prevPage = null;

// Funkcija za dohvat članaka s API-ja
function loadArticles(url) {
  if (!url) {
    url = "https://api.spaceflightnewsapi.net/v4/articles";
  }
  // Dohvati podatke s API-ja
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Očisti prethodne članke
      container.innerHTML = "";

      //asyncfunctions

      // Prođi kroz svaki članak i prikaži ga
      data.results.forEach(function (article) {
        const div = document.createElement("div");
        div.className = "article";
        div.innerHTML = `
          <img src="${article.image_url}" alt="${article.title}">
          <h2>${article.title}</h2>
          <p>${article.summary}</p>
        `;
        container.appendChild(div);
      });

      // Spremi linkove za navigaciju
      nextPage = data.next;
      prevPage = data.previous;

      // Omogući ili onemogući dugmad
      nextBtn.disabled = !nextPage;
      prevBtn.disabled = !prevPage;
    });
}

// Kada se klikne "Next"
nextBtn.addEventListener("click", function () {
  if (nextPage) {
    loadArticles(nextPage);
  }
});

// Kada se klikne "Previous"
prevBtn.addEventListener("click", function () {
  if (prevPage) {
    loadArticles(prevPage);
  }
});

// Učitaj početne članke kad se stranica otvori
loadArticles();
