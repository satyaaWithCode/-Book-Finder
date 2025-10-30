


// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";

export default function SearchBar({ initial = "", onSearch, loading = false }) {
  const [value, setValue] = useState(initial);
  const [isTyping, setIsTyping] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);

    if (value.trim() === "") {
      onSearch?.("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    timer.current = setTimeout(() => {
      onSearch?.(value.trim());
      setIsTyping(false);
    }, 600);

    return () => clearTimeout(timer.current);
  }, [value, onSearch]);

  const handleSearch = () => {
    const trimmed = value.trim();
    onSearch?.(trimmed);
    setIsTyping(false);
  };

  const showSpinner = isTyping || loading;

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      {/* Soft glow fixed inside */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[95%] sm:w-full h-12 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-fuchsia-400 blur-md opacity-30"></div>
      </div>

      {/* Search input container */}
      <div className="relative bg-white/90 backdrop-blur-md border border-slate-200 shadow-md hover:shadow-lg transition-all rounded-full flex items-center gap-2 pl-4 pr-2 py-1 sm:py-2 w-full overflow-hidden">
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-sky-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>

        {/* Input */}
        <input
          className="flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm sm:text-base py-2 truncate"
          placeholder="Search books by title, author, or keyword..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          aria-label="Search books"
        />

        {/* Button */}
        <button
          onClick={handleSearch}
          disabled={showSpinner}
          className={`relative flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2 text-sm font-medium rounded-full shadow-md transition-all whitespace-nowrap ${
            showSpinner
              ? "bg-sky-400 cursor-wait opacity-90 text-white"
              : "text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 hover:shadow-lg"
          }`}
        >
          {showSpinner ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="hidden sm:inline">Searching...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Subtext (static size to prevent layout shift) */}
      <div className="mt-2 text-center text-xs sm:text-sm text-slate-500 h-5 sm:h-6 flex items-center justify-center">
        {loading ? (
          <span className="text-sky-500 animate-pulse">Fetching results...</span>
        ) : isTyping ? (
          <span className="text-sky-400 animate-pulse">Typing...</span>
        ) : (
          <>💡 Try searching by author name or partial title</>
        )}
      </div>
    </div>
  );
}
