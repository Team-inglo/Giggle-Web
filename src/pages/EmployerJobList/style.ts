import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  min-height: 100dvh;
`;

export const FilterButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  margin: 0 auto;
  width: 90dvw;
  border-radius: 0.7rem;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
`;

export const JobListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem 5rem 1rem;
  width: 100%;
`;
