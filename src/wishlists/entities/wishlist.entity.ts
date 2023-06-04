import { IsUrl, Length } from "class-validator";
import { Wish } from "src/wishes/entities/wish.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany} from "typeorm";

@Entity()
export class Wishlist {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        type: "varchar",
    })
    @Length(1, 250)
    name: string;

    @Column({
        type: "varchar",
    })
    @Length(1, 1500)
    description: string;

    @Column({
        type: "varchar",
    })
    @IsUrl()
    image: string;

    @ManyToMany(() => Wish)
    items: Wish;
}