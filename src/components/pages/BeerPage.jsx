import React, { useEffect } from "react";

import BeerCard from "../BeerCard";
import RandomBeerButton from "../RandomBeerButton";

export default function BeerPage({
  isLoading,
  fetchCallback,
  beer,
  brewery,
  category,
  handleClickNewBeer,
  handleShowMoreInfo,
  error,
}) {
  useEffect(() => {
    fetchCallback();
  }, [fetchCallback]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p
        style={{
          padding: "2rem",
          textAlign: "center",
        }}
      >
        Find exciting beers from around the world for your tasting pleasure
      </p>
      {isLoading === true ? (
        <div
          style={{
            padding: "2rem",
            width: "300px",
            height: "480px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>Loading...</h4>
        </div>
      ) : (
        <React.Fragment>
          <h5>Like this one</h5>
          <BeerCard
            beer={beer}
            brewery={brewery}
            category={category}
            handleClick={handleShowMoreInfo}
            error={error}
          />
        </React.Fragment>
      )}
      <RandomBeerButton
        isLoading={isLoading}
        handleClick={handleClickNewBeer}
      />
    </div>
  );
}
