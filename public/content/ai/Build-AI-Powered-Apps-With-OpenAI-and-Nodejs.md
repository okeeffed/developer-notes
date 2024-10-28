---
menu: AI
name: Build AI Powered Apps With OpenAI and Node.js
---

I am only covering the parts that interested me the most in these courses.

## Links and resources

- https://frontendmasters.com/courses/openai-node
- https://github.com/frontendmasters/ai-nodejs
- https://scottmoss.notion.site/AI-App-Node-js-f9a372a138ef4241943b4fbb44bdc970
- https://python.langchain.com/docs/introduction/
- https://python.langchain.com/docs/integrations/vectorstores/

The course will cover:

1. Chat experience
2. Embeddings and vector stores
3. Semantic search
4. Document QA
5. Function calling
6. Scaling and production

## 2 Setup

### 2.1 Intro to LLMs

Large language model. It's exactly what it sounds like.

Think of them as super smart text machines that are trained on a ridiculously large set of data to understand and respond in text that sounds like something a human would say.

The important turning point in LLMs is the introduction of **transformers**.

How LLMs make a difference:

1. Writing and content
2. Customer support
3. Research
4. Education
5. Automation

### 2.3 Simple AI Chat in Node.js

In this case, the example uses the OpenAI npm package to make simple a simple chat app on the CLI.

Some of the key code:

```js
const newMessage = async (history, message) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [...history, message],
    model: 'gpt-3.5-turbo',
  })

  return chatCompletion.choices[0].message
}
```

The full example code:

```js
import 'dotenv/config'
import readline from 'node:readline'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const newMessage = async (history, message) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [...history, message],
    model: 'gpt-3.5-turbo',
  })

  return chatCompletion.choices[0].message
}

const formatMessage = (userInput) => ({ role: 'user', content: userInput })

const chat = () => {
  const history = [
    {
      role: 'system',
      content: `You are a helpful AI assistant. Answer the user's questions to the best of you ability.`,
    },
  ]
  const start = () => {
    rl.question('You: ', async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        rl.close()
        return
      }

      const userMessage = formatMessage(userInput)
      const response = await newMessage(history, userMessage)

      history.push(userMessage, response)
      console.log(`\n\nAI: ${response.content}\n\n`)
      start()
    })
  }

  start()
  console.log('\n\nAI: How can I help you today?\n\n')
}

console.log("Chatbot initialized. Type 'exit' to end the chat.")
chat()
```

### 2.4 Scaling and AI temperature

The better summary comes from [here](https://scottmoss.notion.site/Scaling-chat-06ef53fba44b4757b5e566841b6b7342).

The main summary:

- Context limits
- Moderation
- Accuracy
- Speed
- Streaming responses for many users
- Chat history storage

## 3 Search & Langchain

### 3.1 Search & Langchain overview

- Semantic search is search on how things relate. It's obviously not good for something with only one word.
- LangChain is a framework to help power semantic search https://python.langchain.com/docs/introduction/

### 3.2 Embeddings & vectors

What is a word embedding? It's effectively the collection of numbers which represents the meaning of the words for the sake of computer "understanding".

An embedding model converts text into a vector.

How does this relate to semantic search? Vectors can be used to help generate similarity.

This also brings up the concept of vector databases and how they are optimised for this.

A list of vector stores: https://python.langchain.com/docs/integrations/vectorstores/

### 3.3 Creating a Semantic Search

At this point, there is a demonstration on building a simple semantic search example.

The final code:

```js
import 'dotenv/config'
import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

const movies = [
  {
    id: 1,
    title: 'Stepbrother',
    description: `Comedic journey full of adult humor and awkwardness.`,
  },
  {
    id: 2,
    title: 'The Matrix',
    description: `Deals with alternate realities and questioning what's real.`,
  },
  {
    id: 3,
    title: 'Shutter Island',
    description: `A mind-bending plot with twists and turns.`,
  },
  {
    id: 4,
    title: 'Memento',
    description: `A non-linear narrative that challenges the viewer's perception.`,
  },
  {
    id: 5,
    title: 'Doctor Strange',
    description: `Features alternate dimensions and reality manipulation.`,
  },
  {
    id: 6,
    title: 'Paw Patrol',
    description: `Children's animated movie where a group of adorable puppies save people from all sorts of emergencies.`,
  },
  {
    id: 7,
    title: 'Interstellar',
    description: `Features futuristic space travel with high stakes`,
  },
]

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (movie) =>
        new Document({
          pageContent: `Title: ${movie.title}\n${movie.description}`,
          metadata: { source: movie.id, title: movie.title },
        })
    ),
    new OpenAIEmbeddings()
  )

export const search = async (query, count = 1) => {
  const store = await createStore()
  return store.similaritySearch(query, count)
}

