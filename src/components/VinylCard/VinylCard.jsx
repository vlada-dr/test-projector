import PropTypes from "prop-types";
import styles from "./VinylCard.module.css";
import CollectionButton from "../CollectionButton/CollectionButton.jsx";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";
import { Link } from "react-router-dom";

function VinylCard({
  card,
  inCollection,
  inFavorites,
  onClickInCollection,
  onClickInFavorites,
}) {
  const { id, title, artist, year, country, genre, image } = card;

  const roundedDecade = Math.floor(year / 10) * 10;

  return (
    <div key={id} className={styles.block}>
      <div className={styles.image}>
        <picture>
          <img src={image} title={title} alt={title} />
        </picture>
        <FavoriteButton
          inFavorites={inFavorites}
          isFill={inFavorites}
          onClick={() => {
            onClickInFavorites(card.id);
          }}
        />
      </div>
      <Link to={`/vinyls/${id}`}>
        <h2 className={styles.name}>{title}</h2>
      </Link>

      <Link className={styles.group} to={`/results?artist=${artist}`}>
        {artist}
      </Link>
      <div className={styles.info}>
        <p>
          Year:
          <Link className={styles.link} to={`/results?decade=${roundedDecade}`}>
            {year}
          </Link>
        </p>
        <p>
          Genre:
          <Link className={styles.link} to={`/results?genres=${genre.id}`}>
            {genre.title}
          </Link>
        </p>
        <p>
          Country:
          <Link className={styles.link} to={`/results?country=${country.id}`}>
            {country.title}
          </Link>
        </p>
      </div>
      <CollectionButton
        className={styles.root}
        isActive={inCollection}
        onClick={() => {
          onClickInCollection(card.id);
        }}
      />
    </div>
  );
}

VinylCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    genre: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  inCollection: PropTypes.bool.isRequired,
  inFavorites: PropTypes.bool.isRequired,
  onClickInCollection: PropTypes.func.isRequired,
  onClickInFavorites: PropTypes.func.isRequired,
};

export default VinylCard;