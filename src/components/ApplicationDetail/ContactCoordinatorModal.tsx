import { useEffect } from 'react';
import PhoneIcon from '@/assets/icons/PhoneIcon.svg?react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { ApplicationCoordinaterItemType } from '@/types/application/applicationItem';

type ContactCoordinatorModalProps = {
  onClickClose: () => void;
  onClickContact: () => void;
  coordinatorData: ApplicationCoordinaterItemType;
};

const ContactCoordinatorModal = ({
  onClickClose,
  onClickContact,
  coordinatorData,
}: ContactCoordinatorModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex items-center justify-center bg-[rgba(70,70,70,0.6)] z-50">
      <div className="w-[90%] max-w-[22rem] flex flex-col gap-8 bg-white rounded-[1.125rem] overflow-hidden">
        <div className="flex flex-col w-full px-[2.5rem]">
          <h1 className="pt-[1.125rem] pb-4 border-b-[0.5px] border-solid border-[#DCDCDC] text-center head-3 text-[#464646]">
            Would you like to contact to Coordinator?
          </h1>
          <p className="pt-7 body-3 text-[#656565] text-center">
            You can contact to Coordinator directly
          </p>
          <div className="mt-[0.5rem] mb-[1.5rem] px-[1rem] flex items-center gap-[0.75rem] py-[0.75rem] rounded-[1rem] bg-[#F4F4F9]">
            <div className="p-[0.375rem] bg-white rounded-[0.5rem]">
              <PhoneIcon />
            </div>
            <div>
              <h5 className="button-2 text-black">
                {coordinatorData?.coordinator_name ?? ''}
              </h5>
              <p className="caption text-[#656565]">
                {coordinatorData?.coordinator_phone_number ?? ''}
              </p>
            </div>
          </div>
          <div className="w-full px-[0.75rem] pt-[0.75rem] pb-[0.5rem] border-[0.031rem] border-[#DCDCDC] rounded-[1.125rem]">
            <p className="pb-[0.75rem] px-[0.5rem] body-3 text-[#555555]">
              Check the address
            </p>
            <p className="pb-[0.75rem] px-[0.25rem] button-2 text-[#1E1926]">
              {coordinatorData?.school_name ?? ''}{' '}
              {coordinatorData?.institute_name ?? ''}
            </p>
            <p className="pb-[0.75rem] px-[0.5rem] caption text-[##656565]">
              {coordinatorData?.address?.address_detail}
            </p>
            {coordinatorData?.address?.latitude &&
              coordinatorData?.address?.longitude && (
                <Map
                  center={{
                    lat: coordinatorData.address.latitude,
                    lng: coordinatorData.address.longitude,
                  }}
                  style={{ width: '100%', height: '99px' }}
                  className="rounded-xl"
                >
                  <MapMarker
                    position={{
                      lat: coordinatorData.address.latitude,
                      lng: coordinatorData.address.longitude,
                    }}
                  ></MapMarker>
                </Map>
              )}
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

export default ContactCoordinatorModal;
