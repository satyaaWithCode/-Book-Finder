

// // src/App.jsx
// import React, { useEffect, useState, useCallback } from "react";
// import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
// import SearchBar from "./components/SearchBar";
// import BookGrid from "./components/BookGrid";
// import BookModal from "./components/BookModal";
// import { fetchBooksByTitle } from "./lib/api";

// function Pagination({ page, totalPages, onChange }) {
//   const visible = 5;
//   const half = Math.floor(visible / 2);
//   let start = Math.max(1, page - half);
//   let end = Math.min(totalPages, page + half);

//   if (end - start + 1 < visible) {
//     if (start === 1) end = Math.min(totalPages, start + visible - 1);
//     else if (end === totalPages) start = Math.max(1, end - visible + 1);
//   }

//   const pages = [];
//   for (let p = start; p <= end; p++) pages.push(p);

//   return (
//     <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 text-xs sm:text-sm">
//       <button onClick={() => onChange(1)} disabled={page === 1} className="px-2 py-1 rounded-md bg-white/10 disabled:opacity-40">«</button>
//       <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1} className="px-2 py-1 rounded-md bg-white/10 disabled:opacity-40">
//         <HiOutlineChevronLeft className="w-4 h-4" />
//       </button>

//       {pages.map((p) => (
//         <button
//           key={p}
//           onClick={() => onChange(p)}
//           className={`px-3 py-1 rounded-md ${
//             p === page ? "bg-sky-600 text-white" : "bg-white/10 hover:bg-white/20 text-white/70"
//           }`}
//         >
//           {p}
//         </button>
//       ))}

//       <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} className="px-2 py-1 rounded-md bg-white/10 disabled:opacity-40">
//         <HiOutlineChevronRight className="w-4 h-4" />
//       </button>
//       <button onClick={() => onChange(totalPages)} disabled={page >= totalPages} className="px-2 py-1 rounded-md bg-white/10 disabled:opacity-40">»</button>
//     </div>
//   );
// }

// export default function App() {
//   // ✅ Always start in dark mode (black theme)
//   const [isDark, setIsDark] = useState(true);

//   const [query, setQuery] = useState("harry potter");
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selected, setSelected] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem("bf_recent") || "[]"));
//   const perPage = 20;

//   // Optional: you can still store theme if you want toggle to persist
//   useEffect(() => localStorage.setItem("bf_theme", isDark ? "dark" : "light"), [isDark]);

//   const handleSearch = useCallback((q) => {
//     setQuery(q || "");
//     setPage(1);
//   }, []);

//   useEffect(() => {
//     let cancel = false;
//     async function load() {
//       if (!query) return setBooks([]);
//       setLoading(true);
//       setError("");
//       try {
//         const { results, numFound } = await fetchBooksByTitle(query, { page, perPage });
//         if (!cancel) {
//           setBooks(results);
//           setTotalResults(numFound);
//         }
//       } catch {
//         if (!cancel) setError("Failed to fetch results. Try again.");
//       } finally {
//         if (!cancel) setLoading(false);
//       }
//     }
//     load();
//     return () => (cancel = true);
//   }, [query, page]);

//   const totalPages = Math.max(1, Math.ceil((totalResults || books.length) / perPage));

//   const rootBgClass = isDark
//     ? "bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#2b0d3b]"
//     : "bg-gradient-to-br from-white via-slate-100 to-slate-50";
//   const textRootClass = isDark ? "text-white" : "text-slate-900";

//   return (
//     <div className={`${rootBgClass} min-h-screen overflow-x-hidden`}>
//       {/* Header */}
//       <header className={`w-full ${isDark ? "bg-[#12182a]" : "bg-slate-800"} border-b border-white/10 shadow-sm`}>
//         <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between flex-wrap gap-4">
//           <div className="flex items-center gap-3">
//             <div className="text-2xl font-extrabold text-white">
//               BOOKS<span className="text-yellow-400">✦</span>FINDER
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Theme toggle */}
//             <button
//               onClick={() => setIsDark((s) => !s)}
//               className={`relative w-14 h-8 rounded-full p-1 transition-all duration-500 ${
//                 isDark
//                   ? "bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-md"
//                   : "bg-white/90 border border-slate-300"
//               } hidden sm:block`}
//             >
//               <span
//                 className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-500 ${
//                   isDark ? "translate-x-6" : "translate-x-0"
//                 }`}
//               />
//             </button>

//             <a
//               href="#books"
//               className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold shadow-md hover:scale-105 transition"
//             >
//               BOOKS FINDER
//             </a>
//           </div>
//         </div>
//       </header>

