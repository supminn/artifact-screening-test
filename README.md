# User Profile details

This is a React application that contains a list of user details along with a user profile page.
User profile pages can create/update their details.

## Tech and dependencies

- ReactJS
- Vite for tooling
- React router (for routes)
- React hook form (for form validation)
- CSS for styling

## Local development setup

Clone this repository

```bash
git clone url
```

Install all the dependencies using

```bash
npm install
or
yarn
```

To start the local server

```bash
npm run dev
or
yarn dev
```

## Steps taken to design this app

From the problem statement, it was clear that we would have 2 views as separate pages. That's the reason I decided to go with react router.
I have additionally added a home page which consolidates the 2 views

1. User List (/users)
2. User Profile (/users/${userId})

As we maintain the user list within localStorage, it becomes necessary to keep this data updated as and when the user adds their updates. Thus, I decided to make use of react contextAPI (useContext) to maintain a global state of users' list.

Within the User Profile page, we display all the attributes in an editable format so that the user can update their details. The same component is used as a template if we want to create a new user. This is done by replacing the route `/users/${userId}` with `/users/new`.

I have a useEffect in place that would auto-populate the user's location based on the geoLocation API. We run this useEffect only once so that the user can override their input if they wish to do so.

Lastly, I wasn't clear about the `https://api-staging-0.gotartifact.com/v2/users/me` API functionality. Currently, I have added a button to "Populate User Data". When this button is clicked, the API is invoked to fetch the user details from the above API and overwrite the data. This should be followed with "Update" to update the global state and localStorage.
(Let me know if my understanding was incorrect on this part. I can improve it based on the discussion and clarificaiton)

## Screenshots of the App

Home Screen has 2 buttons to either view all the users or create a new user (route: /)
<img src="/public/assets/homeScreen.png" alt="home screen">

Viewing all users (route: /users)
<img src="/public/assets/userList.png" alt="user list">

Creating a new user or editing the details of an existing user (route: /users/${userId})
<img src="/public/assets/userProfile.png" alt="user profile">
