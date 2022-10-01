import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{

   private usersRepository: IUsersRepository;
   private mailProvider: IMailProvider;

   constructor(userRepository: IUsersRepository, mailProvider: IMailProvider){
      this.usersRepository = userRepository;
      this.mailProvider = mailProvider;
   }

   async execute(data: ICreateUserRequestDTO){
      const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

      if(userAlreadyExists){
         throw new Error('User already exists.');
      }

      const user = new User(data);

      await this.usersRepository.save(user);

      await this.mailProvider.sendMail({
         to: {
            name: data.name,
            email: data.email
         },
         from: {
            name: 'Equipe do Meu App',
            email: 'equipe@meuapp.com'
         },
         subject: 'Seja Bem-vindo ao Meu App',
         body: `Olá ${data.name}, nós da equipe Meu App queremos te dar as boas vindas`
      });

   }
}