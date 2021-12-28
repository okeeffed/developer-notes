import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

export function ImageModal(props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="6xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody minH="xl">
          {isLoading && (
            <Flex h="xl" alignItems="center" justifyContent="center">
              <Spinner size="xl" />
            </Flex>
          )}
          <Image
            src={props.src}
            minW="full"
            onLoad={() => setIsLoading(false)}
            my={8}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
