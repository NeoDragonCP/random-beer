import styled from "styled-components";

const ExtraDetails = styled.div`
  width: 100%;
  padding: 0.5rem 0 0.5rem 0;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: row;
  background-color: #e1eaf7;
  border-radius: 6px;

  justify-content: space-evenly;

  .extraDetailsItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    > span {
      font-size: 0.8rem;
      font-weight: 400;
    }
  }
`;

export default ExtraDetails;
