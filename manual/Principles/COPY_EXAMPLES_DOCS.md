---
name: COPY EXAMPLES DOCS
menu: Principles 
---
## Typedefs

<dl>
<dt><a href="#Item">Item</a> : <code>Object</code></dt>
<dd><p>Example item.</p>
</dd>
<dt><a href="#Media">Media</a> : <code>Object</code></dt>
<dd><p>Media typedef.</p>
</dd>
<dt><a href="#Card">Card</a> : <code>Object</code></dt>
<dd><p>! cardData</p>
</dd>
</dl>

<a name="Item"></a>

## Item : <code>Object</code>
Example item.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | Identifier for example. |

<a name="Media"></a>

## Media : <code>Object</code>
Media typedef.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to find the url. |
| alt | <code>String</code> | The alt string for the media. |
| title | <code>String</code> | The title for the media. |

<a name="Card"></a>

## Card : <code>Object</code>
! cardData

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cardType | <code>String</code> | The card type eg. Amex, VISA etc. |
| cardNumber | <code>String</code> \| <code>Number</code> | The CC number. |
| cardExpiry | <code>String</code> | The expiry date for a card. |
| [cardholderName] | <code>String</code> | Optional name associated with the card. |

