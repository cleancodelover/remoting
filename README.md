## Installation
The project is done in such a way that, any user can sign up as an author and upload his books and other people will see it and read. Below is the entire process from installation to navigation. 
1. Clone the project to your local machine:
   ```bash
   git clone <project-repo-url>
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

- On the right side, you’ll find filters to help you easily find the books you want. Adjust these filters as needed.
- The book list appears on the right side of the page. There is no page navigation; the list scrolls infinitely as you continue to scroll.
- At the top, there is a search bar. You can search for books by title, author, or description.

### To Read a Book

- Click on any book item to view its details.
- To continue reading, click on the "Continue Reading..." button. A PDF of the book will open in a popup for you to read.
- To close the popup, click the "Close" button at the top right corner of the modal.

### To Review a Book

- On the book details page, there is a text area at the bottom. Type your review and click "Submit." Your review will be displayed immediately.

### To Rate a Book

- On the book details page, find the rating stars located in the middle of the page.
- Click on a star to rate the book. For example, clicking the first star will record a 1-star rating, the second star will record 2 stars, and so on up to 5 stars.

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

> **Note:** The frontend is highly responsive, though I didn’t have enough time to complete all features. However, what is available should give you a clear idea of my capabilities.

Thank you for reviewing!
```

Feel free to copy and paste this into your README file!