---
title: Setting up iCloud Custom Email Domains
description: Setting up iCloud Custom Email Domains with iCloud+
publishDate: 2024-08-30
tags:
  - technology
draft: false
pinned: false
---

# Setting up iCloud Custom Email Domains

As a follow-up on my previous post on A Guide to Making Your Own Website, setting up a custom domain to create your own, personalized email address is one of the strongest reasons to buy a domain. One may, at first, be overwhelmed by the number of choices there are in terms of email hosting - but today, I’m going to go through how to set up a custom email domain with iCloud Mail using an [iCloud+ subscription](https://www.apple.com/icloud/).

## Preface

Before we get started, it’s important to first think about what you **need** from an email provider. Many people use their email for more than just email, for example, for managing their calendar and contacts, and it’s important that these functionalities, should you need them, integrate with your current suite.

For example, I live by Outlook, and admittedly, this solution isn’t the prettiest if you’d like perfect integration like you would with your Microsoft accounts: managing your calendar and responding to invitations, to name a few. If you need these things to work like you expect - and are used - to, I recommend simply looking at what your existing email provider or solution has to offer. Microsoft offers their cheapest [Exchange Online](https://www.microsoft.com/en-us/microsoft-365/exchange/exchange-online) plan at $4, which will integrate nicely with Outlook.

## [iCloud+](https://www.apple.com/icloud/)

Why, then, use iCloud+? First is that if you own an Apple device, iCloud+ offers a few solid perks that make the subscription worth its money even without the custom email.

- **Storage:** First is storage: the free tier of iCloud offers 5GB of storage versus 50GB on the cheapest tier. That extra storage can be really helpful if you want to back up your photos, videos, and files in the cloud.
- **Pricing:** iCloud+ is a great value when compared to other providers. The cheapest tier (50GB) comes only at $0.99 a month, with the 200GB and 2TB tiers at $2.99 and $9.99 respectively.
- **‘Quality of Life’ Features:** iCloud+ also offers some other features like iCloud Private Relay and Hide My Email that work to increase user privacy.

Of course, these are all served best if you do have an Apple device and use its ecosystem on a daily basis.

## Setup

First, let’s add our domain to iCloud Mail. You will need an Apple ID (with two-factor authentication) and iCloud Mail set up (i.e., an `@icloud.com` email address) to start. Then, add your domain and set up your email address following this guide:

[Add an email domain you already own to iCloud Mail on iCloud.com](https://support.apple.com/guide/icloud/add-a-domain-you-own-mma473945269/icloud)

- Some registrars will automatically attempt to change your DNS records; for manual configuration, see the guide below.

[Set up an existing domain with iCloud Mail - Apple Support](https://support.apple.com/en-us/102374)

### Set as default email address

If you’d like to set the new email address that we’ve just set up as your default email address, follow this guide.

[Choose a default email address to send mail from on iCloud.com](https://support.apple.com/guide/icloud/choose-a-default-email-address-mmbffbba6600/1.0/icloud/1.0)

## Using Outlook

If you already use the Mail and Calendar apps that are built-in with your Apple devices, you should be done! But what if I want to add this new email address to another third-party client, let’s say, Outlook?

### General (Mac and iOS)

To set up on Microsoft Outlook for Mac or iOS, we first need to set up our account as an IMAP account as Outlook currently does not natively support iCloud Custom Email Domains. Make sure to generate an app-specific password beforehand, and refer to the following guides for more information.

[iCloud Mail server settings for other email client apps - Apple Support](https://support.apple.com/en-us/102525)

[Sign in to apps with your Apple ID using app-specific passwords - Apple Support](https://support.apple.com/kb/HT204397)

When adding your new email address itself, enter your new iCloud Custom Email address and the following server settings. You may need to **disable syncing your account to the Microsoft Cloud** if setup fails.

**IMAP information for the incoming iCloud Mail server**

- Server name: `imap.mail.me.com`
    - SSL Required: Yes
        - _If you see an error message when using SSL, try using TLS instead._
- Port: `993`
- Username: This is usually the name of your iCloud Mail email address (for example, `johnappleseed`, not `johnappleseed@icloud.com`). If your email client app can't connect to iCloud Mail using just the name of your email address, try using the full address.
- Password: Generate an app-specific password.

**SMTP information for the outgoing iCloud Mail server**

- Server name: `smtp.mail.me.com`
- **Encryption Method: `STARTTLS`**
- Port: `587`
- SMTP Authentication Required: Yes
- Username: Your full iCloud Mail email address (for example, `johnappleseed@icloud.com`, not `johnappleseed`)
- Password: Use the app-specific password that you generated when you set up the incoming mail server.

### Windows

Setting up on iCloud is a little trickier. First, the new Outlook for Windows (PWA) does **not** currently work with iCloud Custom Email Domains, so make sure to use the Classic versions often included with Microsoft 365 (Office) subscriptions.

In Outlook, set up an IMAP account **using your iCloud address** - **not** your custom email address - using the same server settings above.

Now, after you’ve completed setting up your new account, close Outlook and open Registry Editor, navigating to: 

`HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\Profiles<your profile name>`. 

Press `F3` and search for your iCloud email address, and edit the `Email` field with your **custom email address**. Relaunch Outlook and you should be done - credits to a user on the following Microsoft Community post!

[https://answers.microsoft.com/en-us/outlook_com/forum/all/use-icloud-custom-email-domain-with-outlook-for/41430ce7-c4c0-4aa0-9b53-10c7b1309129?page=4](https://answers.microsoft.com/en-us/outlook_com/forum/all/use-icloud-custom-email-domain-with-outlook-for/41430ce7-c4c0-4aa0-9b53-10c7b1309129?page=4)

## Google Services

If you also want to use your new Custom Email with Google services such as Google Drive to collaborate on Docs or Sheets, you can also add your new email address as an alternate email using the link below.

[https://myaccount.google.com/alternateemail](https://myaccount.google.com/alternateemail)

Note that if you are using a Google Account that already has Gmail set up, people will be seeing your Gmail address instead of your alternate, custom email one. 

If you don’t want this, you can set up a new Google Account without a Gmail address by clicking on “**Use your existing email**” in the signup page and use your custom email address instead.
