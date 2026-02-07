# MilkTrack - Milk Delivery Tracking System

MilkTrack is a modern web application to digitize the daily milk delivery tracking between Customers and Milk Providers.

## Features

### For Customers
- **Live Tracking**: See where your provider is in real-time (simulated).
- **Daily Request**: Easily set your required milk quantity for the day.
- **Extra Requests**: Request extra milk for special occasions.
- **History**: View your past deliveries and requests.

### For Providers
- **Stock Management**: Manage your daily milk availability.
- **Route Management**: View today's delivery list and mark them as delivered.
- **Extra Requests Inbox**: Accept or reject extra milk requests based on stock.
- **Delivery History**: Keep track of all your deliveries.

## Tech Stack
- React (Vite)
- Tailwind CSS
- Lucide React (Icons)
- React Router DOM
- LocalStorage (Mock Backend)

## How to Run

Since you are running this locally:

1.  **Install Node.js**: Ensure you have Node.js installed on your machine.
    [Download Node.js](https://nodejs.org/)

2.  **Install Dependencies**:
    Open a terminal in this directory and run:
    ```bash
    npm install
    ```

3.  **Start the Server**:
    Run the development server:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `http://localhost:5173` (or the URL shown in the terminal).

## Demo Credentials (or Register New)

**Provider Flow:**
1. Register as a **Provider**.
2. Copy your **Provider ID** from the Dashboard or Profile.
3. Logout.

**Customer Flow:**
1. Register as a **Customer**.
2. Enter the **Provider ID** you copied.
3. Request milk!
