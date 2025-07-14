# Restaurant-Reservation-System_React-Vite.js_Java-SpringBoot_MySQL

This is a restaurant reservation system project built using Java Spring Boot for the backend and React with Vite.js for the frontend. The system uses MySQL as the database and follows a multi-layered architecture to ensure modularity and maintainability.

The project supports multiple user roles, including:

- Admin

- Manager

- Restaurant Owner

- Customer

Quota Manager (a special user role that can increase reservation quotas)

Each user has access to their own dedicated dashboard panel, designed with React to provide a smooth and interactive GUI experience. CRUD operations for all users are seamlessly handled through the Spring Boot backend, which exposes well-structured RESTful APIs.

The MySQL database has been designed to support complex relationships and high levels of data interaction, ensuring the system performs reliably even with extensive user activity.

This full-stack project demonstrates the integration of a modern frontend with a robust backend and is suitable for real-world restaurant reservation management scenarios.
# React + Vite Project Setup

This project uses Vite for fast and efficient React development. 
## Installation

Follow the steps below to set up the project:

### 1. Install node.js

Go to the this website: https://nodejs.org/en

And download and install 'node.js'.

### 2. Initialize a React + Vite Project

Open your terminal or command prompt and run the following command to create a new Vite project:

```sh
npm create vite@latest my-react-app --template react
```

Replace `my-react-app` with your desired project name like our project name 'rrsystem-frontend'.

### 3. Navigate to the Project Directory

```sh
cd rrsystem-frontend
```

### 4. Install Dependencies

```sh
npm install
```

### 5. Add Required Libraries

Install FontAwesome and Schedule-X Theme Default:

```sh
npm install @fortawesome/fontawesome-free
npm install @schedule-x/theme-default
```

Then, import the required CSS files in your `main.jsx` or `App.jsx` file:

```js
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@schedule-x/theme-default/dist/index.css';
```

Additionally, ensure that `Calendar.jsx` includes the Schedule-X theme import:

```js
import "@schedule-x/theme-default/dist/index.css";
```

### 6. Start the Development Server

To run the project, use the following command:

```sh
npm run dev
```

### Key Directories and Files

- **public/**: Contains static files and the main HTML file that serves as the entry point for the application.
- **src/**: Contains all the source code for the application, including components, pages, styles, and assets.
- **components/**: Houses reusable React components that can be used across different pages.
- **pages/**: Contains page-specific components, organized by feature or section.
- **styles/**: Includes global styles and CSS files.
- **assets/**: Stores images and other static assets used in the application.
- **App.jsx**: The main application component that sets up the routing and layout.
- **main.jsx**: The entry point for the React application, where the app is rendered to the DOM.
- **Calendar.jsx**: Ensure this file includes `import "@schedule-x/theme-default/dist/index.css";` for styling.

This structure helps keep the project organized and makes it easier to maintain and scale. Adjust the structure and descriptions as needed to fit your specific project setup.

## Additional Information

### Using TypeScript
If you want to work with TypeScript, initialize the project with:

```sh
npm create vite@latest rrsystem-frontend --template react-ts
```

### ESLint and Prettier Integration
To improve code quality, you can install ESLint and Prettier:

```sh
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier -D
```

Then, configure your `.eslintrc.cjs` file accordingly.

### Building the Project
To compile the project for production:

```sh
npm run build
```

This command generates optimized files in the `dist/` directory.

---
This README provides a quick start guide for React + Vite. For more details, check out the official documentation:

- [Vite Official Documentation](https://vitejs.dev/)
- [React Official Documentation](https://react.dev/)

## License

This project is licensed under the MIT License.



