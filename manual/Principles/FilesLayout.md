---
name: Files Layout
menu: Principles 
---
```bash
.
├── copy
│   └── theme
|       └── index.json
├── fonts
│   └── theme
|       └── brawls
|           └── files
├── img
│   └── theme
│       ├── backgrounds
│       ├── icons
│       └── sections?
├── styles
|   └── ... refer to styles structure
└── utils
    └── utilFolderName
        ├── index.js
        ├── package.json
        └── README.md
```

## Views and Components

```bash
.
└── app
    └── components
        └── ScreenOffers
            ├── index.js # includes reducer
            ├── package.json
            └── README.md
        └── ListOffers
            ├── index.js # stateless, no reducers
            ├── package.json
            ├── styles.scss
            ├── DOCS.md
            └── README.md
```

## Outstanding Challeneges

1.  Gulp tasks for React - how will we incorporate things like image compression effectively?
