import ArrowLeft from "../../assets/icon-left.png";
import "./backButton.scss";

interface Prop {
  onClick: () => void;
}

const BackButton = ({ onClick }: Prop) => {
  return (
    <div className="back-button" onClick={onClick}>
      <img src={ArrowLeft} alt="arrow left" />
      <span>Back</span>
    </div>
  );
};

export default BackButton;
