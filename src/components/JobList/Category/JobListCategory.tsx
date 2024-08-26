import { useState } from "react";
import { JOB_CATEGORY } from "../../../constants/jobCategory";
import { Container, FilterBox } from "./style";

const JobListCategory = () => {
  const [category, setCategory] = useState<string>("전체");

  const onClickCategory = (name: string) => {
    setCategory(name);
  };

  return (
    <Container>
      {JOB_CATEGORY.map((value) => (
        <FilterBox key={value.key} onClick={() => onClickCategory(value.name)} $isSelected={value.name === category}>
          {value.name}
        </FilterBox>
      ))}
    </Container>
  );
};

export default JobListCategory;
