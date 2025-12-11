# XenTeck – AI Systems Snapshot Playbook

## Overview

The **XenTeck AI Systems Snapshot** flow connects the marketing site to an always-on automation pipeline:

1. A visitor lands on the `xenteck-landing` Next.js project.
2. They fill out and submit the Snapshot form on the landing page.
3. The form sends a POST request to `/api/snapshot`.
4. The `/api/snapshot` route forwards a JSON payload to `MAKE_WEBHOOK_URL`.
5. A Make.com scenario named **"XenTeck – AI Systems Snapshot"** receives the payload and processes the lead.

The JSON payload shape is:

```json
{
  "source": "xenteck-landing",
  "timestamp": "<ISO timestamp>",
  "name": "<string or empty>",
  "email": "<string or empty>",
  "website": "<string or empty>",
  "headache": "<string or empty>"
}
```

Env vars

MAKE_WEBHOOK_URL – Make.com custom webhook URL for the "XenTeck – AI Systems Snapshot" scenario.

Must be set in .env.local in the xenteck-landing project for local development.

Must also be configured in the hosting platform (e.g., Vercel) for production.

Google assets
Lead log spreadsheet

Spreadsheet name: XenTeck – AI Systems Snapshot Leads

Sheet/tab: Leads

Header row (A → H):

A: Date

B: Name

C: Email

D: Website

E: Biggest headache

F: Source

G: Raw timestamp

H: AI Summary

Docs

Snapshot Report Template:

Name: XenTeck – AI Systems Snapshot Report Template

Purpose: used as a structured template when writing manual or semi-automated Snapshot reports for a lead.

Snapshot Flow SOP:

Name: XenTeck – Snapshot Flow SOP

Purpose: internal documentation of how the Snapshot system is wired end-to-end (Next.js → Make → Google assets).
