/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';
import validationOptions from '../validation.error';

describe('Validation Error - generateErrors and exceptionFactory', () => {
  describe('exceptionFactory', () => {
    it('should return an empty message when provided an empty errors array', () => {
      const errors: ValidationError[] = [];
      const exception = validationOptions.exceptionFactory
        ? validationOptions.exceptionFactory(errors)
        : new UnprocessableEntityException();
      const response = exception.getResponse();
      expect(response).toEqual({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: {},
      });
    });

    it('should handle an error with no constraints and no children', () => {
      const errors: ValidationError[] = [
        { property: 'test', constraints: undefined, children: [] },
      ];
      const exception = validationOptions.exceptionFactory
        ? validationOptions.exceptionFactory(errors)
        : new UnprocessableEntityException();
      const response = exception.getResponse();
      expect(response).toEqual({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: { test: '' },
      });
    });

    it('should handle an error with constraints and children as null', () => {
      const errors: ValidationError[] = [
        {
          property: 'sample',
          constraints: { isNotEmpty: 'Cannot be empty' },
          children: [],
        },
      ];
      const exception = validationOptions.exceptionFactory
        ? validationOptions.exceptionFactory(errors)
        : new UnprocessableEntityException();
      const response = exception.getResponse();
      expect(response).toEqual({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: { sample: 'Cannot be empty' },
      });
    });

    it('should combine multiple constraints on the same property correctly', () => {
      const errors: ValidationError[] = [
        {
          property: 'field',
          constraints: { error1: 'Error one', error2: 'Error two' },
          children: [],
        },
      ];
      const exception = validationOptions.exceptionFactory
        ? validationOptions.exceptionFactory(errors)
        : new UnprocessableEntityException();
      const response = exception.getResponse();
      expect(response.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(response.message.field).toContain('Error one');
      expect(response.message.field).toContain('Error two');
    });

    it('should handle nested errors with multiple children, ignoring parent constraints', () => {
      const errors: ValidationError[] = [
        {
          property: 'parent',
          constraints: { parentError: 'Parent error' },
          children: [
            {
              property: 'child1',
              constraints: { childError: 'Child error' },
              children: [],
            },
            {
              property: 'child2',
              constraints: { childError: 'Another child error' },
              children: [],
            },
          ],
        },
      ];
      const exception = validationOptions.exceptionFactory
        ? validationOptions.exceptionFactory(errors)
        : new UnprocessableEntityException();
      const response = exception.getResponse();
      expect(response).toEqual({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: {
          parent: {
            child1: 'Child error',
            child2: 'Another child error',
          },
        },
      });
    });
  });

  describe('validationOptions properties', () => {
    it('should have transform, whitelist, and errorHttpStatusCode set correctly', () => {
      expect(validationOptions.transform).toBe(true);
      expect(validationOptions.whitelist).toBe(true);
      expect(validationOptions.errorHttpStatusCode).toBe(
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });
  });
});
