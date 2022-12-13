import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

interface Validators {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

// Incoming request validator middleware using Zod to validate the incoming data to ensure it is all there, correct types / lengths, etc.
export const requestValidator = (validators: Validators) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      for (const property in validators) {
        request[property as keyof Validators] = await validators[
          property as keyof Validators
        ]?.parseAsync(request[property as keyof Validators]);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(422);
      }
      next(error);
    }
  };
};

/**
 * Request data validation means -
 * - Check any data coming in to an api
 * - Ensure the body, params, query, whatever is of the correct types, were included (Required) and whatever other requirements
 * - If anything is not validated / missing, we can throw an error and not even execute the api the user wanted
 * - For our use case, we use Zod to get both type safety, a clean API and good reuse
 */
