import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Investment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('real')
    amountEuros!: number;

    @Column('real')
    quantity!: number;

    @Column({ length: 5 })
    asset_code!: string;

    @CreateDateColumn()
    createdAt!: Date;


}