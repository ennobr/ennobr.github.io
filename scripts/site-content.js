const contentFiles = {
  profile: "content/profile.json",
  news: "content/news.json",
  projects: "content/projects.json",
  publications: "content/publications.json",
  contact: "content/contact.json",
};

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

function renderButton(link) {
  const anchor = document.createElement("a");
  anchor.className = `button ${link.style || "secondary"}`;
  anchor.href = link.url;
  anchor.textContent = link.label;

  if (!link.url.startsWith("mailto:") && !link.url.startsWith("#")) {
    anchor.rel = "noreferrer";
  }

  return anchor;
}

function renderProfile(profile) {
  const role = document.querySelector("#profile-role");
  const name = document.querySelector("#profile-name");
  const bio = document.querySelector("#profile-bio");
  const links = document.querySelector("#profile-links");
  const portrait = document.querySelector("#profile-portrait");
  const caption = document.querySelector("#profile-caption");

  if (role) role.innerHTML = profile.role;
  if (name) name.textContent = profile.name;

  if (bio) {
    bio.replaceChildren();
    profile.bio.forEach((paragraph) => {
      const element = document.createElement("p");
      element.innerHTML = paragraph;
      bio.append(element);
    });
  }

  if (links) {
    links.replaceChildren(...profile.links.map((link) => renderButton(link)));
  }

  if (portrait) {
    portrait.src = profile.portrait.src;
    portrait.alt = profile.portrait.alt;
    portrait.onerror = () => {
      portrait.onerror = null;
      portrait.src = profile.portrait.fallback;
    };
  }

  if (caption) caption.innerHTML = profile.portrait.caption;
}

function renderNews(items) {
  const list = document.querySelector("#news-list");
  if (!list) return;

  list.replaceChildren(
    ...items.map((item) => {
      const entry = document.createElement("li");
      const time = document.createElement("time");
      const text = document.createElement("span");

      time.dateTime = item.date;
      time.textContent = item.label || item.date;
      text.innerHTML = item.text;

      entry.append(time, text);
      return entry;
    }),
  );
}

function renderProjects(projects) {
  const list = document.querySelector("#project-list");
  if (!list) return;

  list.replaceChildren(
    ...projects.map((project) => {
      const card = document.createElement("article");
      const number = document.createElement("span");
      const title = document.createElement("h3");
      const text = document.createElement("p");

      card.className = "info-card";
      number.textContent = project.number;
      title.textContent = project.title;
      text.innerHTML = project.text;

      card.append(number, title, text);
      return card;
    }),
  );
}

function renderPublications(publications) {
  const list = document.querySelector("#publication-list");
  if (!list) return;

  const newestFirst = [...publications].sort(
    (a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10),
  );

  list.replaceChildren(
    ...newestFirst.map((publication) => {
      const article = document.createElement("article");
      const details = document.createElement("div");
      const title = document.createElement("h3");
      const titleLink = document.createElement("a");
      const authors = document.createElement("p");
      const venue = document.createElement("p");
      const year = document.createElement("span");

      article.className = "publication";
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
    }),
  );
}

function renderContact(contact) {
  const links = document.querySelector("#contact-links");
  if (!links) return;
  links.replaceChildren(...contact.links.map((link) => renderButton(link)));
}

async function renderSiteContent() {
  try {
    const [profile, news, projects, publications, contact] = await Promise.all([
      loadJson(contentFiles.profile),
      loadJson(contentFiles.news),
      loadJson(contentFiles.projects),
      loadJson(contentFiles.publications),
      loadJson(contentFiles.contact),
    ]);

    renderProfile(profile);
    renderNews(news);
    renderProjects(projects);
    renderPublications(publications);
    renderContact(contact);
  } catch (error) {
    document.documentElement.dataset.contentLoad = "failed";
    console.error(error);
  }
}

renderSiteContent();
