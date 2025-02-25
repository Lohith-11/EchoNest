# EchoNest

![EchoNest Logo](https://via.placeholder.com/150)

Welcome to EchoNest, a comprehensive travel listing platform built with the MERN stack. This project allows users to explore, create, and manage travel listings, complete with reviews and ratings.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and signup using Passport.js.
- **Travel Listings**: Create, read, update, and delete travel listings.
- **Reviews and Ratings**: Users can leave reviews and ratings for listings.
- **Search and Filter**: Search listings by country and filter by category.
- **Responsive Design**: Mobile-friendly design using Bootstrap.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, EJS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: Passport.js
- **File Uploads**: Multer, Cloudinary
- **Validation**: Joi
- **Session Management**: express-session, connect-mongo

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/echonest.git
    cd echonest
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a [.env](http://_vscodecontentref_/31) file in the root directory and add the following:
    ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    ATLASDB_URL=your_mongodb_atlas_url
    SECRET=your_session_secret
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

## Usage

- **Home Page**: View all travel listings.
- **Search**: Use the search bar to find listings by country.
- **Filter**: Use the filter options to view listings by category.
- **Create Listing**: Sign up or log in to create a new listing.
- **Edit/Delete Listing**: Edit or delete your own listings.
- **Reviews**: Leave reviews and ratings for listings.

## Environment Variables

Ensure you have the following environment variables set up in your [.env](http://_vscodecontentref_/32) file:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.


## License
This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for visiting EchoNest! If you have any questions or feedback, feel free to open an issue or contact us.

Happy traveling! 🌍✈️🏖️