//       {/* Search area */}
//       <div className={`max-w-3xl mx-auto px-4 sm:px-6 pt-10 ${textRootClass}`}>
//         <SearchBar initial={query} loading={loading} onSearch={handleSearch} />
//         {recent.length > 0 && (
//           <div className="mt-4 flex flex-wrap justify-center gap-2">
//             {recent.map((r) => (
//               <button
//                 key={r}
//                 onClick={() => {
//                   setQuery(r);
//                   setPage(1);
//                 }}
//                 className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs hover:bg-slate-300 transition"
//               >
//                 {r}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Main content */}
//       <main className={`max-w-6xl mx-auto px-4 sm:px-6 py-8 ${textRootClass}`}>
//         <div className="rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h2 className="text-lg font-semibold">Results</h2>
//               <p className="text-sm text-white/70">
//                 Showing results for <span className="font-medium">{query || "—"}</span>
//               </p>
//             </div>
//             <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//           </div>

//           {error && (
//             <div className="mt-4 p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 flex items-center justify-between">
//               <div>{error}</div>
//               <button
//                 onClick={() => {
//                   setError("");
//                   setPage(1);
//                   setQuery((q) => q);
//                 }}
//                 className="ml-4 px-3 py-1 rounded bg-rose-600 text-white text-sm"
//               >
//                 Retry
//               </button>
//             </div>
//           )}

