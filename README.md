
# 📚 Book Sharing Platform  

Welcome to the **Book Sharing Platform**, a user-friendly application designed to connect authors with readers. This platform allows anyone to sign up as an author, upload their books, and share them with a community of passionate readers. Readers can explore, discover, and read books directly on the platform. You can access it here https://sea-lion-app-jl247.ondigitalocean.app/

## ✨ **Design Philosophy**  
Simplicity, ease of use, and accessibility are at the heart of this project. The platform features a sleek dark theme to create a comfortable reading experience, especially for users who may spend extended periods immersed in books. The intuitive design ensures seamless navigation for both authors and readers.  

## ⚙️ **Technical Overview**  
The project is built with scalability and efficiency in mind, leveraging **MongoDB Cloud** for secure data storage. To facilitate easy testing and exploration, I have temporarily provided access to my MongoDB Cloud instance via the included `.env` file. **Note:** Access will be revoked soon for security purposes.  

## 📘 **Key Features**  
- **Author Accounts**: Sign up as an author, upload your books, and share them with the world.  
- **Reader Experience**: Browse and read books with an immersive, eye-friendly dark mode.  
- **Simple, Clear Navigation**: Designed for ease of access and smooth user experience.  

## 🚀 **Preview** 
You can preview the app on [here](https://sea-lion-app-jl247.ondigitalocean.app)

## 🚀 **Installation & Setup**  
Step-by-step instructions to set up the project locally, including dependencies, environment variables, and usage guidelines.  

1. Clone the project to your local machine:
   ```bash
   git clone https://github.com/cleancodelover/remoting.git
   ```
2. Navigate into the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Navigation

### Landing Page

- On the left side, you’ll find filters to help you easily find the books you want. Adjust these filters as needed.
- The book list appears on the right side of the page. There is no page navigation; the list scrolls infinitely as you continue to scroll fetching just chunks of data per time making it blazing fast.
- At the top, there is a search bar. You can search for books by title, author, or description.

### To Read a Book

- Click on any book item to view its details.
- To continue reading, click on the "Continue Reading..." button. A PDF of the book will open in a popup for you to read.
- To close the popup, click the "Close" button at the top right corner of the modal.

### To Review a Book

- On the book details page, there is a text area at the bottom. Type your review and click "Submit." You will need to login or signup to be able to carry out this action. Your review will be displayed immediately.

### To Rate a Book

- On the book details page, find the rating stars located in the middle of the page.
- Click on a star to rate the book. For example, clicking the first star will record a 1-star rating, the second star will record 2 stars, and so on up to 5 stars. You will need to login or signup to be able to do this.

### To Sign Up

- On the far right of the search bar, click the "user icon." If you're not logged in, a sign-in form will appear with a "Sign Up" button.
- If you haven’t signed up yet, click the "Sign Up" button (in blue), fill in the form, and click "Submit."
- To become an author and upload books, make sure to check the "Yes, I'm an author" checkbox before submitting.

### To Sign In

- Click the "user icon" on the far right of the search bar. In the dropdown, enter your email and password and click the "Sign In" button.
- A popup will notify you of the response after submitting.

### To Update Your Profile

- Once logged in, click the "user icon" to access a dropdown menu. Select "My Profile."
- In the profile page, you can upload your profile photo, edit your information, and click "Submit" to save changes.

### To Add a New Book

- On your profile page, the left column displays the books you have uploaded. If you haven’t uploaded any books yet, you will see a prompt indicating so.
- To add a new book, click the "plus" sign button in the search field on the top right. A form will appear to add a new book.
- Fill out the form (all fields marked with an asterisk are required) and click "Submit." Your new book will appear in your uploaded books list.

### To Update a Book

- On your uploaded books list, click the vertical 3 dots icon on the right side of each book.
- Select either "Edit" or "Delete" from the dropdown.
- In the popup that appears, update the book details and click "Submit" to save changes.

### To Delete a Book

- In the same dropdown from the previous step, click "Delete" and confirm to remove the book.

## API Description

The API is well-structured and located in the `src/app/api` folder. It is connected to a cloud MongoDB database for saving and retrieving data.

- **All endpoints** are secured with JWT for authentication.

> **Note:** The frontend is not very responsive, though I didn’t have enough time to make it a perfectly responsive app. However, my code organization and what is available should give you a clear idea of my capabilities. You can also check https://greenindie.com on your mobile to see another project I've worked on.

## 🎉 **Thank You!**  
This project reflects my passion for creating impactful, user-centric applications. I hope you find it as engaging and practical as I intended it to be.  

```