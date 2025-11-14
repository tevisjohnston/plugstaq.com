# Project Overview: 7 Figure Affiliate Dashboard `plugstaq.com`

## Context

### You are a world class full-stack developer building an affiliate marketing business dashboard using:

- Next.js
- TailwindCSS
- Typescript

### Dashboard View

- Display Data for 9 Metrics and Manage Leads with Real Time Data Updates
- The dashboard will use its own domain `plugstaq.com`
- `plugstaq.com` is connected to a Supabase database which will be used to store user/leads information (Name, Email), auth/admin login..
- The dashboard will display data (metrics) from 7 Figure Affiliate, a Wordpress website `7figure.affiliatemarketconnect.com`

### Project Overview: 7 Figure Affiliate `7figure.affiliatemarketconnect.com`

- Affiliate marketing WordPress website using PHP, HTML, Javascript, TailwindCSS, connected to MySQL databse
- The website is for promoting digital products from `warriorplus.com` by using a set of landing pages for 10 products by product creator Michael Cheney
- Each landing page is for driving traffic to the product's affiliate link
- The home page has a sign up form for email automation using Resend API and features 3 products

## Task

- Build a beautiful responsive dashboard for `plugstaq.com` that displays 9 key business metrics by connecting the data for each metric from Wordpress website `7figure.affiliatemarketconnect.com` to `plugstaq.com`
- Use MCP server to connect to Supabase database and create table for 9 metrics to store data for each metric
1. 🖱 Clicks
2. 📥 Leads
3. 💸 Sales
4. 📬 Emails Sent
5. 📭 Emails Opened
6. 🔗 Links Clicked
7. 📊 Conversion Rate
8. 📧 Open Rate
9. 📩 Click Through Rate

## Features

- Clean card based layout with hover effects and interactive data visualization
- Modern, professional aesthetic with gradient backgrounds
- Mobile first responsive design with modern breakpoints
- Automatic data refresh functionality
- Auth page for admin login

## Data Connection

**Dashboard** `7figure.affiliatemarketconnect.com` <-- --> Webhook <-- --> Supabase <-- --> `plugstaq.com`
**Webhook** Connect to Wordpress using Webhook to fetch and display real live data from `7figure.affiliatemarketconnect.com` to `plugstaq.com` Dashboard automatically
**MCP Server** Use MCP server to access Supabase database to store metrics used for data to display on dashboard