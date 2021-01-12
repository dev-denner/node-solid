import { ICreateUserResquestDTO } from './CreateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IMailProvider } from '../../providers/IMailProvider';
import { User } from '../../entities/User';

export class CreateUserUseCase {

    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: ICreateUserResquestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        
        if (userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe App',
                email: 'equipe@app.com'
            },
            subject: 'Seja bem-vindo a APP',
            body: '<p>Seu login foi criado com sucesso!!</p>'
        });
    }
}