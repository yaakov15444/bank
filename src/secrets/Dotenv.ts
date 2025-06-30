import dotenv from 'dotenv';
dotenv.config();

class Dotenv {
  public readonly port: number;
  public readonly mongoUri: string;
  public readonly secretKey: string;
  public readonly accessTokesExpiration: string;
  public readonly refreshTokensExpiration: string;
  public readonly jwtRefreshSecret: string;

  constructor() {
    this.mongoUri = this.getString('MONGO_URI');
    this.secretKey = this.getString('JWT_SECRET');
    this.jwtRefreshSecret = this.getString('JWT_REFRESH_SECRET');
    this.port = this.getNumber('PORT', 5001);
    this.accessTokesExpiration = this.getString('ACCESS_TOKEN_EXPIRATION', '15m');
    this.refreshTokensExpiration = this.getString('REFRESH_TOKEN_EXPIRATION', '7d');
  }


  private getString(key: string, defaultValue?: string): string {
    const value = process.env[key];

    if (value) {
      return value;
    }

    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Error: Required environment variable ${key} is not set.`);
  }

  private getNumber(key: string, defaultValue?: number): number {
    const value = process.env[key];

    if (value) {
      const num = parseInt(value, 10);
      if (!isNaN(num)) {
        return num;
      }
    }

    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Error: Required environment variable ${key} is not set or is not a valid number.`);
  }
}

export default new Dotenv();