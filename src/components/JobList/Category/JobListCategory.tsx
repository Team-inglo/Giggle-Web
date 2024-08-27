import { JOB_CATEGORY } from "../../../constants/jobCategory";
import { Container, FilterBox } from "./style";

type JobListCategoryProp = {
  jobType: string;
  setJobType: (value: string) => void;
};

const JobListCategory = ({ jobType, setJobType }: JobListCategoryProp) => {
  const onClickCategory = (key: string) => {
    setJobType(key);
  };

  return (
    <Container>
      {JOB_CATEGORY.map((value) => (
        <FilterBox key={value.key} onClick={() => onClickCategory(value.key)} $isSelected={value.key === jobType}>
          {value.name}
        </FilterBox>
      ))}
    </Container>
  );
};

export default JobListCategory;
