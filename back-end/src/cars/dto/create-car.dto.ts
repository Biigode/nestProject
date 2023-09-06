export class CreateCarDto {
  readonly id: string;
  readonly brand: string;
  readonly model: string;
  readonly year: number;
  readonly color: string;
  readonly price: number;
  readonly engine: string;
  readonly transmission: string;
  readonly description: string;
}
