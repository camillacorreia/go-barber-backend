import { Router } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticationUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        })

        return response.json({ user, token });
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
}); 

export default sessionsRouter;