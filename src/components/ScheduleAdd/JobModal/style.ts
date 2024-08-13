import styled from "styled-components";

export const Container = styled.div`
  padding: 0.5rem;
  padding-top: 0;
  width: 100%;
`;

export const Title = styled.div`
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
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

export const SubmitButton = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.lightBlack};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  text-align: center;
`;

export const ColorInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-top: 1rem;
  width: 100%;
`;

export const PaletteButton = styled.button`
  padding-right: 0.3rem;
`;

export const PaletteImg = styled.img``;

export const PaletteColor = styled.div<{ color: string }>`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const ColorPickerWrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
`;
