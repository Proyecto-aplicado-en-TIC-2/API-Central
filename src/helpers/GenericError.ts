import { BadRequestException } from "@nestjs/common";
import { AppValidationException } from "./AppValidationException";
import { DbOperationException } from "./DbOperationException";

export class GenericError 
{
  constructor(error: any)
  {
    if (error instanceof AppValidationException) {
      throw new BadRequestException("Ops! Validation Error: " + error.message);
    } else if (error instanceof DbOperationException) {
      throw new BadRequestException("Ops! Something went wrong in DB Operation: " + error.message);
    } else{
      throw new BadRequestException("Ops! An unexpected error has occurred: " + error.message);
    }
  }
}
