import { motion } from "framer-motion";
import styled from "styled-components";
import { BOTTOM_SHEET_HEIGHT } from "../../../constants/bottomSheet";

export const Wrapper = styled(motion.div)`
  flex-direction: column;
  position: fixed;
  //z-index: 10;
  top: 10vh;
  left: 0;
  right: 0;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background-color: ${(props) => props.theme.colors.black};
  height: ${BOTTOM_SHEET_HEIGHT}px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  overflow: auto;
`;

export const HeaderWrapper = styled(motion.div)`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 15px;
  padding-bottom: 1rem;
`;

export const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

export const HeaderTitle = styled.div`
  padding-top: 0.7rem;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  height: 80vh;
  padding: 0 1rem 5rem 1rem;
  overflow-y: scroll;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 0.3rem;
`;

export const Title = styled.div`
  padding-top: 0.3rem;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  font-weight: 600;
`;

export const SubTitle = styled.span`
  padding-left: 0.5rem;
  color: ${(props) => props.theme.colors.white};
  font-size: 0.75rem;
  font-weight: 400;
`;

export const FilterBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
  width: 100%;
`;

export const Button = styled.button<{ $isSelected: boolean }>`
  padding: 0.7rem 0 0.7rem 0.8rem;
  color: ${(props) => (props.$isSelected ? props.theme.colors.white : props.theme.colors.black)};
  background-color: ${(props) => (props.$isSelected ? props.theme.colors.mainColor : props.theme.colors.white)};
  border-radius: 0.5rem;
  font-size: 1rem;
  text-align: start;
`;

export const SlideRegionWrapper = styled(motion.nav)`
  width: 100%;
`;

export const RegionSelectButton = styled.button`
  padding: 0.7rem 0;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  font-size: 1rem;
`;

export const RegionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const RegionButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.7rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainColor};
  border-radius: 0.5rem;
  font-size: 1rem;
`;

export const RegionDeleteButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8rem;
`;

export const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 0.7rem 0;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainColor};
  border-radius: 0.5rem;
  font-size: 1rem;
`;
