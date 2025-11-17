# 🚀 Beginner's Guide: Deploy to GitHub Pages with Squarespace Domain

This guide will walk you through deploying your website to GitHub Pages and connecting it to your Squarespace domain. Don't worry if you're new to this - we'll go step by step!

## ⚡ Quick Start (TL;DR)

If you're experienced and just need the essentials:

1. **Push code to GitHub** → Create repo and push your code
2. **Enable GitHub Pages** → Settings → Pages → Source: GitHub Actions
3. **Configure DNS** → Add 4 A records pointing to GitHub IPs + 1 CNAME for www
4. **Add custom domain** → Settings → Pages → Enter your domain
5. **Wait** → DNS propagation takes 1-48 hours

**For detailed step-by-step instructions, continue reading below!**

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Prepare Your Code](#step-1-prepare-your-code)
3. [Step 2: Create a GitHub Repository](#step-2-create-a-github-repository)
4. [Step 3: Push Your Code to GitHub](#step-3-push-your-code-to-github)
5. [Step 4: Enable GitHub Pages](#step-4-enable-github-pages)
6. [Step 5: Set Up Custom Domain in Squarespace](#step-5-set-up-custom-domain-in-squarespace)
7. [Step 6: Configure DNS Settings](#step-6-configure-dns-settings)
8. [Step 7: Enable HTTPS](#step-7-enable-https)
9. [Step 8: Test Your Website](#step-8-test-your-website)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, make sure you have:

- ✅ A GitHub account (free) - [Sign up here](https://github.com/signup)
- ✅ Git installed on your computer - [Download here](https://git-scm.com/downloads)
- ✅ A Squarespace account with a domain
- ✅ Your website code ready (this project)

---

## Step 1: Prepare Your Code

### 1.1 Update Vite Configuration

The `vite.config.js` file has already been configured for GitHub Pages. If you're using a custom domain (not `username.github.io`), you may need to update the base path.

**For a custom domain (recommended):**
- The base path is already set to `/` which works for custom domains
- No changes needed!

**If using GitHub Pages subdomain (`username.github.io/repo-name`):**
- You would need to set `base: '/repo-name/'` in vite.config.js
- But since you're using a custom domain, you don't need this

### 1.2 Test Your Build Locally

Before deploying, test that your site builds correctly:

```bash
# Install dependencies (if you haven't already)
npm install

# Build your site
npm run build

# Preview the build locally
npm run preview
```

Visit `http://localhost:4173` to make sure everything looks good!

---

## Step 2: Create a GitHub Repository

1. **Go to GitHub**: Visit [github.com](https://github.com) and sign in
2. **Create New Repository**:
   - Click the **"+"** icon in the top right
   - Select **"New repository"**
3. **Repository Settings**:
   - **Repository name**: Choose a name (e.g., `macro-marketing-website`)
   - **Description**: Optional (e.g., "Macro Marketing company website")
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** check "Initialize with README" (you already have files)
   - Click **"Create repository"**

---

## Step 3: Push Your Code to GitHub

### Option A: Using GitHub Desktop (Easiest for Beginners)

1. **Download GitHub Desktop**: [desktop.github.com](https://desktop.github.com)
2. **Install and Sign In**: Use your GitHub account
3. **Add Your Repository**:
   - Click **"File" → "Add Local Repository"**
   - Navigate to your project folder
   - Click **"Add Repository"**
4. **Commit Your Files**:
   - You'll see all your files listed
   - Write a commit message: "Initial commit - website ready for deployment"
   - Click **"Commit to main"**
5. **Publish to GitHub**:
   - Click **"Publish repository"**
   - Make sure "Keep this code private" is **UNCHECKED**
   - Click **"Publish repository"**

### Option B: Using Command Line (Terminal)

Open Terminal (Mac) or Command Prompt (Windows) in your project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit - website ready for deployment"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your GitHub username  
**Replace `REPO_NAME`** with your repository name

---

## Step 4: Enable GitHub Pages

1. **Go to Your Repository**: Navigate to your repository on GitHub
2. **Open Settings**:
   - Click the **"Settings"** tab (top of the repository)
   - Scroll down to **"Pages"** in the left sidebar
3. **Configure GitHub Pages**:
   - **Source**: Select **"GitHub Actions"** (this will use the workflow we set up)
   - **Branch**: Leave as `main`
   - Click **"Save"**

4. **Wait for First Deployment**:
   - GitHub Actions will automatically build and deploy your site
   - This takes 2-5 minutes the first time
   - You'll see a yellow dot next to "Actions" tab - click it to watch progress
   - When it turns green ✅, your site is live!

5. **Find Your Site URL**:
   - Go back to **Settings → Pages**
   - You'll see: "Your site is live at `https://YOUR_USERNAME.github.io/REPO_NAME/`"
   - **Note this URL** - you'll need it for DNS configuration

---

## Step 5: Set Up Custom Domain in Squarespace

1. **Log into Squarespace**: Go to [squarespace.com](https://www.squarespace.com) and sign in
2. **Access Domain Settings**:
   - Go to **Settings** → **Domains**
   - Find your domain and click on it
3. **Disconnect from Squarespace Site** (if connected):
   - If your domain is connected to a Squarespace site, you'll need to disconnect it first
   - Go to **Settings** → **Domains** → Click your domain → **Disconnect**

**Important**: You can keep your Squarespace site running, but the domain will point to GitHub Pages instead.

---

## Step 6: Configure DNS Settings

This is the most important step! You need to tell your domain where to find your website.

### 6.1 Get Your GitHub Pages IP Addresses

GitHub Pages uses these IP addresses:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### 6.2 Configure DNS in Squarespace

1. **Go to DNS Settings**:
   - In Squarespace: **Settings** → **Domains** → Click your domain
   - Click **"DNS Settings"** or **"Advanced DNS"**

2. **Add A Records** (Point domain to GitHub):
   - Click **"Add Record"** or **"Add"**
   - **Type**: Select **"A"**
   - **Host**: Enter `@` (or leave blank, depending on Squarespace)
   - **Points to**: Enter `185.199.108.153`
   - **TTL**: `3600` (or default)
   - Click **"Add"** or **"Save"**
   
   **Repeat this 3 more times** with the other IP addresses:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

3. **Add CNAME Record** (for www subdomain):
   - Click **"Add Record"**
   - **Type**: Select **"CNAME"**
   - **Host**: Enter `www`
   - **Points to**: Enter `YOUR_USERNAME.github.io` (replace with your GitHub username)
   - **TTL**: `3600`
   - Click **"Add"** or **"Save"**

### 6.3 Configure Custom Domain in GitHub

1. **Go to GitHub Repository Settings**:
   - Navigate to **Settings** → **Pages**
   - Scroll to **"Custom domain"** section
   
2. **Enter Your Domain**:
   - Type your domain: `yourdomain.com` (without www or https://)
   - Click **"Save"**
   
3. **Wait for DNS Propagation**:
   - DNS changes can take 24-48 hours to fully propagate
   - Usually works within 1-2 hours
   - You can check status at: [whatsmydns.net](https://www.whatsmydns.net)

---

## Step 7: Enable HTTPS

GitHub Pages automatically provides free SSL certificates!

1. **Wait for DNS to Propagate**: Make sure your DNS is working first
2. **Enable HTTPS in GitHub**:
   - Go to **Settings** → **Pages**
   - Under **"Custom domain"**, check **"Enforce HTTPS"**
   - This may take a few minutes to enable
3. **Verify SSL**:
   - Visit `https://yourdomain.com`
   - You should see a padlock 🔒 in the browser

---

## Step 8: Test Your Website

1. **Test Your Domain**:
   - Visit `https://yourdomain.com`
   - Visit `https://www.yourdomain.com`
   - Both should work!

2. **Test All Pages**:
   - Home page: `https://yourdomain.com/`
   - About page: `https://yourdomain.com/about`
   - Contact page: `https://yourdomain.com/contact`

3. **Check Mobile View**:
   - Test on your phone
   - Use browser dev tools (F12) to test different screen sizes

---

## Troubleshooting

### Problem: "Site not found" or 404 Error

**Solutions**:
- Wait 24-48 hours for DNS to fully propagate
- Double-check your DNS settings match exactly
- Verify your GitHub Pages is enabled and deployed
- Check that your domain is entered correctly in GitHub Settings → Pages

### Problem: HTTPS Not Working

**Solutions**:
- Make sure DNS is fully propagated (check at whatsmydns.net)
- Wait a few hours after enabling HTTPS in GitHub
- Clear your browser cache
- Try incognito/private browsing mode

### Problem: Site Shows Old Content

**Solutions**:
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check GitHub Actions to ensure latest deployment succeeded

### Problem: CSS/Images Not Loading

**Solutions**:
- Make sure all file paths use relative paths (starting with `/`)
- Check browser console (F12) for 404 errors
- Verify all files are committed to GitHub
- Check that `vite.config.js` has correct base path

### Problem: GitHub Actions Build Fails

**Solutions**:
- Check the Actions tab for error messages
- Make sure `package.json` has correct scripts
- Verify all dependencies are in `package.json`
- Check that `vite.config.js` is valid

### Problem: Domain Not Connecting

**Solutions**:
- Verify DNS records are correct (use [dnschecker.org](https://dnschecker.org))
- Make sure you added all 4 A records
- Check CNAME record points to `username.github.io`
- Wait longer for DNS propagation (can take up to 48 hours)

---

## Updating Your Website

Every time you make changes:

1. **Make Your Changes**: Edit files locally
2. **Test Locally**: Run `npm run build` and `npm run preview`
3. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push
   ```
4. **Wait for Deployment**: GitHub Actions will automatically rebuild and deploy (2-5 minutes)
5. **Check Your Site**: Visit your domain to see changes

---

## Useful Links

- **GitHub Pages Docs**: [docs.github.com/pages](https://docs.github.com/pages)
- **DNS Checker**: [dnschecker.org](https://dnschecker.org)
- **SSL Checker**: [sslshopper.com/ssl-checker.html](https://www.sslshopper.com/ssl-checker.html)
- **GitHub Status**: [status.github.com](https://www.githubstatus.com)

---

## Quick Reference: DNS Settings Summary

**A Records** (4 total):
```
Type: A
Host: @
Points to: 185.199.108.153

Type: A
Host: @
Points to: 185.199.109.153

Type: A
Host: @
Points to: 185.199.110.153

Type: A
Host: @
Points to: 185.199.111.153
```

**CNAME Record** (1 total):
```
Type: CNAME
Host: www
Points to: YOUR_USERNAME.github.io
```

---

## Need Help?

If you get stuck:
1. Check the troubleshooting section above
2. Review GitHub Actions logs (Settings → Actions)
3. Verify DNS settings with online DNS checkers
4. Make sure all steps were followed correctly

**Remember**: DNS changes can take time! Be patient and wait 24-48 hours before assuming something is broken.

---

## Congratulations! 🎉

Your website is now live on GitHub Pages with your custom Squarespace domain! 

Every time you push changes to GitHub, your site will automatically update within a few minutes.

