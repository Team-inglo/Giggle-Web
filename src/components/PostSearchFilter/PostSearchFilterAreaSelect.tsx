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
    <section className="flex-1 flex flex-col gap-2 border-r border-border-alternative">
      {regionData.map((region, index) => (
        <button
          key={`${index}_${region}`}
          className={`w-full py-2 px-4 body-2 text-start ${selectedRegion === region ? 'bg-surface-secondary text-text-strong' : 'text-text-alternative'}`}
          onClick={() => onSelect(region)}
        >
          {region}
        </button>
      ))}
    </section>
  );
};

export default PostSearchFilterSelect;
