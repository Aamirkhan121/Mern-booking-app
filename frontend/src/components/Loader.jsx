import React, { useState } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#36D7B7"); // Set a default color

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div>
      <div className="sweet-loading">
        <PacmanLoader
          color={color}
          loading={loading}
          cssOverride={override} // Apply the inline style
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loader;
