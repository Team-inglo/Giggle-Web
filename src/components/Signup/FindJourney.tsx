import Button from '@/components/Common/Button';
import { cardData, UserType } from '@/constants/user';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import PageTitle from '../Common/PageTitle';
import CardSelect from '../Common/CardSelect';

type findJourneyProps = {
  onSignUpClick: () => void;
  onTypeSelect: (type: UserType) => void;
  accountType: UserType | null;
};

const FindJourney = ({
  onSignUpClick,
  onTypeSelect,
  accountType,
}: findJourneyProps) => {
  const handleClick = (value: UserType) => {
    onTypeSelect(value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageTitle
        title={'어떤 역할로\n가입하시겠어요? 🙌'}
        content={'먼저, 어떤 역할로 가입할지 선택해 주세요!'}
      />
      <div className="w-full flex flex-col gap-2.5 pb-6 px-4">
        {/* 유학생, 고용주 타입 선택 카드 */}
        {cardData.map((card) => (
          <CardSelect
            key={card.accountType}
            icon={card.icon}
            title={card.title}
            content={card.description}
            selected={accountType === card.accountType}
            onClick={() => handleClick(card.accountType)}
          />
        ))}
      </div>
      <div className="py-6 w-full">
        {/* 타입 선택 후에 Sign Up 가능 */}
        <BottomButtonPanel>
          <Button
            type={accountType ? Button.Type.PRIMARY : Button.Type.DISABLED}
            size={Button.Size.LG}
            isFullWidth
            title="다음으로"
            onClick={accountType ? onSignUpClick : undefined}
          />
        </BottomButtonPanel>
      </div>
    </div>
  );
};

export default FindJourney;
