---
title: A Guide to Making Your Own Website
description: Making your own website, from domain to analytics
publishDate: 2024-05-22
tags:
  - technology
draft: false
pinned: false
---

Running a website has been a pretty big passion project of mine for a while now. My blog, [hyunwoo.org](https://hyunwoo.org), is now more than one year strong, together with two helpful subdomains - [jo.hyunwoo.org](https://jo.hyunwoo.org) and [go.hyunwoo.org](https://go.hyunwoo.org) - which act as a Link in Bio page and URL shortener respectively.

In this post, I am going to cover how you can create your own website from start to finish, including all of the tools and pages that I currently use. 

## Domains

First is to create your own domain, which is essentially your own, unique ‘name’ on the World Wide Web. Domains are, unfortunately, the only part of this entire process that is going to come at a cost, although they can be found for pretty cheap prices depending on which registrar and top-level domain (TLD) you opt for.

Important to note is that you do **not** need to buy a domain to set up a website, GitHub, Vercel, or even Notion (all described below) all provide a subdomain (e.g., `yoursite.example.com` ) under their domain name, but let’s say we want our own domain instead.

- What is a **registrar**? A registrar is essentially the company in which you register your own domain. Many registrars exist, but a few that I personally recommend are [Porkbun](https://porkbun.com/), [Dynadot](https://www.dynadot.com/), and [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/).
- What is a **top-level-domain (TLD)**? A TLD represents the ending or extension of a domain name, which include popular examples such as `.com`, `.net`, and `.org`. These are all examples of generic top-level domains (gTLDs), but there exists country-code top-level domains (ccTLDs) such as `.us` or `.kr`.

The first step, then, is to pick a domain that is available for registration and buy it through your registrar of choice.

### DNS Setup

Once you’ve purchased your domain, you may come across a page asking to set up your DNS records.

- What is the **Domain Name System (DNS)**? DNS is the phonebook of the Internet - each resource on the Internet is assigned a unique IP address (e.g., `192.168.0.1`), and the DNS makes it possible for users’ web browsers to be directed to that address when typing in a domain name like `example.com`.

Don’t worry - we’ll get to these later, most services nowadays make setting up the correct DNS records really, really easy.

## The Website

Now, let’s get into how you can create your own website. For the purposes of this post, let’s assume that we want to create a blog. Many solutions exist - both paid and free - and your choice may vary depending on ease-of-use and your needs.

### Paid Solutions

The easiest way to create your own website is by using popular website builders such as [Wix](https://www.wix.com/plans), [Squarespace](https://www.squarespace.com/), or [WordPress](https://wordpress.com/). You can simply buy a paid plan which usually include a free domain and get started with designing your website from the get-go, or with the case of WordPress (specifically [WordPress.org](https://wordpress.org/)), you can purchase web hosting through your registrar or providers such as [Bluehost](https://www.bluehost.com/).

The advantages of these solutions are their ease-of-use: purchase the right plan and you’re pretty much set. If you plan to integrate popular extensions, widgets, or platforms on your website, doing so is far easier and well-documented as well. Of course, if you’re running your website as a hobby project rather than for professional purposes, or lack the budget, you may want to look at a few alternative solutions that can be set up at no additional cost.

### Free Solutions

Continuing the subject of [WordPress.org](https://wordpress.org/), because it’s open-source software, you can also choose to self-host through your own computer, but this is outside the scope of this post as our goal is to minimize the amount of maintenance required.

A popular framework used for web development is [Bootstrap](https://getbootstrap.com/), which has numerous themes that you can use as a basis for your own website. It’s biggest advantage - and, perhaps, disadvantage - is that you get to design and customize your website from start to finish, which you may need some HTML, CSS, and JavaScript knowledge for.

There exists wonderful ‘crash courses’ for building and deploying a Bootstrap website - because it doesn’t need to be hosted on a server like some of the paid alternatives above, you can use [GitHub Pages](https://pages.github.com/) or [Cloudflare Pages](https://pages.cloudflare.com/) to deploy your website for free once you’ve set up a [GitHub](https://github.com/) repository.

Here is how to update your DNS records for GitHub Pages:

[Managing a custom domain for your GitHub Pages site - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)

### Using Notion!

What if we don’t want to go through all the effort of learning all of this? Could we possibly use Notion as a ‘database’ that stores our blog posts to be used for our website? The answer is yes!

With the help of open-source projects available on GitHub, we can create our own Notion-powered website in a matter of minutes. Here are a few popular projects:

- [GitHub - transitive-bullshit/nextjs-notion-starter-kit: Deploy your own Notion-powered website in minutes with Next.js and Vercel.](https://github.com/transitive-bullshit/nextjs-notion-starter-kit)
- [GitHub - morethanmin/morethan-log: 😎 A static blog using notion database](https://github.com/morethanmin/morethan-log)
- [GitHub - craigary/nobelium: A static blog build on top of Notion and NextJS, deployed on Vercel.](https://github.com/craigary/nobelium)
- **What I currently use:** [GitHub - tangly1024/NotionNext: 使用 NextJS + Notion API 实现的，支持多种部署方案的静态博客，无需服务器、零门槛搭建网站，为Notion和所有创作者设计。 (A static blog built with NextJS and Notion API, supporting multiple deployment options. No server required, zero threshold to set up a website. Designed for Notion and all creators.)](https://github.com/tangly1024/NotionNext)

These projects can be deployed by first cloning the repository on GitHub, setting up your Notion page, and deploying on [Vercel](https://vercel.com/). Most of them have detailed instructions on how to set them up.

If you are using Vercel, here is how to add and configure a custom domain:

[Adding & Configuring a Custom Domain](https://vercel.com/docs/projects/domains/add-a-domain)

## Link in Bio

Assuming, now, that we have some knowledge in how to set up a repository on GitHub and deploy a project on Vercel, we can apply these same steps to create a Link in Bio (a Linktree-like landing page). One popular project is [LittleLink](https://github.com/sethcottle/littlelink), which is what I use for [my own Link in Bio](https://jo.hyunwoo.org).

Once deployed on Vercel, you can use the same guide to add your domain to your project. If you’d like to, you can configure a subdomain (e.g., `jo.hyunwoo.org`) for these auxiliary websites and configure your DNS records accordingly.

## URL Shortener

This is something that was briefly mentioned in a previous post on [Why Websites?](Why%20Websites%2058d63c47865340e98b9bee661ed62a33.md), but like many of the examples mentioned above, we can use projects publicly available to set up our own URL shortener, like I do with `go.hyunwoo.org`. Some projects include:

- [GitHub - jstayton/suri: Your own link shortener that's easily deployed as a static site (for free)](https://github.com/jstayton/suri)
- [GitHub - xyTom/Url-Shorten-Worker: A URL Shortener created using Cloudflare worker](https://github.com/xyTom/Url-Shorten-Worker)
- [GitHub - Erisa/worker-links: A simple URL Shortener for Cloudflare Workers!](https://github.com/Erisa/worker-links)
- **What I currently use:** [GitHub - ccbikai/Sink: ⚡ A Simple / Speedy / Secure Link Shortener with Analytics, 100% run on Cloudflare.](https://github.com/ccbikai/Sink)

Some of these use [Cloudflare Workers](https://workers.cloudflare.com/), which you can set up by creating a Cloudflare account and creating a KV (key-value) namespace that will store your short and long URLs. You can then add a custom domain to the Worker through the following guide:

[Custom Domains · Cloudflare Workers docs](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#add-a-custom-domain)

## Email

Now let’s get into email! Email hosting is often available via paid solutions - a few that I recommend are [MXRoute](https://mxroute.com/) or [iCloud+](https://www.apple.com/icloud/) - the former of which I currently use - but you can also set up custom domain email addresses using the following for free as well.

- [Zoho Mail](https://www.zoho.com/mail/) (Forever Free Plan) - Up to five users, 5GB/user, access only via web and desktop/mobile apps
- [Cloudflare Email Routing](https://www.cloudflare.com/developer-platform/email-routing/) + SMTP Relays (such as [Mailjet](https://www.mailjet.com/)) + Gmail - Sets up a custom domain email address as an alias to a Gmail account
- [Daum SmartWork](https://mail.daum.net/smartwork) - 20GB/user, connected to your Daum email address, requires a Daum/Kakao account (primarily used in Korea)

Regardless of which service you use, make sure to set up DMARC, DKIM, and SPF - email authentication methods - if available, so that your emails don’t get marked up as spam. You can set these up via editing your DNS records; here is a quick guide to what they are and do:

[What are DMARC, DKIM, and SPF? | Cloudflare](https://www.cloudflare.com/learning/email-security/dmarc-dkim-spf/)

## Analytics and SEO

If you’d like to take your website a step further, you can set up analytics or search engine optimization (SEO) to better understand your users and optimize your website.

The first step is to set up [Google Search Console](https://search.google.com/search-console/about) which allows you to measure your website’s search traffic and performance on Google. If you’d like to set up web analytics, a few popular examples include [Google Analytics](https://marketingplatform.google.com/about/analytics/), [Fathom Analytics](https://usefathom.com/), [Plausible Analytics](https://plausible.io/), and [PostHog](https://posthog.com/).

Some of these services only have paid plans while others are available free as well - some projects on GitHub, if you decide to use them, may have support for specific web analytics tools.

## Conclusion

We now have a fully fledged website, link in bio, and email through our own custom domain. Having your own website is great because it’s one way to leave your own mark on the Internet.

Referring other people to your own domain, or emailing them using a custom email address, makes you look and sound more professional. Managing a website of your own is also a fun and educational experience, and hopefully this guide was somewhat helpful in getting started on your own.