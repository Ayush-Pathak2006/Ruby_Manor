# Ruby Manor 🏨✨

**Experience luxury like never before.** A full-stack hotel booking website featuring room and dining reservations, user authentication, and automated email confirmations. Built with React, Tailwind CSS, and Supabase.

**Live Demo:** http://rubymanor.netlify.app 

---

## 🌟 Features

* **Responsive Design:** Fully functional and visually appealing on desktops, tablets, and mobile devices using Tailwind CSS.
* **Room Booking:** Browse available rooms, select dates, view details, and book.
    * Automatic total cost calculation.
    * Real-time availability checks.
    * **Waitlist System:** Automatically adds users to a waitlist if a room is full for selected dates.
* **Dining Reservations:** Explore dining options, view menus, and reserve a table.
    * Per-person pricing calculation.
* **Secure User Authentication:**
    * Easy login/registration via **Google OAuth** powered by Supabase Auth.
    * New user profile setup (collecting full name).
    * Personalized greeting in the navbar.
* **Booking Management:** Dedicated "Your Bookings" page displaying confirmed room bookings, dining reservations, and waitlist status.
* **Automated Email Confirmations:** Securely sends booking/reservation confirmation emails using **Brevo** via Supabase Edge Functions.
* **Interactive UI:** Smooth animations (GSAP), user-controlled carousels (CSS Scroll Snap), and intuitive navigation.
* **Contact & Feedback:** Logged-in users can submit feedback directly to the database.
* **Dynamic Content:** Room details, dining options, and menus fetched directly from the Supabase database.

---

## 🛠️ Tech Stack

* **Frontend:**
    * React (Vite)
    * Tailwind CSS
    * React Router DOM
    * GSAP (for animations)
* **Backend & Database:**
    * Supabase
        * PostgreSQL Database
        * Authentication (OAuth)
        * Storage (for images)
        * Edge Functions (Deno/TypeScript)
* **Email Service:** Brevo (formerly Sendinblue)
* **Deployment:** Netlify

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ruby-manor.git](https://github.com/your-username/ruby-manor.git)
    cd ruby-manor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Supabase:**
    * Create a project on [Supabase](https://supabase.com/).
    * Use the SQL scripts provided in the project (or run the `CREATE TABLE` and `ALTER TABLE` commands from our chat) to set up the `rooms`, `dining`, `menu_items`, `bookings`, `reservations`, `waitlist_queue`, `profiles`, and `feedback` tables.
    * Enable Row Level Security (RLS) on all tables and apply the necessary policies (refer to our chat history for the SQL commands).
    * Upload images to Supabase Storage and update the `image_url` fields in your `rooms` and `dining` tables.
    * Configure Google OAuth provider in Supabase Authentication settings and get your Client ID/Secret from Google Cloud Console.
    * Update Authorized Redirect URIs in Google Cloud Console with your Supabase callback URL and your local development URL (e.g., `http://localhost:5173`).
    * Update the Site URL in Supabase Auth settings to your local development URL initially.

4.  **Set up Brevo:**
    * Create an account on [Brevo](https://brevo.com).
    * Verify your sender email address (e.g., `no-reply@yourdomain.com`).
    * Get your Brevo API Key (v3).

5.  **Environment Variables:**
    * Create a `.env` file in the root directory. **Do not commit this file!**
    * Add your Supabase public keys:
        ```env
        VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
        VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_PUBLIC_ANON_KEY"
        ```

6.  **Set up Supabase CLI & Edge Function:**
    * Install the [Supabase CLI](https://supabase.com/docs/guides/cli) using a supported method (Scoop, Homebrew, etc.).
    * Log in: `supabase login`
    * Link the project: `supabase link --project-ref YOUR_PROJECT_REF`
    * Set the Brevo API key secret: `supabase secrets set BREVO_API_KEY=YOUR_BREVO_API_KEY`
    * Deploy the email function: `supabase functions deploy send-confirmation-email --no-verify-jwt`

7.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the port specified) in your browser.

---

## 🔑 Environment Variables

The following environment variables are required to run the application:

* `VITE_SUPABASE_URL`: Your Supabase project URL.
* `VITE_SUPABASE_ANON_KEY`: Your Supabase public anonymous key.

For deployment (e.g., on Netlify), these variables must be set in the build environment settings. The `BREVO_API_KEY` must be set as a secret using the Supabase CLI (`supabase secrets set ...`).

---

## 📜 License

This project is licensed under Ayush Pathak