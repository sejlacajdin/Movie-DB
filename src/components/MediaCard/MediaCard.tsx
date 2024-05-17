import { DateTime } from "luxon";

import PlaceholderImage from "../../assets/placeholder-image.svg";
import { posterSize } from "../../constants/imageSizes";
import { Media } from "../../types/media";
import { createMediaLink } from "../../utils/createMediaLink";
import "./mediaCard.scss";

interface Props {
  item: Media;
  onClick: () => void;
}

const MediaCard = ({ item, onClick }: Props) => {
  const release_date = item.release_date ?? item.first_air_date ?? "";

  return (
    <div className="media-card" onClick={onClick}>
      <img
        src={
          item.poster_path
            ? createMediaLink(item.poster_path, posterSize)
            : PlaceholderImage
        }
      />
      <p className="media-card__title">{item.title ?? item.name}</p>
      <p className="media-card__date">
        {DateTime.fromISO(release_date).toFormat("MMMM dd, yyyy")}
      </p>
      {item.vote_average ? (
        <div className="media-card__vote">{item.vote_average.toFixed(1)}</div>
      ) : (
        <></>
      )}
      <div></div>
    </div>
  );
};

export default MediaCard;
