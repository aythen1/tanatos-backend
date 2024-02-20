import { HttpStatus } from '@nestjs/common';
import { UsuarioService } from '../service/user-type.service';
import { CreateUsuarioDto } from '../dto/create-user-type.dto';
import { UpdateUsuarioDto } from '../dto/update-user-type.dto';
import { Usuario } from '../entities/user-type.entity';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    getUserStoreProducts(id: string): Promise<import("../../store-florist/entities/store-florist.entity").StoreFlorist[]>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: string): Promise<Usuario>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    remove(id: number): Promise<void>;
    findOneByEmail(body: {
        email: string;
    }): Promise<Usuario>;
    uploadFile(file: any, id: number): Promise<Usuario>;
    login(credentials: {
        email: string;
        password: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            username: string;
            email: string;
            user_type: string;
        };
    } | {
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    }>;
    updatePassword(id: number, new_password: string, old_password: string): Promise<any>;
    findStoreByUserId(id: string): Promise<Usuario>;
}
