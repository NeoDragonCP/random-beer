import styled from "styled-components";

const Button = styled.button`
  display: inline-block;

  margin: 1rem 0 0.4rem 0;
  padding: 1rem;

  border-radius: 50vh;

  background-color: #00416d;
  color: white;

  text-transform: uppercase;
  font-weight: bold;

  cursor: pointer;

  -webkit-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  -moz-box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);
  box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.51);

  /* remove default button styles */
  outline: none;
  border: none;

  transition: all 0.3s;

  :active {
    -webkit-box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.51);
    -moz-box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.51);
    box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.51);
    transform: translateY(4px);
    transform: scale(0.98);
  }
`;

export default Button;
