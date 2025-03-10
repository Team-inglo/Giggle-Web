type PostSearchFilterSelectProps = {
  selectedRegion: string | null;
  onSelect: (region: string) => void;
  regionData: string[];
};

const PostSearchFilterSelect = ({
  selectedRegion,
  onSelect,
  regionData,
}: PostSearchFilterSelectProps) => {
  return (
    <section className="flex-1 flex flex-col gap-[0.313rem] p-[0.5rem] border border-[#DCDCDC] rounded-[1rem]">
      {regionData.map((region, index) => (
        <button
          key={`${index}_${region}`}
          className={`w-full py-[0.625rem] px-[0.875rem] body-2 text-[#656565] text-start ${selectedRegion === region && 'bg-[#F4F4F9]'} rounded-[0.5rem]`}
          onClick={() => onSelect(region)}
        >
          {region}
        </button>
      ))}
    </section>
  );
};

export default PostSearchFilterSelect;
