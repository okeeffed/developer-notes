import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import CodeBlock from "./codeblock";

type CodeBlockTab = {
  title: string;
  language: string;
  code: string;
};

interface CodeBlockTabsProps {
  codeBlocks: CodeBlockTab[];
}

export default function CodeBlockTabs({ codeBlocks }: CodeBlockTabsProps) {
  return (
    <Tabs bgColor="gray.700" borderRadius={8}>
      <TabList color="white">
        {codeBlocks.map((codeBlock) => (
          <Tab
            key={codeBlock.title}
            fontFamily="mono"
            fontSize="sm"
            _selected={{
              color: "teal.300",
              borderColor: "teal.300",
            }}
          >
            {codeBlock.title}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {codeBlocks.map((codeBlock) => (
          <TabPanel key={`codeblock-${codeBlock.title}`} p={0}>
            <CodeBlock className={codeBlock.language} displayCode>
              {codeBlock.code}
            </CodeBlock>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
