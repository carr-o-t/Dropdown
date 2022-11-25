import { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";

export function Select({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("")
  const inputRef = useRef(null);
  
  const filteredOptions = options.filter((option) => {
    return option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });

  function clearOptions() {
    value.forEach((v) => options.push(v));
    onChange([]);
    setQuery("")
  }

  function selectOption(option) {
    onChange([...value, option]);
    options.splice(
      options.findIndex((a) => a.label === option.label),
      1
    );
    setIsOpen(false);
  }

  function addToOptions(option) {
    options.push(option);
    onChange(value.filter((o) => o.label !== option.label));
  }
  
  function handleKeyDown(e) {
    if (e.keyCode === 38 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1)
    }
    else if (e.keyCode === 38 && activeIndex === 0) {
      setActiveIndex(filteredOptions.length - 1);
    }
    else if (e.keyCode === 40 && activeIndex < filteredOptions.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
      else if (e.keyCode === 40 && activeIndex === filteredOptions.length - 1) {
        setActiveIndex(0);
      } else if (e.keyCode === 13) {
      selectOption(filteredOptions[activeIndex]);
      setQuery("");
      }
  }

    useEffect(() => {
      if (isOpen) setActiveIndex(0);
    }, [isOpen]);

  return (
    <>
      <div
        tabIndex={0}
        className={styles.container}
        onClick={(e) => {
          inputRef.current.focus();
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <div className={styles.left}>
          {value?.length >= 1
            ? value?.map((v) => {
                return (
                  <span
                    key={v.hex}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={styles.value}
                    style={{
                      color: v.hex,
                      backgroundColor: v.hex + "5e",
                    }}
                  >
                    {v.label}
                    <button
                      className={styles["remove-btn"]}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToOptions(v);
                      }}
                    >
                      &times;
                    </button>
                  </span>
                );
              })
            : ""}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className={styles.input}
            style={{ width: query.length + "ch" }}
          />
        </div>
        <div className={styles.right}>
          <button
            className={styles["clear-btn"]}
            onClick={(e) => {
              e.stopPropagation();
              clearOptions();
            }}
          >
            &times;
          </button>
          <div className={styles.divider}></div>
          <div tabIndex={1} className={styles["arrow-down"]}></div>
        </div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {filteredOptions.length === 0
            ? "empty"
            : filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={`${styles.option} `}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(option);
                    console.log(option);
                  }}
                  style={{
                    color: option.hex,
                    backgroundColor: `${
                      index === activeIndex ? option.hex + "5e" : ""
                    }`,
                    boxShadow: `${
                      index === activeIndex
                        ? "0.6px 0 5px" + option.hex + "5e"
                        : ""
                    }`,
                  }}
                >
                  {option.label}
                </li>
              ))}
        </ul>
      </div>
    </>
  );
}
