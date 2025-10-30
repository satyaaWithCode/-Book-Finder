



import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { coverUrl } from "../lib/api";

export default function BookModal({ book, onClose }) {
  const closeBtnRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!book) return;
    lastFocused.current = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      try {
        lastFocused.current?.focus?.();
      } catch {}
    };
  }, [book, onClose]);

  if (!book) return null;

  const cover = coverUrl(book.cover_i, "L") || "https://via.placeholder.com/240x360?text=No+Cover";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onClose?.()} />
      <div className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="w-full md:w-40 flex-shrink-0">
            <img
              src={cover}
              alt={`${book.title} cover`}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{book.title}</h3>
                {book.subtitle && <div className="text-sm text-slate-500 mt-1">{book.subtitle}</div>}
                <div className="text-xs text-slate-500 mt-2">
                  {(book.author_name || []).slice(0, 4).join(", ") || "Unknown author"}
                </div>
              </div>

              <button
                ref={closeBtnRef}
                onClick={() => onClose?.()}
                aria-label="Close"
                className="ml-2 p-2 rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <div><span className="font-medium">First published:</span> {book.first_publish_year || "—"}</div>
              <div><span className="font-medium">Editions:</span> {book.edition_count || 0}</div>
              {book.isbn?.length > 0 && <div><span className="font-medium">ISBN:</span> {book.isbn.slice(0, 6).join(", ")}</div>}
              {book.subject?.length > 0 && <div><span className="font-medium">Subjects:</span> {book.subject.slice(0, 8).join(", ")}</div>}
            </div>

            <div className="mt-6 flex gap-3">
              <a
                className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm"
                href={`https://openlibrary.org${book.key || ""}`}
                target="_blank"
                rel="noreferrer"
              >
                View on OpenLibrary
              </a>
              <button onClick={() => onClose?.()} className="px-4 py-2 rounded-full border text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
