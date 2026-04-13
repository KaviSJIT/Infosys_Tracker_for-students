# Infosys Tracker for Students

A comprehensive student activity tracking platform built with HTML, CSS, and JavaScript.

## Project Structure

```
frontend/
├── index.html              # Landing page
├── login.html              # Login page with role selection
├── signup.html             # Registration page
├── dashboard.html          # Student dashboard
├── faculty_dashboard.html  # Faculty dashboard
├── reports.html            # Admin dashboard
├── css/
│   └── style.css           # Main stylesheet
└── js/
    ├── script.js           # Landing page interactions
    ├── auth.js             # Authentication & session management
    └── data.js             # Mock database
```

## Features

- **Role-based Authentication**: Student, Faculty, and Admin roles
- **Responsive Design**: Works on desktop and mobile devices
- **Secure Login**: With captcha verification
- **Dashboard Access**: Role-specific dashboards with different functionalities
- **User Registration**: Sign up new users with role selection
- **Session Management**: Automatic logout and session handling

## Default Users

For testing purposes, you can use these credentials:

### Student
- Email: student@infosys.com
- Password: password123

### Faculty
- Email: faculty@infosys.com
- Password: password123

### Admin
- Email: admin@infosys.com
- Password: password123

## How to Use

1. Open `index.html` in your browser
2. Click "Sign In" to go to the login page
3. Select your role (Student/Faculty/Admin)
4. Use the default credentials above or create a new account via "Sign up"
5. After login, you'll be redirected to your role-specific dashboard

## Authentication Flow

- **index.html** → **login.html** → Role-specific dashboard
- **signup.html** → **login.html** → Dashboard
- All dashboards include logout functionality that returns to login.html

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (ES6+)
- Local Storage for session management
- Responsive design with Flexbox/Grid

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Development

To modify the project:

1. Edit HTML files for structure
2. Modify `css/style.css` for styling
3. Update `js/auth.js` for authentication logic
4. Update `js/data.js` for mock data
5. Update `js/script.js` for landing page interactions

## Security Notes

This is a frontend-only demo application. In a production environment:

- User passwords should be hashed
- Authentication should be handled server-side
- Sensitive data should not be stored in localStorage
- HTTPS should be used for all communications