import React, { useState } from "react";
import style from "./Home.module.css";
import herobg from "../assets/images/herobg.png";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [backendWarning, setBackendWarning] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setBackendWarning("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/laws/search?q=${encodeURIComponent(keyword)}`,
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("MongoDB Search Results Object:", data);

      if (data && data.success && Array.isArray(data.data)) {
        setResults(data.data);
      } else if (data && Array.isArray(data.laws)) {
        setResults(data.laws);
      } else if (data && Array.isArray(data.results)) {
        setResults(data.results);
      } else if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
        setBackendWarning(
          "The backend responded successfully but forgot to attach the database rows array! Check your backend res.json() structure.",
        );
      }
    } catch (error) {
      console.error("Backend connection failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.pageWrapper}>
      {/* 1. Main Hero Container */}
      <div className={style.heroContainer}>
        {/* Top Centered Content Block */}
        <div className={style.heroTopContent}>
          <h1 className={style.heroHeading}>
            Welcome to <br />
            <span className={style.justiceText}>Justice</span>
            <span className={style.blueText}>Ease</span>
          </h1>

          <p className={style.heroDescription}>
            Making the law simple for everyone. Search, explore, and understand
            legal information easily using everyday words with confidence.
          </p>

          <div className={style.quoteWrapper}>
            <div className={style.quoteLine}></div>
            <blockquote className={style.heroQuote}>
              "To know your rights is to possess a shield; to understand them is
              to carry a sword."
            </blockquote>
            <div className={style.quoteLine}></div>
          </div>

          <div className={style.sectionHeaderArea}>
            <h2 className={style.exploreHeading}>Explore the Law</h2>
            <div className={style.headingDivider}></div>
          </div>
        </div>

        {/* Bottom Interactive Row */}
        <div className={style.heroBottomRow}>
          <div className={style.searchFormWrapper}>
            <form onSubmit={handleSearchSubmit} className={style.searchForm}>
              <div className={style.searchContainer}>
                <input
                  type="text"
                  placeholder="Search laws or keywords..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className={style.searchInput}
                />
                <button
                  type="submit"
                  className={style.searchButton}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </form>
          </div>

          <div className={style.heroImageWrapper}>
            <img
              src={herobg}
              alt="Hero Background"
              className={style.heroImage}
            />
          </div>
        </div>
      </div>

      {hasSearched && (
        <div className={style.resultsSection}>
          <div className={style.resultsContentWrapper}>
            <h3 className={style.resultsHeading}>
              Search Results ({Array.isArray(results) ? results.length : 0}{" "}
              found)
            </h3>

            {backendWarning && (
              <div
                style={{
                  color: "#d9534f",
                  margin: "10px 0",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                }}
              >
                ⚠️ {backendWarning}
              </div>
            )}

            {(!results || results.length === 0) &&
              !loading &&
              !backendWarning && (
                <p className={style.noResultsText}>
                  No legal provisions matched your search criteria.
                </p>
              )}

            <div className={style.resultsGrid}>
              {Array.isArray(results) &&
                results.map((law) => (
                  <div key={law._id} className={style.lawCard}>
                    <div className={style.lawCardHeader}>
                      {/* Added a dynamic space split to cleanly separate Chapter string names */}
                      <span className={style.lawChapter}>
                        {law.chapter
                          ? law.chapter.replace("CHAPTER", "Chapter ")
                          : "General"}
                      </span>
                      <span className={style.lawSection}>
                        Section {law.sectionNumber}
                      </span>
                    </div>
                    <h4>{law.title}</h4>
                    <p>
                      {law.description ||
                        "Detailed documentation pending text sync."}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div className={style.sectionsPanel}>
        <div className={style.gridContentWrapper}>
          <h3 className={style.topicsHeading}>Searchable Legal Topics</h3>

          <div className={style.compactRow}>
            <div className={style.miniCard}>
              <h4>Offences Against the State</h4>
              <p>Security, war, and national symbols.</p>
            </div>
            <div className={style.miniCard}>
              <h4>Principles & Punishments</h4>
              <p>Baseline rules and judicial sentences.</p>
            </div>
            <div className={style.miniCard}>
              <h4>Public Order & Security</h4>
              <p>Tranquility, safety, and harmony.</p>
            </div>
          </div>
          <div className={style.compactRow}>
            <div className={style.miniCard}>
              <h4>Offences Against the Body</h4>
              <p>Violent crimes, assault, and hurt.</p>
            </div>
            <div className={style.miniCard}>
              <h4>Offences Against Property</h4>
              <p>Theft, robbery, and economic fraud.</p>
            </div>
            <div className={style.miniCard}>
              <h4>Preliminary Liability</h4>
              <p>Conspiracies and failed attempts.</p>
            </div>
          </div>
        </div>

        <footer className={style.footer}>
          <div className={style.footerContent}>
            <div className={style.footerBrand}>
              <h3>
                Justice<span>Ease</span>
              </h3>
            </div>
            <div className={style.footerRight}>
              <a href="#contact" className={style.contactLink}>
                Contact Support
              </a>
              <p className={style.copyright}>
                &copy; {new Date().getFullYear()} JusticeEase. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
