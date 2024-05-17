import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

import "./loading-spinner.scss";

type LoadingSpinnerProps = {
  loading: boolean;
  children?: ReactNode;
};

export const LoadingSpinner = ({ loading }: LoadingSpinnerProps) => {
  return (
    <div className="spinner-container">
      <ClipLoader
        color="#ffffffd6"
        loading={loading}
        size={150}
        cssOverride={{ borderWidth: "4px" }}
      />
    </div>
  );
};
