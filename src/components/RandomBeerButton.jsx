import React from "react";
import styled from "styled-components";
import Button from "./micro/Button";

const RandomBeerButtonBase = styled(Button)`
  padding: 1.4rem;
  margin: 2rem 0 1rem 0;
  font-size: 1.3rem;
  position: relative;

  width: ${(props) => (props.isLoading === true ? "330px" : "")};
  height: ${(props) => (props.isLoading === true ? "74px" : "")};
  background-color: ${(props) => (props.isLoading === true ? "#003254" : "")};
  cursor: ${(props) => (props.isLoading === true ? "default" : "pointer")};

  .lds-ellipsis {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-10%, -50%);
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

export default function RandomBeerButton({ isLoading, handleClick }) {
  if (isLoading === true) {
    return (
      <RandomBeerButtonBase isLoading={isLoading}>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </RandomBeerButtonBase>
    );
  } else {
    return (
      <RandomBeerButtonBase onClick={handleClick}>
        <React.Fragment>
          <span role="img" aria-label="beer emoji">
            🍺
          </span>{" "}
          Another Beer, Please
        </React.Fragment>
      </RandomBeerButtonBase>
    );
  }
}
