import { motion } from "framer-motion";
import styled from "styled-components";
import { BOTTOM_SHEET_HEIGHT } from "../../../constants/bottomSheet";

export const Wrapper = styled(motion.div)`
  flex-direction: column;
  position: fixed;
  //z-index: 10;
  top: 80vh;
  left: 0;
  right: 0;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: white;
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
  padding-top: 16px;
  padding-bottom: 4px;
`;

export const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

export const ContentWrapper = styled.div`
  height: 80vh;
  padding: 0 1rem 5rem 1rem;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding-bottom: 1rem;
`;

export const Title = styled.div`
  padding-top: 0.3rem;
  color: ${(props) => props.theme.colors.black};
  font-size: 1rem;
  font-weight: 600;
`;
