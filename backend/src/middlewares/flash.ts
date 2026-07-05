// Responsible for handling flash messages in the application
import flash from 'connect-flash';
import { RequestHandler } from 'express';

export const flashMiddleware: RequestHandler = flash();