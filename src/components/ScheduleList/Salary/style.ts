import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem 1.5rem 10rem 1.5rem;
  width: 100%;
`;

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

export const EditButton = styled.button`
  margin: 1.5rem 0;
  padding: 1rem;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.gray};
`;
