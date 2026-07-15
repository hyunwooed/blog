---
title: Why Websites?
description: Why you should create (and develop) your own website
publishDate: 2023-04-21
tags:
  - technology
draft: false
pinned: false
---

As you may know, I use [hyunwoo.org](http://hyunwoo.org) for my blogs and my custom [Linktree](http://jo.hyunwoo.org) among other things. The question, you may ask, is why I need to own another domain if I have one already (or at all).

## Why get your own domain?

For one, domains (i.e., your own website) are a great way to make yourself known and recognizable to everyone else. Whether it be for blogs or as a place to host your resume or portfolio, it’s a nice to have when you can simply refer people to your own website in a professional manner.

Creating your own website has gotten incredibly easy over the years - you can use already available and popular tools such as WordPress, or in my case, using an [open source project on GitHub](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) to create a Notion-powered website, automatically updated and deployed using [Vercel](https://vercel.com).

### Email Hosting

Getting your own domain also means that you can create your own, personalized email address like the one I have in my [Contact](https://app.notion.com/p/0b9ab3ac3650486aa76d89307e0a135e?pvs=21) page. You can set up simple email forwarding using your domain registrar or use services like [ImprovMX](https://improvmx.com) to forward emails to your personal mail address - think of it as an alias of sorts. If you want to use the email address associated with your domain to also send emails, then these solutions are usually paid through the registrar or [Google Workspace](https://workspace.google.com).

In my case, I don’t need paid solutions but I still want to send emails on a few occasions through my new custom email, which is why I use [Zoho Mail](https://www.zoho.com/mail/) that gives me 5GB of free storage to use. It’s simple to use but one downside is that I have to use their client for sending and receiving emails on the free plan.

*Update:* I now use [Daum SmartWork (다음 스마트워크)](http://mail.daum.net/smartwork/) for my email hosting as it provides more storage - **20GB per user** for **free** - compared to other alternatives, also allowing SMTP access so I can use other email clients such as Outlook. Only two caveats is that the service is linked with your personal Daum Mail account (shared inboxes) and that the service is primarily in Korean, but other than that, I have been mostly satisfied! It does appear to take longer to send and receive emails than Zoho Mail, though.

## Subdomains

Okay, I already have my own website and email address associated with [hyunwoo.org](http://hyunwoo.org), my personal domain. But I also have subdomains - what are they and why do I need them? In short, subdomains are an addition under my “hyunwoo.org” URL, added as a prefix to the root domain name, like [jo.hyunwoo.org](http://jo.hyunwoo.org).

First of all, I have my custom Linktree at [jo.hyunwoo.org](http://jo.hyunwoo.org) (using [LittleLink](https://littlelink.io)) for shortcuts to important links, which I can use for other social media services such as Instagram. Additionally, I have a URL shortener at [go.hyunwoo.org](http://go.hyunwoo.org) because as you can probably see, links can get long - and to be able to share them on other websites or send it to other people (either verbally or in written format), it’s neater and far more simpler to use. For example, this link can also be accessed via [go.hyunwoo.org/15](http://go.hyunwoo.org/15) instead of the much longer link that can be found in the web browser.

Unfortunately, creating your own URL shortener on a tight budget is harder to do than a website, as most services require hosting them on a server (which means that I need to spend money, if remotely hosted). 

### ‘Serverless’ URL Shorteners

Then what are some solutions to creating your own URL shortener without spending any money at all? First is to use readily available, public URL shortener services that allow custom domains such as [Short.io](http://Short.io) and [Cutt.ly](http://Cutt.ly). These services, however, have limits in terms of features and how many links you can create. And that really isn’t the point of this endeavor at all - our goal is to create our *own* URL shortener without these arbitrary restrictions.

Here are a few solutions that I stumbled upon:

- [https://github.com/jstayton/suri](https://github.com/jstayton/suri) (edit a .json and deploy via Vercel)
- [https://github.com/xyTom/Url-Shorten-Worker](https://github.com/xyTom/Url-Shorten-Worker) (Cloudflare Workers, can use publicly)
- [https://github.com/supaflare/supaflare](https://github.com/supaflare/supaflare) (Supabase, Cloudflare Workers)
- [https://github.com/BetaHuhn/cf-worker-redirect](https://github.com/BetaHuhn/cf-worker-redirect) (Cloudflare Workers)
- [https://github.com/Erisa/worker-links](https://github.com/Erisa/worker-links) (Cloudflare Workers)

Any of these work pretty well, since I don’t plan to use my URL shortener as a public service, simply for me to shorten my own links. If you want to create a URL shortener of your own for others to use, I would suggest looking at other alternatives like Url-Shorten-Worker that creates a frontend (i.e., a static website) for others to enter their desired long URLs. Of course, if you have money floating around or can host your own servers, you can use projects like [https://github.com/yourls/yourls](https://github.com/yourls/yourls). 

## Conclusion

I realize that this was one of my lengthier posts, part of which is because I love domains, websites, and hosting them. If you want to try a project like mine of your own, feel free to use my own experience to apply for yourself! Once you have your own website, you can never go back 😉