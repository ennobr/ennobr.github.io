const publicationContainer = document.querySelector("#publication-list");

function renderPublication(publication) {
  const article = document.createElement("article");
  article.className = "publication";

  const details = document.createElement("div");
  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  const authors = document.createElement("p");
  const venue = document.createElement("p");
  const year = document.createElement("span");

  titleLink.href = publication.url;
  titleLink.rel = "noreferrer";
  titleLink.textContent = publication.title;
  title.append(titleLink);

  authors.textContent = publication.authors;
  venue.className = "venue";
  venue.textContent = publication.venue;
  year.textContent = publication.year;

  details.append(title, authors, venue);
  article.append(details, year);

  return article;
}

async function loadPublications() {
  if (!publicationContainer) return;

  try {
    const response = await fetch("data/publications.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load publications");

    const publications = await response.json();
    publicationContainer.replaceChildren(
      ...publications.map((publication) => renderPublication(publication)),
    );
  } catch {
    publicationContainer.dataset.loadState = "fallback";
  }
}

loadPublications();
