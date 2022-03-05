import { SimpleQuiz } from "../../../components/SimpleQuiz"

# Minitest Style guide

## Resources

1. [Rubocop Style Guide](https://github.com/rubocop/minitest-style-guide)

## SimpleQuiz

<SimpleQuiz
  questions={[
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: "assert_equal(nil, actual)",
          isAnswer: false,
        },
        {
          text: "assert_nil(actual)",
          isAnswer: true,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert_equal(actual, "rubocop-minitest")`,
          isAnswer: false,
        },
        {
          text: `assert_equal("rubocop-minitest", actual)`,
          isAnswer: true,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert(actual)`,
          isAnswer: true,
        },
        {
          text: `assert_equal(true, actual)`,
          isAnswer: false,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert(!something)`,
          isAnswer: false,
        },
        {
          text: `refute(actual)`,
          isAnswer: true,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert(collection.include?(object))`,
          isAnswer: false,
        },
        {
          text: `assert_includes(collection, object)`,
          isAnswer: true,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `refute_includes(collection, object)`,
          isAnswer: true,
        },
        {
          text: `assert(!collection.include?(object))`,
          isAnswer: false,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `refute_in_delta(Math::PI, actual, 0.01)`,
          isAnswer: true,
        },
        {
          text: `refute_equal(Math::PI, actual)`,
          isAnswer: false,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert_empty(object)`,
          isAnswer: true,
        },
        {
          text: `assert(object.empty?)`,
          isAnswer: false,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert(expected < actual)`,
          isAnswer: false,
        },
        {
          text: `assert_operator(expected, :<, actual)`,
          isAnswer: true,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert_empty(object)`,
          isAnswer: true,
        },
        {
          text: `assert(object.empty?)`,
          isAnswer: false,
        },
      ],
    },
    {
      type: "singleChoice",
      question: {
        text: "Pick the preferred approach",
      },
      options: [
        {
          text: `assert_raises { do_something }`,
          isAnswer: false,
        },
        {
          text: `assert_raises(FooException) { do_something }`,
          isAnswer: true,
        },
      ],
    },
  ]}
/>
