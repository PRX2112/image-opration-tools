# Deploying to Vercel

Since you have already pushed your code to GitHub, deploying to Vercel is extremely straightforward. Vercel will automatically detect your Next.js app, install dependencies (including Linux binaries for `sharp`), and deploy it.

## Option 1: Vercel Dashboard (Recommended)

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in (continue with GitHub is easiest).
2.  **Add New Project**:
    *   Click the **"Add New..."** button (top right) -> **"Project"**.
3.  **Import Git Repository**:
    *   You should see your repository `PRX2112/image-opration-tools`.
    *   Click **"Import"**.
4.  **Configure Project**:
    *   **Framework Preset**: Should automatically detect `Next.js`.
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `next build` (default).
    *   **Output Directory**: `.next` (default).
    *   **Environment Variables**: You don't have any required secrets yet (Phase 9 will add some later), so leave this empty for now.
5.  **Deploy**:
    *   Click **"Deploy"**.
    *   Vercel will build your project. Wait for about 1-2 minutes.
    *   Once complete, you will get a live URL (e.g., `image-opration-tools.vercel.app`).

## Option 2: Vercel CLI

If you prefer using the command line:

1.  Install Vercel CLI:
    ```bash
    npm i -g vercel
    ```
2.  Run deploy command:
    ```bash
    npx vercel
    ```
3.  Follow the prompts:
    *   Set up and deploy? **Yes**
    *   Which scope? **(Select your account)**
    *   Link to existing project? **No**
    *   Project name? **image-opration-tools** (or press Enter)
    *   Directory? **./** (default)
    *   Want to modify settings? **No**

## Important Note on Image Processing (`sharp`)

Your project uses `sharp` for image resizing. Vercel's build system runs on Linux, so it will automatically install the correct Linux binaries for `sharp` during the build process (`npm install`). You do **not** need to do anything special.

## Verifying the Deployment

Once deployed, test the following to ensure the server-side image processing works:
1.  Go to your new Vercel URL.
2.  Navigate to **Image Resize**.
3.  Upload an image and click "Resize".
4.  If it works, the server-side API is functioning correctly!
