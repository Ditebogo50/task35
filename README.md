# Hyperion L435

## Backend

**Run**
```
cd backend
npm start
```

## Frontend
```
cd frontend
npm run dev
```

## Testing

Go to http://localhost:5173/login or http://localhost:5173/register to start

You can find seeded users in `backend/scripts/seeds.js`, run `node backend/scripts/seeds.js` if you want to try it on your own mongo database.

You will be redirected to the dashboard

If you are a normal user you will be able to see all the divisions assigned to you and be able to view and create new credentials
If you are a management user you will be able to do all the above and also be able to edit a credential
If you are an admin you will be able to do all of the above and also manage users, there will be an extra users section on the dashboard with link to manage a user.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
