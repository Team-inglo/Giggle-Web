import { Container, FilterBox } from "./style";

const JobListFilter = ({ jobFilter }: { jobFilter: string[] }) => {
  return (
    <Container>
      {jobFilter.map((value, idx) => (
        <FilterBox key={`${value}_${idx}`}>#{value}</FilterBox>
      ))}
    </Container>
  );
};

export default JobListFilter;
