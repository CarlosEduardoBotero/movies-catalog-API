import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public title: string;

  @Column()
  public year: number;

  @Column()
  public description: string;

  @Column({ default: '' })
  public image: string;

  @Column()
  public director: string;

  @Column()
  public rating: number;

  @Column()
  public length: string;
}
