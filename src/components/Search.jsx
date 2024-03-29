import { useEffect, useRef } from "react";

//import { useState } from "react";
function Search({ query, setQuery }) {
  const inputEl = useRef(null); //step1-create the ref and initialize it name after the dom element u wwant to select
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Enter") {
          inputEl.current.focus(); // step-3
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);

      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl} //step2-place the ref in the dom element
      />
    </>
  );
}

export default Search;
