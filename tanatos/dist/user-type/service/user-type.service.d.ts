import { Repository } from 'typeorm';
import { Usuario } from '../entities/user-type.entity';
import { CreateUsuarioDto } from '../dto/create-user-type.dto';
import { Funeral } from 'src/funeral/entities/funeral.entity';
export declare class UsuarioService {
    private usuarioRepository;
    private funeralRepository;
    constructor(usuarioRepository: Repository<Usuario>, funeralRepository: Repository<Funeral>);
    findOneWithStore(id: string): Promise<Usuario>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number | string): Promise<Usuario>;
    findStoreByUserId(id: string): Promise<Usuario>;
    update(id: number, usuario: Usuario): Promise<Usuario>;
    remove(id: number): Promise<void>;
    findOneByEmail(email: string): Promise<Usuario>;
    updatePassword(id: number, newPassword: string): Promise<Usuario>;
}
