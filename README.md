# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and extended with additional tools like React Router, Axios, Bootstrap, and testing libraries.

---

## 📦 Installed Dependencies

```json
{
  "dependencies": {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.8.4",
    "bootstrap": "^5.3.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.4.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in the interactive watch mode using React Testing Library.

### `npm run build`
Builds the app for production to the `build` folder.
It bundles and optimizes the project for performance.

### `npm run eject`
Removes Create React App default configs and exposes underlying configuration.
**Note:** This is irreversible.

---

## 🌐 Proxy Setup
This project includes a proxy to connect frontend to the backend:
```json
"proxy": "http://localhost:5000"
```

---

## 🔧 Project Features
- React 19
- React Router DOM for routing
- Axios for API integration
- Bootstrap for styling
- Testing libraries for unit testing

---

## 📚 Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)

---

## 🧪 Testing
Using Testing Library with Jest DOM and User Event to test components interactively.

---

## 🔄 To Upgrade All Dependencies
```bash
npx npm-check-updates -u
npm install
```

---

## 📦 Manual Package Installation (if needed)
```bash
npm install @testing-library/dom@10.4.0 \
            @testing-library/jest-dom@6.6.3 \
            @testing-library/react@16.2.0 \
            @testing-library/user-event@13.5.0 \
            axios@1.8.4 \
            bootstrap@5.3.3 \
            react@19.1.0 \
            react-dom@19.1.0 \
            react-router-dom@7.4.1 \
            react-scripts@5.0.1 \
            web-vitals@2.1.4
```

---

## 📥 Initial Setup Commands
To create a new React app and apply the full setup:
```bash
npx create-react-app my-app
cd my-app
```
Then run:
```bash
npm install @testing-library/dom@10.4.0 \
            @testing-library/jest-dom@6.6.3 \
            @testing-library/react@16.2.0 \
            @testing-library/user-event@13.5.0 \
            axios@1.8.4 \
            bootstrap@5.3.3 \
            react-router-dom@7.4.1 \
            web-vitals@2.1.4
```

---

## 🛠 Troubleshooting
- Make sure Node.js and npm are installed.
- Run `npm install` if packages are missing.
- Use `npm audit fix` to resolve common vulnerabilities.

---