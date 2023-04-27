import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

const cars: Array<CreateCarDto> = [];

@Injectable()
export class CarsService {
  create(createCarDto: CreateCarDto) {
    cars.push({ ...createCarDto, id: uuid() });
    return 'This action adds a new car';
  }

  findAll() {
    return cars;
  }

  findOne(id: string) {
    return cars.find((car) => car.id === id);
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const currentCar = cars.findIndex((car) => car.id === id);
    cars.splice(currentCar, 1, { ...updateCarDto, id } as CreateCarDto);
    return `This action updates a #${id} car`;
  }

  remove(id: string) {
    const carsPosition = cars.findIndex((car) => car.id === id);
    cars.splice(carsPosition, 1);
    return `This action removes a #${id} car`;
  }
}
