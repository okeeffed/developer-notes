---
menu: Elm
name: Rendering Examples
---

# Elm Rendering Examples

## Rendering via anonymous function

```elm
view model =
    div [ class "content" ]
        [ h1 [] [ text "Photo Groove" ]
        , div [ id "thumbnails" ]
            -- anonymous function mapping photos
            (List.map (\photo -> viewThumbnail model.selectedUrl photo)
                model.photos
            )
        , img                 #A
            [ class "large"   #A
            , src (urlPrefix ++ "large/" ++ model.selectedUrl)
            ]
            []
        ]
```

### Anon function with partial application

```bash
Before: List.map (\photo -> viewThumbnail model.selectedUrl photo) model.photos 
# Partial application is known as curried in Elm
After: List.map (viewThumbnail model.selectedUrl) model.photos
```

All Elm functions are curried.

## Update function

To update the model, we need to have the appropriate `update` function and expose the correct `Html.Events`.

```elm
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

update msg model =
    if msg.description == "ClickedPhoto" then
        { model | selectedUrl = msg.data }
    else model

viewThumbnail selectedUrl thumb =
    img
        [ src (urlPrefix ++ thumb.url)
        , classList [ ( "selected", selectedUrl == thumbnail.url ) ]
        , onClick { description = "ClickedPhoto", data = thumb.url } ]
        []
```

## Implementing the Model-View-Update Loop

```elm
import Browser

main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
```

## Multi-Argument Function Annotations

```shell
> String.padLeft
<function:padLeft> : Int -> Char -> String -> String
> String.padLeft 9
<function> : Char -> String -> String
> String.padLeft 9 '.' <function> : String -> String
> String.padLeft 9 '.' "not!" ".....not!" : String
```

