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
    btc_q!: number;

    @CreateDateColumn()
    createdAt!: Date;
}