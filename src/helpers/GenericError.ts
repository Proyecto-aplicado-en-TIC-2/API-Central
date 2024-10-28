import { BadRequestException } from '@nestjs/common';
import { AppValidationException } from './AppValidationException';
import { DbOperationException } from './DbOperationException';

export class GenericError {
  constructor(MethodName: string, error: any) {
    if (error instanceof AppValidationException) {
      console.log(
        '------------------------',
        ' Ops! Validation Error',
        '------------------------',
        `Error in method:   ${MethodName}`,
        `This happened:     ${error.message}`,
      );
      throw new BadRequestException({
        message: [
          '------------------------',
          ' Ops! Validation Error',
          '------------------------',
          `Error in method:   ${MethodName}`,
          `This happened:     ${error.message}`,
        ],
      });
    } else if (error instanceof DbOperationException) {
      console.log(
        '-------------------------------------------',
        ' Ops! Something went wrong in DB Operation',
        '-------------------------------------------',
        `Error in method:   ${MethodName}`,
        `This happened:     ${error.message}`,
      );
      throw new BadRequestException({
        message: [
          '-------------------------------------------',
          ' Ops! Something went wrong in DB Operation',
          '-------------------------------------------',
          `Error in method:   ${MethodName}`,
          `This happened:     ${error.message}`,
        ],
      });
    } else {
      console.log(
        '----------------------------------------',
        ' Ops! An unexpected error has occurred',
        '----------------------------------------',
        `Error in method:   ${MethodName}`,
        `This happened:     ${error.message}`,
      );
      throw new BadRequestException({
        message: [
          '----------------------------------------',
          ' Ops! An unexpected error has occurred',
          '----------------------------------------',
          `Error in method:   ${MethodName}`,
          `This happened:     ${error.message}`,
        ],
      });
    }
  }
}
