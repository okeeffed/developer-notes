---
name: Copy
menu: Principles 
---
# Copy JSON naming conventions

![Image structure](https://res.cloudinary.com/gitgoodclub/image/upload/w_1228,h_2012/copy-structure.png)

## Notes on the schematic design

The aim for this is the have consistent, repeatable rules for naming variables that are use for data.

An example use case for this structure is to be able to take a `copy.json` file and convert it in a CMS schema for something like DatoCMS quickly and reliably.

The import notes on this at the moment is that the `maps` and `copy` type definitions are currently subjective.

My current thought would be that the `copy` variable names such as `title`, `subtitle` etc should follow English literature structure, although I currently do not have a good grasp on whether or not I am missing a lot of depth of the use cases are not the best for the name I have given it. This is arguably the most flexible area since you will have things to name such as form titles etc. These are more just consistent guidelines for the main parts we define on components/sections/pages.

In the case of `maps`, the issue is that I am going off the DatoCMS schema for the others but I have not confirmed if the DatoCMS schema for maps is using `lat` and `lon` as seperate strings or if they are part of a greater object.

Obviously there will be more use cases down the track that need to be defined, but being able to keep it consistent with `type definitions` as best as possible will mean that we can implement these types into other languages as `typedefs`, `interfaces` and `protocols`.

Other problems that may arise is when copy schematics do not match those of DatoCMS for the quick upload. In these cases, a further job down the track such as a GraphQL interim may fix this issue for us, but I have gone with DatoCMS as they follow the schema set at http://json-schema.org/.

Useful links for us to think about:

http://json-schema.org/
https://google.github.io/styleguide/jsoncstyleguide.xml

### Schematic levels

The last requirement for the schematic is that I do not want to go further than three levels deep. The first level being the defining copy object factor for where the data relates too, the second being the naming conventions set below.

The obvious break to this rule is when we have an array of objects. When it comes to these arrays of objects, the thought of the `one-to-many` relationship is to think of it from an entity relationship point of view and that these individual objects that form the `many` will themselves end up their own type on a CMS.

Example a single component that refers to many users. Each of these users in a CMS will form its own entity and be defined as such.

Example: type ListPage in the CMS refers to many of type User in the CMS to form the one-to-many relationship.

## Typed definitions below

```javascript
export default class CopyTypeDefs {
  // ! Array of objects

  /**
   * @typedef {Object} Item Example item.
   * @property {Number} id Identifier for example.
   */

  /**
   * ! items: Array<Object>
   * @type {Item[]} items Item Array.
   *
   * @memberof CopyTypeDefs
   */
  items = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ];

  // ! Images + videos

  /**
   * @typedef {Object} Media Media typedef.
   * @property {String} url The url to find the url.
   * @property {String} alt The alt string for the media.
   * @property {String} title The title for the media.
   */

  /**
   * ! image
   * @type {Media} image Example image object.
   */
  image = {
    url: 'https://...',
    title: 'Unicorns gone wild',
    alt: 'Unicorns frolicking'
  };

  /**
   * ! backgroundImage
   * @type {Media} backgroundImage Example properties for any background image.
   */
  backgroundImage = {
    url: 'https://...',
    title: 'Unicorns gone wild background image',
    alt: 'Unicorns frolicking in the background'
  };

  /**
   * ! avatar
   * @type {Media} avatar Example avatar object for image avatars.
   */
  avatar = {
    url: 'https://...',
    title: 'Unicorns gone wild',
    alt: 'Unicorns frolicking'
  };

  /**
   * ! logo
   * @type {Media} avatar Example logo image object.
   */
  logo = {
    url: 'https://...',
    title: 'Unicorns gone wild',
    alt: 'Unicorns frolicking'
  };

  /**
   * ! video
   * @type {Media} video Example video object.
   */
  video = {
    url: 'https://...',
    title: 'Unicorns gone wild',
    alt: 'Unicorns frolicking'
  };

  // ! Colours
  /**
   * ! color
   * @type {String} color Hex font color.
   */
  color = '#000FFF';

  /**
   * ! backgroundColor
   * @type {String} backgroundColor Hex background color.
   */
  backgroundColor = '#000FFF';

  // ! Copy
  /**
   * ! title
   * @type {String} title The main title for a component/section.
   */
  title = 'Systematic nobis';

  /**
   * ! subtitle
   * @type {String} subtitle The second main heading for component/section.
   */
  subtitle =
    'Dolorum fuga nobis sit natus consequatur. Laboriosam sapiente. Natus quos ut.';

  /**
   * ! body
   * @type {String} body The main body of text for a component/section.
   */
  body =
    'Nemo tempore natus non accusamus eos placeat nesciunt. et fugit ut odio nisi dol' +
    'ore non ... (long text)';

  /**
   * ! description
   * @type {String} description The description of text for a component/section. Alternative is caption.
   */
  description =
    'Vel et rerum nostrum quia. Dolorum fuga nobis sit natus consequatur.';

  //! Time
  /**
   * ! timestamp
   * @type {Date} timestamp A date object.
   */
  timestamp = new Date();

  /**
   * ! time
   * @type {String} time A time string.
   */
  time = '03:08:02';

  /**
   * ! date
   * @type {String} date A date string.
   */
  date = '2001-07-06';

  // ! Credit Cards
  /**
   * ! cardData
   * @typedef {Object} Card cardData definition
   * @property {String} cardType The card type eg. Amex, VISA etc.
   * @property {String|Number} cardNumber The CC number.
   * @property {String} cardExpiry The expiry date for a card.
   * @property {String} [cardholderName] Optional name associated with the card.
   */
  /**
   * @type {Card} cardData The card data.
   */
  cardData = {
    cardType: 'American Express',
    cardNumber: '4716506247152101',
    cardExpiry: '03/04',
    cardholderName: 'D P O’KEEFFE'
  };

  // ! Maps
  /**
   * ! lat
   * @type {Number} lat Latitude.
   */
  lat = -33.8688;

  /**
   * ! lon
   * @type {Number} lon Longitude.
   */
  lon = 151.2093;
}
```

## Applying this to copy.json

For each component that requires it's copy definition, define that into a schema with a unique name on the first level to know where to apply it and have the schema apply from the levels below:

```json
{
  // onboarding = id for reference component
  "onboarding": {
    // second level = where our schema rules start to apply
    "items": [
      {
        "title": "Name",
        "description": "Hello! Let's start with your name.",
        "value": "name"
      },
      {
        "title": "Email",
        "description": "Now we need your email to set a login.",
        "value": "email"
      },
      {
        "title": "Password",
        "description": "Lastly, let's set a password.",
        "value": "password"
      }
    ]
  },
  "loginPage": {
    // second level = where our schema rules start to apply
    "emailTitle": "Email",
    "emailPlaceholder": "you@example.com",
    "passwordTitle": "Password",
    "ctaButton": "Log in",
    "forgotPassword": "Forgot password?",
    "privacyPolicy": "Privacy policy",
    "backgroundImage": {
      "url": "https://res.cloudinary.com/gitgoodclub/image/upload/v1537942627/wtb9sg81buutng40ryty.jpg",
      "title": "Image",
      "alt": "Image"
    },
    "logo": {
      "url": "https://res.cloudinary.com/gitgoodclub/image/upload/v1537409347/ssv85yzk2echp7rcxe6f.png",
      "title": "Logo",
      "alt": "Logo"
    }
  },
  "landingPricing": {
    // second level = where our schema rules start to apply
    "title": "Quia ut",
    "subtitle": "Et perferendis numquam sed blanditiis omnis et.",
    "image": {
      "url": "https://res.cloudinary.com/gitgoodclub/image/upload/v1537409347/w5mohkx26mqihiammogk.png",
      "title": "at",
      "alt": "tenetur"
    }
  }
}
```
