# Content Files

Edit these files to update the website content without touching `index.html`.

## `profile.json`

Controls the top section:

- role line
- name
- bio paragraphs
- Google Scholar / KTH profile buttons
- portrait path and caption

The `bio` values may contain simple HTML links.

## `news.json`

Controls the recent updates timeline. Add a new object to the top of the list:

```json
{
  "date": "2026-06-11",
  "label": "2026-06-11",
  "text": "Short update text."
}
```

## `projects.json`

Controls the current work cards. Each item has:

- `number`
- `title`
- `text`

## `publications.json`

Controls the selected publication cards. Each item has:

- `title`
- `authors`
- `venue`
- `year`
- `url`

## `contact.json`

Controls the buttons in the contact section. Use `primary` for the main button
and `secondary` for supporting links.
