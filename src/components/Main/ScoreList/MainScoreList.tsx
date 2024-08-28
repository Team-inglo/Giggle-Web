// import { useState } from "react";
import { HomeInfo } from "../../../interfaces/home/homeInfo";
import { Container, ScoreBox, ScoreNumber, ScoreTitle } from "./style";

const MainScoreList = ({ homeInfo }: { homeInfo: HomeInfo }) => {
  const scoreColumn = [
    {
      title: "TOPIC 성적",
      value: homeInfo?.topikScore,
    },
    {
      title: "사회통합 프로그램 성적",
      value: homeInfo?.socialIntegrationProgramScore,
    },
    {
      title: "세종학당 성적",
      value: homeInfo?.sejongInstituteScore,
    },
    {
      title: "학점",
      value: homeInfo?.gpa,
    },
  ];

  return (
    <Container>
      {scoreColumn.map((value) => (
        <ScoreBox key={value.title}>
          <ScoreTitle>{value.title}</ScoreTitle>
          <ScoreNumber>{value.value}</ScoreNumber>
        </ScoreBox>
      ))}
    </Container>
  );
};

export default MainScoreList;
