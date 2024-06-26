import { useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Selects.module.css";
import CheckIcon from "../Icon/CheckIcon.jsx";
import UncheckIcon from "../Icon/UncheckIcon.jsx";
import ArrowUpIcon from "../Icon/ArrowUpIcon.jsx";
import ArrowDownIcon from "../Icon/ArrowDownIcon.jsx";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../../hooks/useClickOutside";

const Checkbox = ({ value, checked, onChange, name }) => {
  return (
    <>
      <input
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      {checked ? <CheckIcon /> : <UncheckIcon />}
    </>
  );
};

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder,
  error,
  name,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ref = useRef(null);
  const toggleOption = (optionId) => {
    const updatedOptions = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];
    onChange(updatedOptions);
  };

  const getOptionNames = () => {
    return value.map(
      (optionId) =>
        options.find((option) => option.id === optionId)?.title || ""
    );
  };
  const selectedOptions = getOptionNames();
  const remainingCount =
    selectedOptions.length > 3 ? selectedOptions.length - 3 : 0;
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClearAll = () => {
    const newSelectedOptions =
      value.length === options.length ? [] : options.map((option) => option.id);
    onChange(newSelectedOptions);
  };
  useClickOutside(ref, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div ref={ref}>
      <input type="hidden" name={`${name}-all`} value={value.join(",")} />
      <div className={clsx(styles.root, { [styles.error]: error })}>
        <button
          type="button"
          onClick={handleDropdownToggle}
          className={clsx(styles.field, {
            [styles.closed]: !isDropdownOpen,
          })}
        >
          <span>
            {selectedOptions.length > 0
              ? selectedOptions.length <= 3
                ? selectedOptions.join(", ")
                : `${selectedOptions
                    .slice(0, 3)
                    .join(", ")}, +${remainingCount}`
              : placeholder}
          </span>
          {isDropdownOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </button>
        <CSSTransition
          in={isDropdownOpen}
          timeout={300}
          classNames={styles}
          mountOnEnter
          unmountOnExit
        >
          <div className={clsx(styles.dropdown, { [styles.error]: error })}>
            <button
              type="button"
              onClick={handleClearAll}
              className={styles.clearButton}
            >
              {value.length >= options.length ? <CheckIcon /> : <UncheckIcon />}
              <span>All</span>
            </button>
            {options.map((option) => (
              <label key={option.id} className={styles.checkbox}>
                <Checkbox
                  name={`${name}-all`}
                  value={option.id.toString()}
                  checked={value.includes(option.id)}
                  onChange={() => toggleOption(option.id)}
                />
                <span>{option.title}</span>
              </label>
            ))}
          </div>
        </CSSTransition>
      </div>
      {error && <div style={{ color: "red", fontSize: "11px" }}>{error}</div>}
    </div>
  );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default MultiSelect;
