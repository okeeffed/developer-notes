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
        }, {
            id: 2
        }, {
            id: 3
        }
    ]

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
    }

    /**
     * ! backgroundImage
     * @type {Media} backgroundImage Example properties for any background image.
     */
    backgroundImage = {
        url: 'https://...',
        title: 'Unicorns gone wild background image',
        alt: 'Unicorns frolicking in the background'
    }

    /**
     * ! avatar
     * @type {Media} avatar Example avatar object for image avatars.
     */
    avatar = {
        url: 'https://...',
        title: 'Unicorns gone wild',
        alt: 'Unicorns frolicking'
    }

    /**
     * ! logo
     * @type {Media} avatar Example logo image object.
     */
    logo = {
        url: 'https://...',
        title: 'Unicorns gone wild',
        alt: 'Unicorns frolicking'
    }

    /**
     * ! video
     * @type {Media} video Example video object.
     */
    video = {
        url: 'https://...',
        title: 'Unicorns gone wild',
        alt: 'Unicorns frolicking'
    }

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
    subtitle = 'Dolorum fuga nobis sit natus consequatur. Laboriosam sapiente. Natus quos ut.';

    /**
     * ! body
     * @type {String} body The main body of text for a component/section.
     */
    body = 'Nemo tempore natus non accusamus eos placeat nesciunt. et fugit ut odio nisi dol' +
            'ore non ... (long text)';

    /**
     * ! description
     * @type {String} description The description of text for a component/section. Alternative is caption.
     */
    description = 'Vel et rerum nostrum quia. Dolorum fuga nobis sit natus consequatur.';

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
    }

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