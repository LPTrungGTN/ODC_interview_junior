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
  @IsNotEmpty()
  startDate: string;

  @Column({ nullable: true, type: 'date' })
  @IsDate()
  @ValidateIf((o) => o.endDate != null)
  @IsNotEmpty({
    message: 'Start date must be present if there is an end date.',
  })
  endDate: string;
}
