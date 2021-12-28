---
menu: Next
name: Production Grade Next
---

# Production Grade Next

## Resources

1. [Production Grade Nextjs Website](https://production-grade-nextjs.vercel.app/)

## Recap Conventions

### Files

`Next.js` uses conventions based off the file system to make magic happen for us:

* `/pages` - any component here will create a route for your app as the name of the file.
* `/pages/api` - any function in here is an API function, remember, Next.js is about that fullstack life
* `/pages/[id]` - a page with a dynamic param named id.
* `/pages/_app` - your entry component. Perfect for all your `<Provider />` stuff and global css (optional).
* `/pages/_document` - basically your index.html (optional).

### Pages

Can tap into server side data fetching functions that Next.js provides. They control how to build and serve each page and handle any data requirements.

## Application Layout

This is hopefully going to be helpful for future reference:

```sh
.
├── README.md
├── components
│   ├── container.tsx
│   ├── docPane.tsx
│   ├── editor.tsx
│   ├── featureSection.tsx
│   ├── folderList.tsx
│   ├── folderPane.tsx
│   ├── githubIcon.tsx
│   ├── hero.tsx
│   ├── homeNav.tsx
│   ├── logo.tsx
│   ├── newDocumentDialog.tsx
│   ├── newFolderButton.tsx
│   ├── newFolderDialog.tsx
│   ├── postPreview.tsx
│   ├── socialButton.tsx
│   └── user.tsx
├── content.ts
├── db
│   ├── connect.ts
│   ├── doc.ts
│   ├── folder.ts
│   ├── index.ts
│   └── user.ts
├── env.local
├── middleware
│   ├── all.ts
│   ├── auth.ts
│   ├── db.ts
│   ├── error.ts
│   └── index.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── app
│   ├── blog
│   ├── index.tsx
│   └── signin.tsx
├── posts
│   ├── known-raises-series-a.mdx
│   ├── top-10-wiki-apps.mdx
│   ├── whats-next-for-known.mdx
│   └── your-team-needs-docs.mdx
├── public
│   ├── docs.png
│   ├── editor.png
│   ├── favicon.ico
│   └── vercel.svg
├── styles
│   └── globals.css
├── tsconfig.json
├── types.d.ts
├── types.ts
├── utils
│   ├── gradients.ts
│   └── isSSR.ts
└── yarn.lock
```

## Dynamic Content & Static Routes

The rule: **Content is data**.

Think of content as user data as well. Content should be dynamic.

We can solve this with things like a Headless CMS. 

We can inject the content from the CMS into the landing page using `getStaticProps`:

```ts
import { home } from '../content'

// at the bottom
export function getStaticProps() {
  return { props: { content: home.published } }
}
```

## Dynamic Content & Dynamic Routes

For dynamic props, we have an option to do something like the following:

```ts
// at the bottom
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  const paths = filenames.map((name) => ({ params: { slug: name.replace('.mdx', '') } }))
  // dont get paths for cms posts, instead, let fallback handle it
  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  // read the posts dir from the fs
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  // get each post from the fs
  const filePosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    return fs.readFileSync(filePath, 'utf8')
  })
  
  // merge our posts from our CMS and fs then sort by pub date
  const posts = orderby(
    [...postsFromCMS.published, ...filePosts].map((content) => {
     // extract frontmatter from markdown content
      const { data } = matter(content)
      return data
    }),
    ['publishedOn'],
    ['desc'],
  )

  return { props: { posts } }
}
```

This **is not** production grade, but it does show how we can use `getStaticProps` and `getStaticPaths` to get the paths required.

> Next.js removes all serverside code - it gets executed on the server but not bundled in the browser. They can be used in those special Node.js functions.

We must use `getStaticPaths` with any page that has a parameter. All we're doing here is reading all the post from the file system and returning all the slugs. We're purposefully not getting the slugs for the posts from the CMS. That could take a long time depending, on how many we have there. So instead, we're going to use `fallback: true`. This prevents a 404 to a page that has not be statically rendered at build time, and then fetches that page on demand only to statically generate and cache it for future request. Your page will be notified when this happens so you can show a loading screen if you'd like. Its basically on demand static generation. If you're not a fan of the loading screen while your page builds, you can use `fallback: blocking` that does the same thing, except, the router won't transition until the page is rendered. Very much like `getServerSideProps`. The flexibility here is amazing. As you'll see in a later lesson, we can even query a database to get our data without hitting an API.

## Preview Content

To enable preview, we have to make an API route that sets a cookie that tells our pages that the incoming request is a preview request at `/api/preview?route={appRouteToPreview}`.

```ts
import { NextApiResponse } from 'next'

export default function handler(req, res: NextApiResponse) {
  // sets the preview cookie
  res.setPreviewData({})
  // redirects to the page you want to preview
  res.redirect(req.query.route)
}
```

To remove preview, we can use another route to clear the cookie at `/api/clear-preview`:

```ts
export default function handler(req, res) {
  // clears the preview cookie
  res.clearPreviewData()
  res.end('preview disabled')
}
```

## Fetching draft content

We can now fetch draft content using the following:

```ts
export function getStaticProps(ctx) {
  const content = ctx.preview ? home.draft : home.published
  return { props: { content } }
}
```

> If this were a real API call to a CMS, you'd just change a parameter to `draft: true` or whatever that CMS says when querying for draft content.

Now for the steps to view the preview content:

1. Initiate the preview by going to: `/api/preview?route=/` in your browser. 
2. You will be redirected back to the landing page but, with preview content.
3. When you want to see the pubslished content, go to `/api/clear-preview` in your browser. You won't be redirected this time. So just go to `/` to see the landing page with published content.

An example of this in action for the blog:

```ts
export async function getStaticProps(ctx) {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  // check that preview boolean
  const cmsPosts = ctx.preview ? postsFromCMS.draft : postsFromCMS.published
  const filePosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    return fs.readFileSync(filePath, 'utf8')
  })
  
  const posts = orderby(
    [...cmsPosts, ...filePosts].map((content) => {
      const { data } = matter(content)
      return data
    }),
    ['publishedOn'],
    ['desc'],
  )

  return { props: { posts } }
}
```