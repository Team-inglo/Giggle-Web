import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 10;
  overflow-y: scroll;
`;

export const HeaderContainer = styled.div`
  padding: 0 1rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
`;

export const BackButton = styled.button``;

export const ContentContainer = styled.div`
  padding: 0 1rem 1rem 1rem;
  width: 100%;
`;

export const Title = styled.div`
  color: ${(props) => props.theme.colors.black};
  font-size: 1.5rem;
  font-weight: 600;
`;

export const RegionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0;
  padding: 0.7rem 1rem;
  min-width: 2.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.lightOrange};
`;

export const RegionTypeButton = styled.button`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
  background-color: transparent;
`;

export const RegionInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

export const RegionInfoButton = styled.button<{ $isSelected: boolean }>`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? props.theme.colors.white : props.theme.colors.black)};
  background-color: ${(props) => (props.$isSelected ? props.theme.colors.mainColor : props.theme.colors.white)};
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.disabled ? props.theme.colors.gray : props.theme.colors.black)};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
`;
