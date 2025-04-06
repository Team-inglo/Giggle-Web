import RegionCheckIcon from '@/assets/icons/PostSearch/RegionCheckIcon.svg?react';

type PostSearchFilterSelectProps = {
  selectedRegion: string | null;
  onSelect: (region: string) => void;
  regionData: string[];
  checkIsSelected?: (region: string) => boolean;
};

const PostSearchFilterSelect = ({
  selectedRegion,
  onSelect,
  regionData,
  checkIsSelected,
}: PostSearchFilterSelectProps) => {
  return (
    <section className="flex-1 flex flex-col gap-2 border-r border-border-alternative">
      {regionData.map((region, index) => (
        <button
          key={`${index}_${region}`}
          className={`w-full py-2 px-4 flex body-2 text-start ${selectedRegion === region || checkIsSelected?.(region) ? 'bg-surface-secondary text-text-strong' : 'text-text-alternative'}`}
          onClick={() => onSelect(region)}
        >
          {checkIsSelected?.(region) ? (
            <>
              <span className="pr-1 line-clamp-1">{region}</span>
              <RegionCheckIcon />
            </>
          ) : (
            region
          )}
        </button>
      ))}
    </section>
  );
};

export default PostSearchFilterSelect;
