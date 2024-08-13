import { AnimatePresence, motion } from "framer-motion";
import { CancelButton, Container, ModalContainer } from "./style";
import { ReactNode, useEffect } from "react";
import CancelIcon from "../../../assets/icons/cancel_icon.svg?react";

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const ModalLayout = ({ isModal, setIsModal, children }: ModalProps) => {
  useEffect(() => {
    isModal ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "unset");
  }, [isModal]);

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <AnimatePresence>
      {isModal && (
        <Container>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ease: "easeOut",
                duration: 0.15,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                ease: "easeIn",
                duration: 0.15,
              },
            }}
          >
            <ModalContainer>
              <CancelButton onClick={closeModal}>
                <CancelIcon />
              </CancelButton>
              {children}
            </ModalContainer>
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default ModalLayout;