console.log(await search('cute and furry'))
```

> Note: The count is how many results to return.

There is a number of different similarity searches around with different pros/cons.

The result that comes up is an array of the matching documents.

### 3.5 Scaling semantic search

https://scottmoss.notion.site/Scaling-Semantic-search-cc30dfdb975a4d458300d73efa613e79

Questions that come up:

- How do you update existing data?
- What happens if you end up with too may data points?

Some of the strategies that come up:

1. Batch processing.
2. Incremental indexing.
3. Use specialised databases.

Tips for optimising speed and accuracy:

- Tune your model
- Use caching
- Parallel processing
- Feedback loop
- Optimize infrastructure

## 4 Question answering systems

### 4.1 Document QA system

Good for:

- Knowledge bases & wikis
- Customer support
- Research & academia
- Legal & compliance

### 4.2 QA query

The final code for this part (can be found [here](https://github.com/FrontendMasters/ai-nodejs/blob/main/qa.js)):

```js
import 'dotenv/config'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { openai } from './openai.js'

const question = process.argv[2] || 'hi'

const video = `https://youtu.be/zR_iuq2evXo?si=cG8rODgRgXOx9_Cn`

export const createStore = (docs) =>
  MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())

export const docsFromYTVideo = async (video) => {
  const loader = YoutubeLoader.createFromUrl(video, {
    language: 'en',
    addVideoInfo: true,
  })
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: ' ',
      chunkSize: 2500,
      chunkOverlap: 100,
    })
  )
}

export const docsFromPDF = () => {
  const loader = new PDFLoader('xbox.pdf')
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: '. ',
      chunkSize: 2500,
      chunkOverlap: 200,
    })
  )
}

const loadStore = async () => {
  const videoDocs = await docsFromYTVideo(video)
  const pdfDocs = await docsFromPDF()

  return createStore([...videoDocs, ...pdfDocs])
}

const query = async () => {
  const store = await loadStore()
  const results = await store.similaritySearch(question, 1)

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k-0613',
    temperature: 0,
    messages: [
      {
        role: 'assistant',
        content:
          'You are a helpful AI assistant. Answser questions to your best ability.',
      },
      {
        role: 'user',
        content: `Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
        Question: ${question}
  
        Context: ${results.map((r) => r.pageContent).join('\n')}`,
      },
    ],
  })
  console.log(
    `Answer: ${response.choices[0].message.content}\n\nSources: ${results
      .map((r) => r.metadata.source)
      .join(', ')}`
  )
}

query()
```

There was also a side-note about Llama Index.

## 5 Function calling

- **What is Function Calling?**: While LLMs can't actively browse the internet, they can be used in tandem with function calls to other systems that can. Essentially, the LLM instructs another system to perform a specific task and then uses that data in its response.
- 
- **Bridging the Gap**: By integrating LLMs with function calling capabilities, we can bridge the gap between the LLM's static knowledge and the dynamic, ever-evolving real world. For instance, while the LLM might not know today's stock market status, it can instruct a function to fetch that data and then interpret it for the user.

- **Benefits**:
    - **Up-to-Date Responses**: By using function calls, the LLM can provide answers based on the latest available data, even if it's post its last training cut-off.
    - **Enhanced Utility**: LLMs can be integrated into a broader ecosystem of services and APIs, expanding their utility beyond mere text generation.
    - **Customization**: Developers can tailor which functions or services the LLM can call, allowing for a customized user experience.

- **Challenges**:
    - **Complexity**: Introducing function calling adds another layer of complexity to the system. Ensuring smooth interaction between the LLM and external functions can be challenging.
    - **Latency**: Real-time data fetching and processing can introduce delays in the LLM's responses.
    - **Accuracy & Reliability**: The LLM is dependent on the accuracy and reliability of the external functions it calls. If there's an issue with the external data source, it can impact the quality of the LLM's response.
    - **Security Concerns**: Integrating external function calls can introduce security vulnerabilities, especially if interacting with untrusted sources or services.

The example code for this section:

```ts
import 'dotenv/config'
import { openai } from './openai.js'
import math from 'advanced-calculator'
const QUESTION = process.argv[2] || 'hi'

const messages = [
  {
    role: 'user',
    content: QUESTION,
  },
]

const functions = {
  calculate: async ({ expression }) => {
    return math.evaluate(expression)
  },
}

const getCompletion = async (messages) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    messages,
    functions: [
      {
        name: 'calculate',
        description: 'Run a math expression',
        parameters: {
          type: 'object',
          properties: {
            expression: {
              type: 'string',
              description:
                'Then math expression to evaluate like "2 * 3 + (21 / 2) ^ 2"',
            },
          },
          required: ['expression'],
        },
      },
    ],
    temperature: 0,
  })

  return response
}

let response
while (true) {
  response = await getCompletion(messages)

  if (response.choices[0].finish_reason === 'stop') {
    console.log(response.choices[0].message.content)
    break
  } else if (response.choices[0].finish_reason === 'function_call') {
    const fnName = response.choices[0].message.function_call.name
    const args = response.choices[0].message.function_call.arguments

    const functionToCall = functions[fnName]
    const params = JSON.parse(args)

    const result = functionToCall(params)

    messages.push({
      role: 'assistant',
      content: null,
      function_call: {
        name: fnName,
        arguments: args,
      },
    })

    messages.push({
      role: 'function',
      name: fnName,
      content: JSON.stringify({ result: result }),
    })
  }
}
```

### Wrapping up

Also had an interesting insight into using things like AutoGPT.