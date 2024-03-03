import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./card.module.css";

function Card({
  card,
  inCollection,
  inFavorites,
  handleClickInCollection,
  handleClickInFavorites,
}) {
  const { id, title, artist, year, country, genreId, image } = card;

  const handleCollectionClick = () => {
    handleClickInCollection(card);
  };

  const handleFavoritesClick = () => {
    handleClickInFavorites(card);
  };

  return (
    <div key={id} className={styles["item-block"]}>
      <div className={styles["item-block__image"]}>
        <picture>
          <source srcSet={image.normal + " 1x, " + image.double + " 2x"} />
          <img src={image.normal} title={title} alt={title} />
        </picture>
        <div
          className={clsx(styles["item-block__fav"], {
            [styles.active]: inFavorites,
          })}
          onClick={handleFavoritesClick}
          aria-hidden="true"
        >
          {inFavorites ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
            >
              <path
                d="M16 4.99679C16 9.53232 8 14.3588 8 14.3588C8 14.3588 0 9.53232 0 4.99679C0 -1.16133 8 -1.07817 8 4.34158C8 -1.07817 16 -0.997101 16 4.99679Z"
                fill="#FF4500"
              />
            </svg>
          ) : (
            <svg
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 4.6617C14 8.21672 7.5 11.9998 7.5 11.9998C7.5 11.9998 1 8.21672 1 4.6617C1 -0.165119 7.5 -0.0999381 7.5 4.14814C7.5 -0.0999381 14 -0.0363918 14 4.6617Z"
                stroke="black"
                strokeWidth="1.10308"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <h2 className={styles["item-block__name"]}>{title}</h2>
      <p className={styles["item-block__group"]}>{artist}</p>
      <div className={styles["item-block__info"]}>
        <p>
          Year: <span>{year}</span>
        </p>
        <p>
          Genre: <span>{genreId}</span>
        </p>
        <p>
          Country: <span>{country}</span>
        </p>
      </div>
      <button
        className={clsx("btn", inCollection ? "btn-collection" : "btn-add")}
        onClick={handleCollectionClick}
      >
        <span>{inCollection ? "In collection" : "Add"}</span>
      </button>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    genreId: PropTypes.number.isRequired,
    image: PropTypes.shape({
      normal: PropTypes.string.isRequired,
      double: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  inCollection: PropTypes.bool.isRequired,
  inFavorites: PropTypes.bool.isRequired,
  handleClickInCollection: PropTypes.func.isRequired,
  handleClickInFavorites: PropTypes.func.isRequired,
};

export default Card;
