import {
  FormControl,
  HStack,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useRouter } from "next/router";
import React from "react";
import { FiSearch } from "react-icons/fi";

import data from "../../data/_metadata.json";

/**
 * Main index page
 *
 * @returns {React.ReactElement} main blog page
 */
export function PackageSearch() {
  const { push, asPath } = useRouter();
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = React.useCallback(
    (event: any) => {
      if (event.key === "/") {
        event.preventDefault();

        // @ts-expect-error: this is correct
        inputRef?.current?.querySelector("#search-input")?.focus();
      }
    },
    [inputRef]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  React.useEffect(() => {
    setLoading(false);
  }, [asPath]);

  const handleChange = (event) => {
    if (event) {
      if (asPath.includes(event)) {
        return;
      }

      setLoading(true);
      void push(event);
    }
  };

  return (
    <FormControl>
      <AutoComplete openOnFocus maxSuggestions={30} onChange={handleChange}>
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiSearch} />
          </InputLeftElement>
          <AutoCompleteInput
            variant="filled"
            placeholder="Type '/' to search packages"
            w="full"
            id="search-input"
            ref={inputRef}
          />
          {loading && (
            <InputRightElement>
              <Spinner />
            </InputRightElement>
          )}
        </InputGroup>
        <AutoCompleteList>
          {data.metadata.map(({ url, tag, label }) => (
            <AutoCompleteItem key={url} label={label} value={url}>
              <HStack w="full">
                <Tag>{tag}</Tag>
                <Text>{label}</Text>
              </HStack>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </FormControl>
  );
}
