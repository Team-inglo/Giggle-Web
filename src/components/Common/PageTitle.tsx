interface PageTitleProps {
  title: string;
  content?: string;
}

const PageTitle = ({ title, content }: PageTitleProps) => {
  return (
    <div className="flex flex-col justify-center px-4 py-6 gap-2 head-1 break-keep h-[11.25rem] w-full">
      <p className="relative whitespace-pre-line">{title}</p>
      {content && (
        <div>
          <p className="body-2 text-text-alternative whitespace-pre-line">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
