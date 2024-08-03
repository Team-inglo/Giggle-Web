import { useState } from "react";
import { Container, ScoreBox, ScoreNumber, ScoreTitle } from "./style";

const MainScoreList = () => {
  const [score, setScore] = useState<Map<string, string>>(
    new Map([
      ["TOPIC 성적", "3급"],
      ["사회통합 프로그램 성적", "2급"],
      ["세종학당 성적", "50점"],
      ["학점", "4.3"],
    ])
  );

  return (
    <Container>
      {Array.from(score).map(([key, value]) => (
        <ScoreBox key={key}>
          <ScoreTitle>{key}</ScoreTitle>
          <ScoreNumber>{value}</ScoreNumber>
        </ScoreBox>
      ))}
    </Container>
  );
};

export default MainScoreList;
