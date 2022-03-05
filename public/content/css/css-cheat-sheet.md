---
name: Css Cheat Sheet
menu: CSS 
---
# CSS Syntax

```css
selector {property: value;}

External Style Sheet
<link rel="stylesheet" type="text/css" href="style.css" />
Internal Style
<style type="text/css">
selector {property: value;}
</style>
Inline Style
<tag style="property: value">
```

### Antialiasing

```css
-webkit-font-smoothing: antialiased;
```

### CSS Ordering

```css
.selector {
  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;

  /* Color */
  background: #000;
  color: #fff
  
  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;
}
```

### CSS Outline

```css
outline: outline-color outline-style outline-width|initial|inherit;
```

### CSS find active element

```javascript
document.activeElement
```

### CSS General

Class				String preceded by a period
ID					String preceded by a hash mark
div					Formats structure or block of text
span				Inline formatting
color				Foreground color
cursor				Appearance of the cursor
display				block; inline; list-item; none
overflow			How content overflowing its box is handled
					visible, hidden, scroll, auto
visibility			visible, hidden

### CSS Position

clear			Any floating elements around the element?
				both, left, right, none
float			Floats to a specified side
				left, right, none
left			The left position of an element
				auto, length values (pt, in, cm, px)
top				The top position of an element
				auto, length values (pt, in, cm, px)
position		static, relative, absolute
z-index			Element above or below overlapping elements?
				auto, integer (higher numbers on top)

### CSS Font

font-style			Italic, normal
font-variant		normal, small-caps
font-weight			bold, normal, lighter, bolder, integer (100-900)
font-size			Size of the font
font-family			Specific font(s) to be used

### CSS Background

background-color		Background color
background-image		Background image
background-repeat		repeat, no-repeat, repeat-x, repeat-y
background-attachment	Background image scroll with the element?
						scroll, fixed
background-position		(x y), top, center, bottom, left, right

### CSS List

list-style-type			Type of bullet or numbering in the list
						disc; circle; square; decimal; lower-roman; upper-roman; lower-alpha; upper-alpha; none
list-style-position		Position of the bullet or number in a list
						inside; outside
list-style-image		Image to be used as the bullet in a list

### CSS Text

letter-spacing		Space between letters
line-height			Vertical distance between baselines
text-align			Horizontal alignment
text-decoration		blink, line-through, none, overline, underline
text-indent			First line indentation
text-transform		capitalize, lowercase, uppercase
vertical-align		Vertical alignment
word-spacing		Spacing between words

### Box Model

height;
width;
margin-top;
margin-right;
margin-bottom;
margin-left;
padding-top;
padding-right;
padding-bottom;
padding-left;

### Border

border-width	Width of the border
border-style	dashed; dotted; double; groove; inset; outset; ridge; solid; none
border-color	Color of the border

### Setting a default browser outline

outline

### CSS Hiding an element

```css
.hidden {
	position:absolute;
	left:-10000px;
	top:auto;
	width:1px;
	height:1px;
	overflow:hidden;
}
```
