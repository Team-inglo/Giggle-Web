import { useEffect } from 'react';
import PhoneIcon from '@/assets/icons/PhoneIcon.svg?react';

type ContactRecruiterModalProps = {
  onClickClose: () => void;
  onClickContact: () => void;
  name: string;
  phoneNumber: string;
};

const ContactRecruiterModal = ({
  onClickClose,
  onClickContact,
  name,
  phoneNumber,
}: ContactRecruiterModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex items-center justify-center bg-[rgba(70,70,70,0.6)] z-50">
      <div className="w-[90%] max-w-[22rem] flex flex-col gap-8 bg-white rounded-[1.125rem] overflow-hidden">
        <div>
          <h1 className="pt-[1.125rem] pb-4 border-b-[0.5px] border-solid border-[#DCDCDC] text-center head-3 text-[#464646]">
            Would you like to contact to Recruiter?
          </h1>
          <p className="pt-7 body-3 text-[#656565] text-center">
            if you didn't get a response,
            <br />
            you can contact to Recruiter directly
          </p>
          <div className="mt-[0.5rem] mx-auto max-w-[14.375rem] flex items-center gap-[0.75rem] py-[0.75rem] px-[1rem] rounded-[1rem] bg-[#F4F4F9]">
            <div className="p-[0.375rem] bg-white rounded-[0.5rem]">
              <PhoneIcon />
            </div>
            <div>
              <h5 className="button-2 text-black">{name}</h5>
              <p className="caption text-[#656565]">{phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-[#F4F4F9] py-[1.125rem] w-[50%] flex justify-center items-center button-1 text-[#656565]"
            onClick={onClickClose}
          >
            Close
          </button>
          <button
            className="bg-[#FEF387] py-[1.125rem] w-[50%] flex justify-center items-center button-1 text-[#1E1926]"
            onClick={onClickContact}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactRecruiterModal;
