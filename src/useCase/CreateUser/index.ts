import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { MailTrapMailProvider } from '../../providers/implementations/MailTrapMailProvider';
import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository';

const postgresUserRepository = new PostgresUserRepository();
const mailTrapMailProvider = new MailTrapMailProvider();

const createUserUseCase = new CreateUserUseCase(postgresUserRepository, mailTrapMailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController }