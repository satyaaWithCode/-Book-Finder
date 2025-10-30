

// src/lib/api.js
const OPENLIB_BASE = "https://openlibrary.org";

/**
 * Fetch books by title using Open Library Search API.
 * Returns { results: [...], numFound: number }.
 * Uses OpenLibrary 'page' param (1-based). perPage is requested via 'limit' (OpenLibrary may ignore large values).
 */
export async function fetchBooksByTitle(title, { page = 1, perPage = 20 } = {}) {
  const q = String(title || "").trim();
  if (!q) return { results: [], numFound: 0 };

  const encoded = encodeURIComponent(q);
  // Use page param (OpenLibrary expects 1-based pages). Include limit for requested page size.
  // Add a tiny cache-busting timestamp while debugging to avoid stale cached responses in the browser or proxies.
  const url = `${OPENLIB_BASE}/search.json?title=${encoded}&page=${Number(page)}&limit=${Number(perPage)}&_=${Date.now()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OpenLibrary fetch failed: ${res.status}`);
  }
  const data = await res.json();

  const mapped = (data?.docs || []).map((doc) => ({
    key: doc.key || doc.cover_edition_key || (doc.edition_key && doc.edition_key[0]) || doc.title,
    title: doc.title,
    subtitle: doc.subtitle,
    author_name: doc.author_name || [],
    first_publish_year: doc.first_publish_year,
    cover_i: doc.cover_i, // numeric id for cover API
    isbn: doc.isbn || [],
    edition_count: doc.edition_count || 0,
    subject: doc.subject || []
  }));

  return { results: mapped, numFound: data.numFound || 0 };
}

/** get cover URL */
export function coverUrl(cover_i, size = "M") {
  if (!cover_i) return null;
  return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
}
