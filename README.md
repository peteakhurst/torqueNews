# What I Would Improve

### Performance:
I would look at memoizing the formatDate function, so it doesnt have to run unncessary computations.

### Scalability:

Would the search results a pagination function. Only allowing a certain amount to be shown at once, but also implement a UI so that the user can choose how and how many results to be displayed. Also a search function to filter by section results (sectionID) ie tech, sports, business etc.

### Robustness

Would collaborate with a more senior backened developer to help me write a proxy to serve the API requests which would also help to deter from cross site scripting attacks. Would also add a more robust error handling sequence. Such as retrys, network errors and timeouts.

These are just a few thoughts on what I would do to improve the overall functionality and robustness of this application.

This App was made using react + vite.

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
