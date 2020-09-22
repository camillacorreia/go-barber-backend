import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
    user: User;
    token: string;
  }

class AuthenticationUserService {
  public async execute({ email, password} : Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email }});

    if (!user) {
        throw new Error('Email ou senha incorreta');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
        throw new Error('Email ou senha incorreta');
    }

    const token = sign({}, 'b38449bd30654267346a5f921dd6d6c3', {
        subject: user.id,
        expiresIn: '1d',
    });

    return {
        user,
        token,
    }
  }
}

export default AuthenticationUserService;
