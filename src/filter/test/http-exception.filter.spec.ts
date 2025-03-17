/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../../constants/index';
import { HttpExceptionFilter } from '../http-exception.filter';

describe('HttpExceptionFilter.catch() catch method', () => {
  let httpExceptionFilter: HttpExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let mockArgumentsHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    httpExceptionFilter = new HttpExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockRequest = {
      url: '/test-url',
    };
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  // Happy path tests
  describe('Happy paths', () => {
    it('should handle HttpException and return correct response', () => {
      // Arrange
      const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);

      // Act
      httpExceptionFilter.catch(exception, mockArgumentsHost as ArgumentsHost);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.FORBIDDEN,
        timestamp: expect.any(String),
        path: '/test-url',
        message: 'Forbidden',
      });
    });

    it('should handle HttpException with object response and return correct response', () => {
      // Arrange
      const exception = new HttpException(
        { message: 'Custom error' },
        HttpStatus.BAD_REQUEST,
      );

      // Act
      httpExceptionFilter.catch(exception, mockArgumentsHost as ArgumentsHost);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: expect.any(String),
        path: '/test-url',
        message: 'Custom error',
      });
    });
  });

  // Edge case tests
  describe('Edge cases', () => {
    it('should handle non-HttpException and return INTERNAL_SERVER_ERROR', () => {
      // Arrange
      const exception = new Error('Unexpected error');

      // Act
      httpExceptionFilter.catch(exception, mockArgumentsHost as ArgumentsHost);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: expect.any(String),
        path: '/test-url',
        message: ERROR_MESSAGES.UNPROCESSABLE_ENTITY,
      });
    });

    it('should handle HttpException with non-string message and return correct response', () => {
      // Arrange
      const exception = new HttpException(
        { message: 12345 },
        HttpStatus.BAD_REQUEST,
      );

      // Act
      httpExceptionFilter.catch(exception, mockArgumentsHost as ArgumentsHost);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: expect.any(String),
        path: '/test-url',
        message: 12345,
      });
    });

    it('should handle HttpException with no message and return default message', () => {
      // Arrange
      const exception = new HttpException({}, HttpStatus.BAD_REQUEST);

      // Act
      httpExceptionFilter.catch(exception, mockArgumentsHost as ArgumentsHost);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: expect.any(String),
        path: '/test-url',
        message: undefined,
      });
    });
  });
});
