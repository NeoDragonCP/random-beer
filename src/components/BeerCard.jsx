import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "./micro/Button";
import Bottle from "./Bottle";
import CategoryLabel from "./micro/CategoryLabel";
import ExtraDetails from "./micro/ExtraDetails";

const BaseCard = styled(motion.div)`
  position: relative;
  width: 300px;
  padding: 1rem 1rem 0 1rem;
  margin-top: 0.5rem;
  border-radius: 10px;

  background-color: #f1f3f8;
  -webkit-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  -moz-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.error ? "center" : "flex-start")};
  flex: 0 0 auto;

  /* Medium/Larger screens */
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    width: 700px;
  }

  /* solely error display style-overrides */
  height: ${(props) => (props.error ? "500px" : "")};
  color: ${(props) => (props.error ? "red" : "")};

  .error {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(33, 33, 33);
    text-align: center;
    font-size: 1.2rem;
    > h2 {
      color: red;
      margin: 0 0 5rem 0;
    }
  }

  .bottleContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (min-width: 768px) {
      width: auto;
      height: 100%;
    }
  }
`;

const BeerDetails = styled.div`
  padding: 0.5rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* Medium/Larger screens */
  @media only screen and (min-width: 768px) {
    margin-left: 2rem;
  }

  .name {
    font-size: 1.4rem;
    font-weight: bold;
    color: #00416d;
    margin-bottom: 0.5rem;
  }

  .brewery {
    margin-top: 0.8rem;
    margin-bottom: 0.3rem;
    > span {
      margin-left: 2px;
      margin-right: 0.2rem;
    }
  }
`;

const MoreDetailsButton = styled(Button)`
  background: none;
  border: 1px solid #00416d;
  color: #00416d;
`;

export default function BeerCard({
  beer,
  brewery,
  category,
  error,
  handleClick,
}) {
  const [showDescription, setShowDescription] = useState(false);

  const name = beer.name;
  let description = "";
  if (
    typeof beer.style.description !== "undefined" ||
    beer.style.description != null
  ) {
    description = beer.style.description;
  }
  const imgURL = beer.labels.medium;
  const breweryDisplayName = brewery.nameShortDisplay;
  const abv = beer.abv;
  const isOrganic = beer.isOrganic === "Y" ? "Yes" : "No";

  // Slice the date just to show the year
  const createDate = beer.createDate.slice(0, 4);

  // Helper function used to check handleClick exists
  function checkFunctionExists(possibleFunction) {
    let isFunction = typeof possibleFunction === typeof Function;
    if (isFunction === false) {
      console.log("Attempted to call an undefined function");
    }
    return isFunction;
  }

  return (
    <BaseCard
      animate={{
        opacity: [0, 1],
        rotate: [35, 0],
        x: [100, 0],
        y: [20, 0],
        transitionEnd: {},
      }}
      transition={{ duration: 0.5 }}
      error={error}
    >
      {error === false ? (
        <React.Fragment>
          <div className="bottleContainer">
            <Bottle imgURL={imgURL} />
          </div>
          <BeerDetails>
            <p className="name">{name}</p>
            <CategoryLabel>{category}</CategoryLabel>

            <ExtraDetails>
              <div className="extraDetailsItem">
                <span>ABV</span>
                {abv}
              </div>
              <div className="extraDetailsItem">
                <span>Organic</span>
                {isOrganic}
              </div>
              <div className="extraDetailsItem">
                <span>Year</span>
                {createDate}
              </div>
            </ExtraDetails>
            {breweryDisplayName.length > 1 ? (
              <div className="brewery">
                <span role="img" aria-label="brewery location">
                  🏭
                </span>
                {breweryDisplayName}
              </div>
            ) : (
              <React.Fragment />
            )}
            <Link to="/brewery">
              <MoreDetailsButton
                onClick={() => {
                  if (checkFunctionExists(handleClick)) handleClick();
                }}
              >
                Brewery Info <i className="fas fa-angle-right"></i>
              </MoreDetailsButton>
            </Link>
            {showDescription === true && description.length >= 1 ? (
              <React.Fragment>
                <MoreDetailsButton
                  onClick={() => setShowDescription(!showDescription)}
                >
                  Hide Description <i className="fas fa-angle-up"></i>
                </MoreDetailsButton>
                <p>{description}</p>
              </React.Fragment>
            ) : (
              <MoreDetailsButton
                onClick={() => setShowDescription(!showDescription)}
              >
                Read Description <i className="fas fa-angle-down"></i>
              </MoreDetailsButton>
            )}
          </BeerDetails>
        </React.Fragment>
      ) : (
        <div className="error">
          <h2>Error!</h2>
          <p>
            <b>Whoops.</b>
            <br />
            Seems there was an error loading the lovely beer.
            <br />
            Check your connection and try again.
          </p>
        </div>
      )}
    </BaseCard>
  );
}

// * * *
// Some default props
BeerCard.defaultProps = {
  beer: {
    id: "wXVeJD",
    name: "Incorrigible",
    description: "Limited availability.",
    isOrganic: "N",
    abv: "4.5",
    createDate: "2013-09-28 14:21:25",
    labels: {
      medium:
        "https://brewerydb-images.s3.amazonaws.com/beer/wXVeJD/upload_ZVFd9k-medium.png",
    },
  },
  category: "American-Style Sour Ale",
  brewery: { nameShortDisplay: "New Holland" },
};
// * * *
