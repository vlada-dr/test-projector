import { motion } from "framer-motion";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./VinylNote.module.css";
import PenIcon from "../../Icon/PenIcon";

import { useNoteById } from "../../../hooks/useNoteById";

export function VinylNote({ variant, id, title, artist }) {
  const { note, changeNoteById } = useNoteById(id);

  return (
    <div
      className={clsx(
        styles.notes,
        variant === "primary" ? styles.notesPrimary : styles.notesSecondary
      )}
    >
      <div className={styles.titleNotes}>
        <div className={styles.textNotes}>Add a note</div>
        <div className={styles.icon}>
          <PenIcon />
        </div>
      </div>
      <motion.textarea
        whileHover={{
          borderColor: ["var(--dark-blue)", "var(--dark-blue)"],
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        whileFocus={{
          borderColor: "var(--dark-blue)",
          backgroundColor: "var(--white)",
          color: "var(--dark-blue)",
        }}
        initial={{
          borderColor: "var(--grey-border)",
          backgroundColor: "transparent",
          color: "var(--grey)",
          resize: "none",
          scrollbarWidth: "none",
        }}
        className={styles.placeholder}
        onChange={(e) => {
          changeNoteById(e.target.value);
        }}
        value={note || ""}
        placeholder={`Add note to ${title} by ${artist}`}
      ></motion.textarea>
    </div>
  );
}

VinylNote.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};
