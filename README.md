# Melodex

## Overview

Melodex is a frontend music player app inspired by the timeless feeling of using a classic iPod, while still embracing the convenience and flexibility of modern digital music experiences. The main idea behind the app is to blend nostalgic, retro-inspired design with today’s user expectations for customization, browsing, playlist creation, and profile personalization. Rather than feeling like just another music app, Melodex is designed to bring users back to what listening to music used to feel like: intentional, personal, immersive, and emotionally connected.

With its retro interface, iPod-style controls, themed UI options, and music-focused navigation, Melodex turns everyday music browsing into an experience. It captures the charm of older music devices while still offering features users now expect, such as account creation, playlist management, liked songs, profile settings, theme customization, and language preferences.

---

## Features

### Authentication
- Log in with a username and password
- Use the built-in demo account for quick access
- Sign up with a new account using:
  - first name
  - last name
  - email
  - username
  - password
- Newly created accounts are stored locally and can be used to log back in

### Home Player
- Main landing page after login is the music player
- Retro iPod-inspired layout and controls
- Displays:
  - album cover
  - song title
  - artist name
  - progress bar
- Controls include:
  - previous song
  - next song
  - center control button
  - menu button
- Heart button allows users to like a song and save it to the **Liked** playlist
- Menu allows access to:
  - language options
  - dark mode toggle

### Browse Music
- Browse music from the app’s hardcoded library
- Search by:
  - artist
  - album
  - title
  - country
  - category
- Search suggestions appear based on matching songs and artists
- Users can select a song and save it directly to one of their playlists

### Playlists
- View all available playlists
- Open a playlist to view its songs in more detail
- Create new playlists
- Edit playlists by removing songs
- Delete playlists
- Liked songs are automatically stored in the **Liked** playlist
- Share playlists through a popup with options such as:
  - Instagram
  - TikTok
  - Snapchat
  - Text Message

### Profile
- View and update profile settings
- Change:
  - profile picture
  - username
  - password
  - language
  - UI theme
- Email remains fixed and cannot be changed
- Logout functionality included

### UI Personalization
- Multiple UI looks inspired by retro and classic music player aesthetics
- Theme switching allows users to personalize the visual feel of the app
- Dark mode support is available
- Scroll functionality is preserved while hiding visible scrollbars for a cleaner mobile-style experience

### Mobile App Presentation
- Built to run in the browser but visually framed like an iPhone screen
- Creates the feel of using a real mobile music application while running locally with Vite

---

## What makes us special

What makes Melodex special is its focus on experience, not just functionality. Many music apps today prioritize efficiency, but Melodex is designed to make music feel personal again. Its identity comes from combining modern app interactions with the emotional and visual nostalgia of classic music devices.

Melodex stands out because it:
- recreates the retro joy of dedicated music players in a modern web app
- makes the interface itself part of the music experience
- gives users customization through themes, profile settings, and language options
- keeps the design visually nostalgic without sacrificing usability
- turns music listening into something intimate, memorable, and expressive rather than purely transactional

Instead of only streaming songs, Melodex aims to revive the feeling of discovering, saving, and listening to music with intention.

---

## How to run the app

Follow these steps to run Melodex locally on your machine.

### 1. Clone the repository
Open your terminal and run:

git clone https://github.com/reemaaboudraz/Melodex.git

cd Melodex
### 2. Install dependencies

'npm install'

This installs all required packages for the project.
### 3. Start the development server 
Run:

npm run dev

After this, Vite will display a local development URL in the terminal, usually something like:

http://localhost:5173/

Open the link in your browser.

### 4. Log In or Sign Up

Once the app opens, you can either use the demo account or create your own account.

- Demo account
Use the following credentials:

Username: musiclover
Password: 001

- Or create your own account
Click on the sign up option and fill in:

first name
last name
email
username
password

After signing up, you can log in using the same credentials you created.

### 5. Explore the App

After logging in, you can:

use the Home tab to interact with the retro-style music player
browse songs and search for music in the Browse tab
create, edit, and share playlists in the Playlists tab
update your preferences and customize the interface in the Profile tab

### Notes 

Melodex is currently a frontend-focused application
Music playback is simulated for interface and interaction purposes
User accounts and app data are stored locally for demo functionality
The project is designed to showcase the user experience, visual identity, and frontend interaction flow of the app
