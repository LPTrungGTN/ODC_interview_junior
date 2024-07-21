import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  name: string;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  @ValidateIf((o) => o.endDate != null)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsNotEmpty()
  startDate: string;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  @ValidateIf((o) => o.endDate != null)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  endDate: string;
}
