import styled from "styled-components";

export const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
`;
export const InputBox = styled.div`
  width: 100%;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
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
  outline: none;
`;

export const InputText = styled.div`
  position: absolute;
  bottom: 1.8rem;
  right: 1rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.lightBlack};
`;

export const InputIcon = styled.div`
  position: absolute;
  bottom: 1.8rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const JobList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  overflow-y: scroll;
  .selected {
    background-color: ${(props) => props.theme.colors.mainColor};
    color: white;
  }
`;

export const JobSelect = styled.div`
  display: flex;
  height: 50px;
  padding: 16px 17px;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 13px;
  color: ${(props) => props.theme.colors.gray};
`;

export const DayList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .selected {
    background-color: ${(props) => props.theme.colors.mainColor};
    color: white;
  }
  #current {
    border: 1px solid ${(props) => props.theme.colors.mainColor};
  }
`;

export const SearchResultModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid #D9D9D9;
  padding: 8px;
  color: #1E1E1E
  fontSize: 14;
  fontFamily: 'Inter';
  fontWeight: '400';
  lineHeight: 19.60;
  wordWrap: 'break-word';
  gap: 8px;
  box-shadow: 0 1px 4px rgba(12, 12, 13, 0.1);

`;

export const PlaceContainer = styled.div`
  color: #1e1e1e;
  width: 100%;
  padding: 8px;
  fontsize: 14;
  fontfamily: "Inter";
  fontweight: "400";
  lineheight: 19.6;
  wordwrap: "break-word";
`;

export const WorkDayRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const WorkDayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 17px;
`;

export const WorkTimeBox = styled(WorkDayBox)`
  flex-direction: column;
  height: 90px;
  width: 48px;
`;

export const DayTitle = styled.div`
  font-size: 16px;
  line-height: 16px;
  color: ${(props) => props.theme.colors.gray};
`;

export const WorkTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
`;

export const SubmitButton = styled.div`
  position: absolute;
  width: calc(100% - 48px);
  bottom: 30px;
  padding: 1rem 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-align: center;
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  margin-bottom: 10px;
  height: 70vh;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.3rem;
  color: ${(props) => props.theme.colors.lightBlack};
  font-size: 1rem;
  outline: none;
`;
