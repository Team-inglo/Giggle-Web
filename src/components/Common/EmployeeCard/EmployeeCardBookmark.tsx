import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { MouseEvent } from 'react';

type EmployeeCardBookmarkProps = {
  isBookmarked: boolean;
  bookmarkCount?: number;
  onBookmarkClick: (e: MouseEvent) => void;
  variant?: 'icon-only' | 'with-count';
  className?: string;
};

const EmployeeCardBookmark = ({
  isBookmarked,
  bookmarkCount,
  onBookmarkClick,
  variant = 'icon-only',
  className = '',
}: EmployeeCardBookmarkProps) => {
  if (variant === 'with-count') {
    return (
      <div
        className={`flex items-center gap-1 caption-12-regular text-text-alternative ${className}`}
      >
        <button
          className="flex items-center justify-center w-4 h-4"
          onClick={onBookmarkClick}
        >
          {isBookmarked ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
        </button>
        {bookmarkCount ?? 0}
      </div>
    );
  }

  return (
    <button className={className} onClick={onBookmarkClick}>
      {isBookmarked ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
    </button>
  );
};

export default EmployeeCardBookmark;
