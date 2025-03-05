# Perlitch-Transport-Task-Dinesh
Angular Task for Perlitch Transport

The repository contains the fully coded Angular application for the given Angular task at hand. 

## Features

- **Fixed Layout:**  
  Header (with company name and auth button), menu, main content area, and fixed footer.

- **Authentication & Token Renewal:**  
  - Sign-in modal with username/password fields.
  - Token stored in cookies (expires in 7 minutes) and renewed every 5 minutes.
  - If a renewal request returns 401, the sign-in form is displayed.

- **Navigation:**  
  - Menu displays "Contacts" for everyone and "Shipments" only for authenticated users.
  - Clicking the company name navigates to the Contacts (home) page.

- **Pages:**  
  - **Contacts:** Displays company information.
  - **Shipments:** Shows a table of shipments with details. Authenticated users can change the shipment status.

## API Endpoints

- **Login:**  
  `POST /api/tests/v1/login`  
  *Payload:* `{ "login": "User1", "password": "12345" }`

- **Shipments:**  
  - **List (Auth):** `GET /api/tests/v1/shipments/list`  
  - **Share List (Open):** `GET /api/tests/v1/shipments/share/list`  
  - **Update Status:** `POST /api/tests/v1/shipments/status?uuid=<shipment_id>`  
    *Payload:* `{ "status": "New" }` (Requires HTTP Bearer token)

- **Status (Token Renewal):**  
  `GET /api/tests/v1/status`
