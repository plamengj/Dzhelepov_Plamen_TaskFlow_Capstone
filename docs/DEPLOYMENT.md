# TaskFlow - Deployment Guide (Monorepo Setup)

## Frontend Deployment (Netlify)

### 1. Prepare Frontend for Deployment

1. **Update Environment Variables**
   Create a `.env.production` file in the client directory:
   ```
   REACT_APP_API_URL=https://your-render-backend-url.onrender.com
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

2. **Update API Configuration**
   In `client/src/services/api.js`, ensure the base URL uses the environment variable:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   ```

3. **Build the Application**
   ```bash
   cd client
   npm run build
   ```

### 2. Deploy to Netlify

1. **Create Netlify Account**
   - Go to [Netlify](https://www.netlify.com/)
   - Sign up or log in with your GitHub account

2. **Connect Repository**
   - Click "New site from Git"
   - Choose GitHub
   - Select your TaskFlow repository

3. **Configure Build Settings**
   - Base directory: `client`
   - Build command: `npm install && npm run build`
   - Publish directory: `build`
   - Environment variables:
     ```
     REACT_APP_API_URL=https://your-render-backend-url.onrender.com
     REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
     ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically deploy your site

## Backend Deployment (Render)

### 1. Prepare Backend for Deployment

1. **Update Environment Variables**
   Create a `.env.production` file in the server directory:
   ```
   PORT=10000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

2. **Update CORS Configuration**
   In `server/src/server.js`, update CORS settings:
   ```javascript
   app.use(cors({
     origin: [
       process.env.NODE_ENV === 'production' 
         ? 'https://your-netlify-domain.netlify.app' 
         : 'http://localhost:3000'
     ],
     credentials: true
   }));
   ```

3. **Update package.json**
   Ensure your `server/package.json` has the correct scripts:
   ```json
   {
     "scripts": {
       "start": "node src/server.js",
       "dev": "nodemon src/server.js"
     }
   }
   ```

### 2. Deploy to Render

1. **Create Render Account**
   - Go to [Render](https://render.com/)
   - Sign up or log in with your GitHub account

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - Name: `taskflow-backend`
   - Environment: `Node`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     PORT=10000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your backend

## Post-Deployment Steps

### 1. Update Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Update OAuth 2.0 Client:
   - Add your Netlify domain to authorized JavaScript origins:
     ```
     https://your-netlify-domain.netlify.app
     ```
   - Add your Render backend URL to authorized redirect URIs:
     ```
     https://your-render-backend-url.onrender.com/api/auth/google/callback
     ```
   - Make sure the same Client ID is used in both frontend and backend environment variables

### 2. Test the Deployment

1. **Frontend Testing**
   - Visit your Netlify URL
   - Test Google Sign-in
   - Test task creation and management
   - Verify all API calls work

2. **Backend Testing**
   - Test API endpoints using Postman or similar tool
   - Verify database connections
   - Check error handling

### 3. Monitor Logs

1. **Netlify Logs**
   - Go to your site's dashboard
   - Check "Deploys" section
   - Monitor build logs

2. **Render Logs**
   - Go to your service dashboard
   - Check "Logs" section
   - Monitor runtime logs

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Verify CORS configuration in backend
   - Check frontend API URL configuration
   - Ensure all domains are properly listed

2. **Authentication Issues**
   - Verify Google OAuth configuration
   - Check environment variables
   - Verify JWT token handling
   - Ensure Client ID is correct in both frontend and backend

3. **Database Connection**
   - Verify MongoDB URI
   - Check network access
   - Verify database credentials

4. **Build Failures**
   - Check build logs
   - Verify dependencies
   - Check environment variables

## Maintenance

### Regular Tasks

1. **Monitor Performance**
   - Check Render metrics
   - Monitor database performance
   - Track API response times

2. **Update Dependencies**
   - Regularly update npm packages
   - Check for security vulnerabilities
   - Test updates in development

3. **Backup Data**
   - Regular MongoDB backups
   - Document backup procedures
   - Test restore procedures 