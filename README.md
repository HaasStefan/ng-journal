<p align="center">
  <img src="./src/assets/ng-journal.png" width="100" alt="ng journal logo"/>
</p>
<h1 align="center">NG Journal</h1>
<h2 align="center">A Community Blog for Angular</h2>


NG Journal is a community blog for Angular with the goal to collect advanced blog posts on Angular written by community members, leaders and experts. 
The mission is to educate and spread opinions on advanced topics. NG Journal should be the place Angular developers go to when they are done with the basics 
and want to explore the ecosystem, patterns, best practices and new ideas.

This is an open source project for the Angular community created by the Angular community. If you have an idea for an advanced opinionated blog post, we would be happy to have you as a writer.

## How to become a writer

This is really simple. Clone this repository, create a new branch and create a markdown file in `/src/content/`. Have a look at the other blog posts in the directory 
and you will see that a blog post is just markdown with some extra front matter.

## Creating a Blog Post

1. `git clone https://github.com/HaasStefan/ng-journal.git`
2. `git checkout -b <my-blog-post>`
3. Create a markdown (.md) file like `/src/content/<slug>.md`
4. Add your meta data in the front matter like this:

```markdown
---
title: Module Boundaries with Nx
image: /cover-module-boundaries.png
imageAlt: Module Boundaries Cover Image
description: Module boundaries are a great way to enforce architectural rules in your monorepo and manage dependencies. They allow you to define strict boundaries, which can be used to enforce architectural rules and prevent accidental dependencies between modules.
date: 2023-12-21
slug: module-boundaries-with-nx
author:
  image: /stefan.png
  imageAlt: Stefan Haas portrait photo
  name: Stefan Haas
  github: HaasStefan
---
```

Note about the cover image. Please use a white background and a format of 1000x800 when possible. You could use Canva for this.

5. Write the content of the blog post below the front matter as plain markdown.
6. Run `npm run start` to startup a local instance of the blog and make sure everything looks good.
7. Have a look at spelling and grammar and submit the blog post by creating a Pull Request of your branch.
8. The PR will be reviewed ASAP and after comments are resolved and the branch is merged into master, your blog post wil be live 🎉

## Blog Post Ideas
- SSR and SSG with Analog
- Zoneless with RxAngular
- NgRx Signal Store
- Declarative State Management using StateAdapt
- Mixing RxJS and Signals

