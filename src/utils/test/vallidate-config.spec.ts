import 'reflect-metadata';
import { IsString, IsInt } from 'class-validator';
import validateConfig from '../validate-config';

class TestConfig {
  @IsString()
  APP_NAME!: string;

  @IsInt()
  PORT!: number;
}

describe('validateConfig', () => {
  it('should return a validated config instance when valid', () => {
    const config = {
      APP_NAME: 'MyApp',
      PORT: '3000',
    };

    const validated = validateConfig(config, TestConfig);
    expect(validated).toBeInstanceOf(TestConfig);
    expect(validated.APP_NAME).toBe('MyApp');
    expect(validated.PORT).toBe(3000);
  });

  it('should throw an error if a required property is missing', () => {
    const config = {
      APP_NAME: 'MyApp',
    };

    expect(() => validateConfig(config, TestConfig)).toThrow(Error);
  });

  it('should throw an error if a property is of the wrong type', () => {
    const config = {
      APP_NAME: 'MyApp',
      PORT: 'Not a number',
    };

    expect(() => validateConfig(config, TestConfig)).toThrow(Error);
  });
});
