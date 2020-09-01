import React from "react";
import styled from "styled-components";

const BottleBase = styled.div`
  position: relative;
  width: 160px;
  height: 200px;

  margin-top: 160px;
  margin-bottom: 2rem;

  background: rgb(41, 0, 1);
  background: linear-gradient(
    -90deg,
    rgba(41, 0, 1, 1) 0%,
    rgba(135, 67, 29, 1) 100%
  );

  border-radius: 0px 0px 10px 10px;

  -webkit-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  -moz-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);

  > .bottle__image {
    position: absolute;
    width: 100%;
    height: 120px;
    margin: 0 0 1rem 0;

    > img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  /* Extra parts to the bottle */
  .bottle__top {
    position: absolute;
    width: 160px;
    height: 80px;

    border-radius: 50px 50px 0 0;

    /* position it on top */
    top: 0%;
    transform: translateY(-100%);

    background-color: #290001;

    .bottle__top2 {
      position: absolute;
      width: 60px;
      height: 80px;

      border-radius: 10px 10px 0 0;

      /* position it on top */
      top: 10px;
      left: 50%;
      transform: translate(-50%, -100%);

      background-color: #290001;
    }
  }
`;

export default function Bottle({ imgURL }) {
  return (
    <BottleBase>
      <div className="bottle__image">
        <img src={imgURL} alt="logo-pic" />
      </div>
      <div className="bottle__top">
        <div className="bottle__top2"></div>
      </div>
    </BottleBase>
  );
}
