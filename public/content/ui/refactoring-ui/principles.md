---
menu: Refactoring UI
name: Principles
---

import { SimpleQuiz } from "../../../components/SimpleQuiz"

# Refactoring UI - Principles

<SimpleQuiz
  questions={[
    {
      type: "multiChoice",
      question: {
        text: "What are some core principles when starting from scratch?",
      },
      options: [
        {
          text: "Design most of the specifics",
          isAnswer: false,
        },
        {
          text: "Choose a personality",
          isAnswer: true,
        },
        {
          text: "Don't design too much",
          isAnswer: true,
        },
        {
          text: "Provide enough details for those using your projects",
          isAnswer: false,
        },
        {
          text: "Details come later",
          isAnswer: true,
        },
        {
          text: "Start with a feature, not a layout",
          isAnswer: true,
        },
        {
          text: "Limit your choices",
          isAnswer: true,
        },
        {
          text: "Don't marginalise with a personality",
          isAnswer: false,
        },
      ],
    },
    {
      type: "multiChoice",
      question: {
        text: "What are some core principles for layout and spacing?",
      },
      options: [
        {
          text: "Start with a lot of white space",
          isAnswer: true,
        },
        {
          text: "Start with little white space",
          isAnswer: false,
        },
        {
          text: "Always stick to grids",
          isAnswer: false,
        },
        {
          text: "Grids are overrated",
          isAnswer: true,
        },
        {
          text: "Use relative sizing",
          isAnswer: false,
        },
        {
          text: "Relative sizing does not scale",
          isAnswer: true,
        },
        {
          text: "Avoid ambiguous spacing",
          isAnswer: true,
        },
        {
          text: "Use even spacing between all elements",
          isAnswer: false,
        },
      ],
    },
  ]}
/>

## Startin from scratch

1. Start with a feature, not a layout
2. Detail comes later
3. Don't design too much
4. Choose a personality
5. Limit your choices

## Hierarchy is everything

1. Not all elements are equal
2. Size isn't everything
3. Don't use grey text on coloured backgrounds
4. Emphasize by de-emphasizing
5. Labels are a last resort
6. Separate visual hierarchy from document hierarcy (?)
7. Balance weight and contrast
8. Semantics are secondary (?)

## Layout and spacing

1. Start with too much white space
2. You don't have to fill the whole screen
3. Grids are overrated
4. Relative sizing does not scale
5. Avoid ambiguous spacing

## Design text

1. Establish a type scale
2. Use good fonts
3. Keep your line length in check
4. Baseline, not center
5. Line-height is proportional
6. Not every link needs a color
7. Align with readability in mind
8. Use letter-spacing effectively

## Working with color

1. Ditch hex for HSL
2. You need more colours than you think
3. Define your shades up front
4. Don't let lightness kill your saturation
5. Greys don't have to be grey
6. Accessible doesn't have to mean ugly
7. Don't rely on color alone

## Creating depth

1. Emulate a light source
2. Use shadows to convey elevation
3. Shadows can have two parts
4. Even flat designs can have depth
5. Overlap elements to create layers

## Working with Images

1. Use good photos
2. Text needs consistent contrast
3. Everything has an intended size
4. Beware user-uploaded content

## Finishing Touches

1. Supercharge the defaults
2. Add color with accent borders
3. Decorate your backgrounds
4. Don't overlook empty states
5. Use fewer borders
6. Think outside the box

## Leveling Up

1. Look for decisions you would not have made
2. Rebuild your favourite interfaces
