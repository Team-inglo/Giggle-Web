import styled from "styled-components";

export const DropDownButton = styled.button`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.3rem;
  color: ${(props) => props.theme.colors.deepGray};
  font-size: 1rem;
  text-align: start;
`;

export const DropDown = styled.div`
  position: absolute;
  padding: 0.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.6rem;
  margin-top: -1rem;
  height: 9rem;
  overflow-y: auto;
  @keyframes dropdown {
    0% {
      transform: translateY(-5%);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: dropdown 0.4s ease;
  z-index: 5;
`;

export const AddOption = styled.button`
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.deepGray};
  text-align: center;
`;

export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
`;

export const OptionText = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
`;

export const OptionButton = styled.button``;
