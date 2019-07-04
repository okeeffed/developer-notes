---
menu: Elm
name: Webmasters Elm
---

# Webmasters Elm

## Costs

1. Learning a new language
2. Smaller ecosystem
3. Fewer Web APIs have first-class support

## Benefits

1. Bundle size small
2. Production Elm in the first week

## Elm

JS Equivalent | Elm
--- | ---
UI | view
State | model
Async | update
Utilities | core
Packages | elm install

## Rendering a page

### Compiling

Compiles to JS.

```shell
elm make Main.elm --output elm.js
```

## User Interface Example

Converting this to Elm:

```javascript
let pluralize = (singular, plural, quantity) => quantity === 1 ? singular : plural;
```

```elm
pluralize singular plural quantity =
    if quantity == 1 then
        singular
    else
        plural

main =
    text (pluralize "leaf" "leaves" 1) -- parentheses are to disambiguate
```

## Part 1 - Example

This basic example gives a short look at actually creating a working piece of code.

```elm
module Main exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)


banner =
    div [ class "banner" ]
        [ div [ class "container" ]
            [ h1 [] [ text "conduit"]
            , p [] [ text "A place to share your knowledge."]
            ]
        ]


feed =
    div [ class "feed-toggle" ] [ text "(In the future we’ll display a feed of articles here!)" ]


main =
    div [ class "home-page" ]
        [ banner
        , div [ class "container page" ]
            [ div [ class "row" ]
                [ div [ class "col-md-9" ] [ feed ]
                , div [ class "col-md-3" ] []
                ]
            ]
        ]
```

## The Elm Architecture

Update, Model, View.

View is function that takes a `model` as a function.

Note that whatever message you use, you need to be consistent for `Update` and `View`.

```elm
type alias Msg =
    { description: String
    , data: String
    }

view : Model -> Html Msg
view model = 

-- 
update : Msg -> Model -> Model
update msg model =
```

## Type Annotations

```elm
username = "okeeffed"

-- typed example (Elm uses inference either way)
username : String
username = "okeeffed"

-- alt example
String.length : String -> Int

-- name list
names : List String
names = ["Sam", "Bob", "Bill"]
```

## Functions

```elm
pluralize : String -> String -> Int -> String

-- equivocal to
pluralize : String -> (String -> (Int -> String))
```

## Case Expressions

```elm
case model.tab of
    "YourFeed" ->
        -- show feed
    "GlobalFeed" ->
        -- show Global Feed
    _ ->
        -- show Tag Feed
```

## Custom Types

```elm
-- creates completely distinct values
type Tab =
    YourFeed 
    | GlobalFeed 
    | TagFeed

yours : Tab
yours =
    YourFeed

-- Turning types into functions

type Tab =
    YourFeed 
    | GlobalFeed 
    | TagFeed String

-- in the repl
> TagFeed "Happiness"
TagFeed "Happiness" : Tab
> TagFeed 
<function> : String -> Tab
```

Using Custom Types with updates:

```elm
-- allows us to pass different data types
type Msg
    = ClickedTag String
    | ClickedPage Int

update msg model =
    case msg of
        ClickedTag selectedTag ->
            -- use tag here
        ClickedPage page ->
            -- use page here
```

Summing it all up

Type | In Elm
case-expressions | case msg of
Enumerations | type Bool = True | False
Containers | type Msg = ClickedPage Int | ...
Variant Functions | onClick (ClickedPage pageNumber)

## Maybe Overview

```elm
-- List.head : List elem -> Maybe elem
first users =
    List.head users

-- example case
case first newUsers of
    Just user ->
        String.length user
    Nothing ->
        0
```

## Pipelines

```elm
List.head (List.map (List.reverse (List.filter (\x -> x < 5) [2, 4, 6])) negate)

-- As pipeline
[2, 4, 6]
    |> List.filter (\x -> x < 5)
    |> List.reverse
    |> List.map negate
    |> List.head
```

## Decoding JSON

```elm
-- Import to understand custom type
type Result okVal errVal
    = Ok okVal
    | Err errVal

-- similar to String.toint()
case decodeString Json.Decode.int "42" of
    Ok num ->
        -- Do something with Int
    Err error ->
        -- Do something with the error

type alias User =
    { id : Int
    , firstName : String
    , lastName : String
    }

user : Decoder User
user =
    Json.Decode.succeed User
        |> required "user_id" int
        |> required "first_name" string
        |> required "last_name" string

-- Alternatively
users : Decoder (List User)
users =
    list user
```

## Optional and Nullable

```elm
type alias User =
    { id : Int
    , name : Maybe String
    , email : String
    }

user : Decoder User
user =
    Json.Decode.succeed User
        |> required "user_id" int
        |> required "name" (nullable string)
        |> required "email" string
```

For an example that requires a list:

```elm
Decode.succeed Metadata
   |> required "description" string
   |> required "title" string
   |> required "tagList" (list string)
   |> required "favorited" bool
   |> required "favoritesCound" int
   |> required "createdAt" Timestamp.iso8601Decoder
```