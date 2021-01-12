import { Router } from "express";
import { createUserController } from "./useCase/CreateUser";

const router = Router();

router.get('/', (request, response) => response.status(200).send())

router.post('/users', (request, response) => {
    return createUserController.handle(request, response);
});

export { router }