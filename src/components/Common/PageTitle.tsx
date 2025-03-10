interface PageTitleProps {
  title: string;
  content?: string;
}

const PageTitle = ({ title, content }: PageTitleProps) => {
  return (
    <div className="flex flex-col gap-2 head-1 break-keep my-[3.125rem] w-full">
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
