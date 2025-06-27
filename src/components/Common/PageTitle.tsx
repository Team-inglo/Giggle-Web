interface PageTitleProps {
  title: string;
  content?: string;
}

const PageTitle = ({ title, content }: PageTitleProps) => {
  return (
    <div className="flex flex-col justify-center px-4 pt-6 pb-12 gap-2 heading-24-semibold break-keep w-full">
      <p className="relative whitespace-pre-line">{title}</p>
      {content && (
        <div>
          <p className="body-14-regular text-text-alternative whitespace-pre-line">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
