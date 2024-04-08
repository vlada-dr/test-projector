import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Selects.module.css";
import ArrowDownIcon from "../Icon/ArrowDownIcon.jsx";
import ArrowUpIcon from "../Icon/ArrowUpIcon.jsx";

const Select = ({
  options,
  error,
  value,
  onChange,
  name,
  placeholder = "Placeholder",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (optionId) => {
    setIsOpen(false);
    const newValue = value === optionId ? null : optionId;
    onChange(newValue);
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <input type="hidden" name={name} value={value || ""} />
      <div className={clsx(styles.root)}>
        <button
          type="button"
          onClick={toggleDropdown}
          className={clsx(styles.field, { [styles.error]: error })}
          aria-expanded={isOpen}
        >
          {value
            ? options.find((option) => option.value === value)?.label || ""
            : placeholder}
          {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>

        {isOpen && (
          <div className={styles.dropdown} aria-hidden={!isOpen}>
            {options.map((options) => (
              <button
                key={options.value}
                type="button"
                className={clsx(styles.checkbox, {
                  [styles.selected]: value === options.value,
                })}
                onClick={() => handleOptionChange(options.value)}
              >
                <span>{options.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <div style={{ color: "red", fontSize: "11px" }}>{error}</div>}
    </>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Select;