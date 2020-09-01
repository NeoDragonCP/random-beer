import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

import Button from "../micro/Button";
import ExtraDetails from "../micro/ExtraDetails";

const BasePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  flex: 0 0 auto;
`;

const Card = styled.div`
  position: relative;
  width: 300px;
  padding: 1rem 1rem 0 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;

  background-color: #f1f3f8;
  -webkit-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  -moz-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #00416d;
  }

  img {
    width: 100%;
    height: 200px;
  }

  /* Medium/Larger screens */
  @media only screen and (min-width: 768px) {
    width: 700px;
  }
`;

export default function BreweryPage({ brewery, fetchCallback }) {
  useEffect(() => {
    fetchCallback();
  }, [fetchCallback]);

  const stillOperating = brewery.isInBusiness === "Y" ? true : false;
  const isVerified = brewery.isVerified === "Y" ? true : false;

  let imgURL = "";
  if (typeof brewery.images !== "undefined" || brewery.images != null) {
    imgURL = brewery.images.medium;
  }

  return (
    <BasePageStyle>
      <Card>
        <h1>{brewery.name}</h1>
        <div className="bottle__image">
          <img src={imgURL} alt="logo-pic" />
        </div>
        <h4>About</h4>
        <p>{brewery.description}</p>
        <ExtraDetails>
          <div className="extraDetailsItem">
            <span>established</span>
            {brewery.established}
          </div>
          {stillOperating === true ? (
            <div className="extraDetailsItem">
              <span>Operating</span>
              <i className="fas fa-thumbs-up"></i>
            </div>
          ) : (
            <div className="extraDetailsItem">
              <span>Operating</span>
              <i className="fas fa-thumbs-down"></i>
            </div>
          )}
          {isVerified === true ? (
            <div className="extraDetailsItem">
              <span>Verified</span>
              <i className="fas fa-thumbs-up"></i>
            </div>
          ) : (
            <div className="extraDetailsItem">
              <span>Operating</span>
              <i className="fas fa-thumbs-down"></i>
            </div>
          )}
        </ExtraDetails>
      </Card>
      <Link to="/">
        <Button>
          <i
            className="fas fa-chevron-left"
            style={{ marginRight: "0.5rem" }}
          ></i>
          Back
        </Button>
      </Link>
    </BasePageStyle>
  );
}
