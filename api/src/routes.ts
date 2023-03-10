import { PersonController } from "./controllers/PersonController";
import { AccountController } from "./controllers/AccountController";
import { authenticateToken, pass } from "./middleware/authMiddleware"
import { body, param } from "express-validator";

//List of routes to make requests
export const Routes = [{
    method: "post",
    route: "/person",
    controller: PersonController,
    action: "addPerson",
    auth: authenticateToken,
    validation: [
        body('firstName').isString().isLength({ min: 1, max: 25 }),
        body('lastName').isString().isLength({ min: 1, max: 25 }),
        body('age').isInt({ min: 0 }).withMessage('Age must be 0 or greater'),
    ],
}, {
    method: "put",
    route: "/person/:id",
    controller: PersonController,
    action: "updatePerson",
    auth: authenticateToken,
    validation: [
        param('id').isInt(),
        body('firstName').isString().isLength({ min: 1, max: 25 }),
        body('lastName').isString().isLength({ min: 1, max: 25 }),
        body('age').isInt({ min: 0 }).withMessage('Age must be 0 or greater'),
    ],
}, {
    method: "delete",
    route: "/person/:id",
    controller: PersonController,
    action: "deletePerson",
    auth: authenticateToken,
    validation: [
        param('id').isInt(),
    ],
}, {
    method: "post",
    route: "/login",
    controller: AccountController,
    action: "login",
    auth: pass,
    validation: [
        body('email').isEmail(),
        body('password').isString(),
    ],
}, {
    method: "post",
    route: "/signup",
    controller: AccountController,
    action: "signup",
    auth: pass,
    validation: [
        body('email').isEmail(),
        body('password', 'Password length must be between 8 and 24 characters long').isString().isLength({ min: 8, max: 24 }),
    ],
},]