//           <div className="mt-6">
//             <BookGrid books={books} loading={loading} onSelect={(b) => setSelected(b)} />
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative w-full mt-10 border-t border-white/10 bg-gradient-to-t from-[#0b1220] via-[#111827] to-transparent text-center text-white">
//         <div className="max-w-6xl mx-auto px-6 py-8">
//           <a
//             href="https://www.linkedin.com/in/satyabrata-behera-2993012b2"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 mb-3 hover:scale-105 transition"
//           >
//             <span className="text-lg font-extrabold">BF</span>
//           </a>
//           <h2 className="text-xl font-bold">
//             BOOKS<span className="text-yellow-400">✦</span>FINDER
//           </h2>
//           <p className="mt-2 text-sm text-white/80">
//             📞{" "}
//             <a href="tel:+917606949967" className="hover:text-cyan-400">
//               +91 7606949967
//             </a>
//           </p>
//           <div className="flex justify-center gap-4 mt-4">
//             <a
//               href="https://github.com/satyaaWithCode"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 rounded-full bg-white/10 hover:bg-white/20"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
//                 <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.24..." />
//               </svg>
//             </a>
//           </div>
//           <p className="mt-4 text-xs text-white/60">
//             © {new Date().getFullYear()} • Created by{" "}
//             <span className="text-cyan-400 font-medium">Satyabrata Behera</span>
//           </p>
//         </div>
//       </footer>

//       <BookModal book={selected} onClose={() => setSelected(null)} />
//     </div>
//   );
// }




// src/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";
import BookModal from "./components/BookModal";
import { fetchBooksByTitle } from "./lib/api";

function Pagination({ page, totalPages, onChange, isDark }) {
  const visible = 5;
  const half = Math.floor(visible / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, page + half);

  if (end - start + 1 < visible) {
    if (start === 1) end = Math.min(totalPages, start + visible - 1);
    else if (end === totalPages) start = Math.max(1, end - visible + 1);
  }

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const baseBtn =
    "px-3 py-1 rounded-md transition text-sm focus:outline-none shadow-sm";
  const inactiveBtn = isDark ? "bg-white/10 text-white/60 hover:bg-white/20" : "bg-slate-100 text-slate-800 hover:bg-slate-200";
  const activeBtn = isDark ? "bg-sky-600 text-white" : "bg-sky-600 text-white";

  return (
    <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 text-xs sm:text-sm">
      <button
        onClick={() => onChange(1)}
        disabled={page === 1}
        className={`${baseBtn} ${inactiveBtn} disabled:opacity-40`}
      >
        «
      </button>

      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`${baseBtn} ${inactiveBtn} disabled:opacity-40`}
      >
        <HiOutlineChevronLeft className="w-4 h-4 inline" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`${baseBtn} ${p === page ? activeBtn : inactiveBtn}`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className={`${baseBtn} ${inactiveBtn} disabled:opacity-40`}
      >
        <HiOutlineChevronRight className="w-4 h-4 inline" />
      </button>

      <button
        onClick={() => onChange(totalPages)}
        disabled={page >= totalPages}
        className={`${baseBtn} ${inactiveBtn} disabled:opacity-40`}
      >
        »
      </button>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("bf_theme") === "dark" || true); // default dark
  const [query, setQuery] = useState("harry potter");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem("bf_recent") || "[]"));
  const perPage = 20;

  useEffect(() => localStorage.setItem("bf_theme", isDark ? "dark" : "light"), [isDark]);

  const handleSearch = useCallback((q) => {
    setQuery(q || "");
    setPage(1);

    // update recent searches
    if (q && q.trim()) {
      setRecent((r) => {
        const unique = [q, ...r.filter((x) => x !== q)].slice(0, 8);
        localStorage.setItem("bf_recent", JSON.stringify(unique));
        return unique;
      });
    }
  }, []);

  useEffect(() => {
    let cancel = false;
    async function load() {
      if (!query) return setBooks([]);
      setLoading(true);
      setError("");
      try {
        const { results, numFound } = await fetchBooksByTitle(query, { page, perPage });
        if (!cancel) {
          setBooks(results);
          setTotalResults(numFound);
        }
      } catch {
        if (!cancel) setError("Failed to fetch results. Try again.");
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    load();
    return () => (cancel = true);
  }, [query, page]);

  const totalPages = Math.max(1, Math.ceil((totalResults || books.length) / perPage));

  const rootBgClass = isDark
    ? "bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#2b0d3b]"
    : "bg-gradient-to-br from-white via-slate-100 to-slate-50";
  const textRootClass = isDark ? "text-white" : "text-slate-900";

  return (
    <div className={`${rootBgClass} min-h-screen overflow-x-hidden`}>
      {/* Header */}
      <header className={`w-full ${isDark ? "bg-[#12182a]" : "bg-slate-800"} border-b border-white/10 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-white">
              BOOKS<span className="text-yellow-400">✦</span>FINDER
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme toggle - visible on all sizes now */}
            <button
              onClick={() => setIsDark((s) => !s)}
              className={`relative w-14 h-8 rounded-full p-1 transition-all duration-500 ${
                isDark ? "bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-md" : "bg-white/90 border border-slate-300"
              }`}
              aria-label="Toggle theme"
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-500 ${
                  isDark ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <a
              href="#books"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold shadow-md hover:scale-105 transition"
            >
              BOOKS FINDER
            </a>
          </div>
        </div>
      </header>

      {/* Search area */}
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 pt-10 ${textRootClass}`}>
        <SearchBar initial={query} loading={loading} onSearch={handleSearch} />
        {recent.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {recent.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setQuery(r);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-full text-xs hover:scale-105 transition ${
                  isDark ? "bg-white/10 text-white/90 hover:bg-white/20" : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <main className={`max-w-6xl mx-auto px-4 sm:px-6 py-8 ${textRootClass}`}>
        {/* Border now adapts to theme so it is visible in light mode */}
        <div
          className={`rounded-2xl p-4 sm:p-6 md:p-8 border ${isDark ? "border-white/5" : "border-slate-200"}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Results</h2>
              <p className={`${isDark ? "text-white/70" : "text-slate-600"} text-sm`}>
                Showing results for <span className="font-medium">{query || "—"}</span>
              </p>
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={setPage} isDark={isDark} />
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 flex items-center justify-between">
              <div>{error}</div>
              <button
                onClick={() => {
                  setError("");
                  setPage(1);
                }}
                className="ml-4 px-3 py-1 rounded bg-rose-600 text-white text-sm"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mt-6">
            <BookGrid books={books} loading={loading} onSelect={(b) => setSelected(b)} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative w-full mt-10 border-t border-white/10 bg-gradient-to-t from-[#0b1220] via-[#111827] to-transparent text-center text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <a
            href="https://www.linkedin.com/in/satyabrata-behera-2993012b2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 mb-3 hover:scale-105 transition"
          >
            <span className="text-lg font-extrabold">BF</span>
          </a>
          <h2 className="text-xl font-bold">
            BOOKS<span className="text-yellow-400">✦</span>FINDER
          </h2>
          <p className="mt-2 text-sm text-white/80">
            📞{" "}
            <a href="tel:+917606949967" className="hover:text-cyan-400">
              +91 7606949967
            </a>
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com/satyaaWithCode"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.24..." />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-xs text-white/60">
            © {new Date().getFullYear()} • Created by{" "}
            <span className="text-cyan-400 font-medium">Satyabrata Behera</span>
          </p>
        </div>
      </footer>

      <BookModal book={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
