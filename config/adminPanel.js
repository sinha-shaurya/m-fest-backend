import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { dark, light, noSidebar } from '@adminjs/themes'
import mongoose from 'mongoose';

// Import your models
import User from '../models/userModel.js';
import Coupon from '../models/coupunModel.js'; // Ensure the model name is correct

// Register the AdminJS Mongoose adapter
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

// Configure AdminJS
const adminOptions = {
  resources: [
    {
      resource: User,
      options: {
        listProperties: ['_id', 'name', 'email'], // Customize list view columns
        filterProperties: ['name', 'email'], // Enable filtering on specific fields
      },
    },
    {
      resource: Coupon,
      options: {
        listProperties: ['_id', 'title', 'discountPercentage', 'validTill'],
        filterProperties: ['title', 'discountPercentage', 'validTill'], // Enable filtering
      },
    },
  ],
  branding: {
    companyName: 'Your Company',
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: '/admin', // This is where AdminJS will be accessible
};

const admin = new AdminJS(adminOptions);

// Build the AdminJS Express router
const adminRouter = AdminJSExpress.buildRouter(admin);

// Export the admin router
export default adminRouter;
