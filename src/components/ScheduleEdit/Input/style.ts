import styled from "styled-components";

export const TotalSalaryBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.3rem;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

export const TotalSalaryText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const InputBox = styled.div`
  position: relative;
`;

export const InputTitle = styled.div`
  padding-bottom: 0.3rem;
  color: ${(props) => props.theme.colors.deepGray};
  font-size: 1rem;
  line-height: 1.5;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.3rem;
  color: ${(props) => props.theme.colors.lightBlack};
  font-size: 1rem;
`;

export const InputText = styled.div`
  position: absolute;
  bottom: 1.8rem;
  right: 1rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.lightBlack};
`;
