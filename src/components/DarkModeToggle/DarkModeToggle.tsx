import { HStack, Switch, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

interface IDarkModeToggle {
  isRequiredMobilePadding?: boolean;
}

export function DarkModeToggle({
  isRequiredMobilePadding = false,
}: IDarkModeToggle) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      pl={isRequiredMobilePadding ? [0, 4] : 0}
      pt={isRequiredMobilePadding ? [4, 0] : 0}
    >
      <FiSun size={14} />
      <Switch
        size="md"
        isChecked={colorMode === "dark"}
        onChange={() => {
          toggleColorMode();
        }}
      />
      <FiMoon size={14} />
    </HStack>
  );
}
