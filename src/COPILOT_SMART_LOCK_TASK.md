Important instructions – read carefully before coding:

You are working on an existing frontend project (Vite).
You MUST NOT change the current UI style, layout, or structure.
You MUST follow the same coding patterns, folder structure, and logic already used in the project.
Before writing or modifying any code, always read the related existing files carefully (components, api files, routes, sidebar, navigator, etc.).

You should frequently re-check this prompt file to ensure you are still aligned with the required tasks and what has already been completed.

1️⃣ Sidebar – Smart checkin/checkout dropdown

There is a sidebar item named Smart checkin/checkout.

Under this item, add a dropdown (submenu).

Inside the dropdown, add a new page/link named:
my-smart-lock-request

Page behavior:

This page must be identical in UI style to the existing Orders page:

http://localhost:5174/client/orders


BUT:

❌ Do NOT include filters

✅ Keep cards, spacing, typography, colors, actions exactly the same as Orders

2️⃣ my-smart-lock-request API integration
API details:

Create a new JavaScript file inside:

/api


The file should be related to Smart Lock APIs (use the same naming style already used in the project).

Endpoint:
GET https://alrajihy.com/demo/turnivo/api/web/v1/site/my-smart-lock-request

Query Params:

access-token must be sent in query params

Example Response:
{
  "status": 1,
  "data": [
    {
      "items": [
        {
          "id": 48,
          "user": { ... },
          "property_id": { ... },
          "date": "2026-01-30",
          "time_from": "10:02:00",
          "time_to": "12:00:00",
          "price": 102,
          "payment_status": 0,
          "status": 0,
          "created_at": "2026-01-23 00:09:40"
        }
      ]
    }
  ]
}

Requirements:

Use the API function from the api folder

Import and use it inside the my-smart-lock-request component

Map and display the data using the same Orders UI

No filters

No UI changes

3️⃣ Smart checkin/checkout page – Checkin history (Dynamic)

Page:

http://localhost:5174/client/smart-checkin-checkout

Current state:

There is a bottom navigator

One of its tabs is Checkin history

UI already exists but is STATIC

Required:

Convert Checkin history to dynamic data from backend

Keep EXACT same UI

Only replace static data with API response

API:
GET https://alrajihy.com/demo/turnivo/api/web/v1/site/smart-lock-history

Query Params:

access-token

property_id

Rules:

Add this endpoint to the same Smart Lock API file

Use the same request pattern already used in the project

Bind the response to the existing UI (no redesign)

4️⃣ Checkout history (Same logic as Checkin history)

Next to Checkin history, there is Checkout history

Apply the same logic, structure, and UI

Use backend data instead of static content

Response format (both pages):
{
  "status": 1,
  "data": [
    {
      "items": [
        {
          "id": 22,
          "user": { ... },
          "property_id": { ... },
          "code": "2",
          "type": 2,
          "created_at": "2025-12-04 11:57:01"
        }
      ]
    }
  ]
}

Important:

Display data exactly according to current UI

No UI changes

No refactoring unless already used in similar pages

5️⃣ General strict rules

❌ Do NOT change existing UI or CSS

❌ Do NOT introduce new UI patterns

✅ Reuse existing components where possible

✅ Follow current folder & naming conventions

✅ Always check how Orders, Smart Lock, and History pages are implemented before coding

✅ After each step, re-read this prompt and verify alignment