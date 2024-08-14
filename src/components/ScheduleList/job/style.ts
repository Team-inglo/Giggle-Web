import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 0.4rem;
  width: 100%;
  gap: 0.5rem;
`;

export const ColorIcon = styled.div<{ color: string }>`
  width: 1.4rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.colors.black};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
`;

export const TotalSalaryBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding-top: 0.2rem;
  width: 100%;
`;

export const Text = styled.div`
  color: ${(props) => props.theme.colors.black};
  font-size: 0.875rem;
  text-align: end;
  line-height: 1.5;
`;
