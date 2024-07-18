# Digital Music Library Documentation

## Overview

The Digital Music Library is a web application designed to visualize and manage artists and their albums. Users can view a list of artists, open albums to see detailed descriptions and song lists, and use an autocomplete search feature to quickly find specific artists, albums, or songs.

## Features

1. **Artists Management**:
   - View a list of all artists.
   - Add new artists.
   - Update existing artists.
   - Delete artists.

2. **Albums Management**:
   - View a list of all albums.
   - View a list of albums for each artist.
   - Add new albums.
   - Update existing albums.
   - Delete albums.

4. **Songs Management**:
   - View a list of all songs.
   - View a list of songs for each album.
   - Add new songs.
   - Update existing songs.
   - Delete songs.

6. **Autocomplete Search**:
   - Provides suggestions as users type in the search box.
   - Search for artists, albums and songs.

## Technology Stack

- **Frontend**: Angular
- **Backend**: Node.js with Express
- **Database**: MongoDB

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BogdanPurdea/Digital_Music_Library.git
   cd Digital_Music_Library
   ```

2. **Install backend dependencies**:
   ```bash
   cd api
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd client
   npm install
   ```
### Configure dbConfig.json and import data from data.json file 
   To configure the database connection, you need to create a dbConfig.json file in the api/data directory. This file should contain the following properties:
      -username: The username for the database connection.
      -password: The password for the database connection.
      -database: The name of the database you wish to connect to.
   Then run this command to import the data:
   ```bash
   cd api
   node data/importData.js
   ```

### Running the Application

1. **Start the backend server**:
   ```bash
   cd api
   npm start
   ```

2. **Start the frontend server**:
   ```bash
   cd client
   ng serve
   ```

3. **Open the application**:
   Open your browser and navigate to `http://localhost:4200`.
