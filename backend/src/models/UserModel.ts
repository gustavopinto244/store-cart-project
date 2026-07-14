import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { pool } from '../config/database';

export interface IUser {
  _id: number;
  email: string;
  password: string;
  name: string;
}

interface UserBody {
  email: string;
  password: string;
  name: string;
}

interface UserRow {
  id: number;
  email: string;
  password: string;
  name: string;
}

class UserAuth {
  private body: UserBody;
  public errors: string[];
  public user: IUser | null;

  constructor(body: UserBody) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  private cleanUp(): void {
    this.body = {
      email: typeof this.body.email === 'string' ? this.body.email.trim().toLowerCase() : '',
      password: typeof this.body.password === 'string' ? this.body.password : '',
      name: typeof this.body.name === 'string' ? this.body.name.trim() : '',
    };
  }

  private isValidPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return regex.test(password);
  }

  private validateRegister(): void {
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('Please enter a valid email address.');
    }
    if (this.body.password.length < 8 || this.body.password.length > 50) {
      this.errors.push('Password must be between 8 and 50 characters.');
    }
    if (!this.isValidPassword(this.body.password)) {
      this.errors.push(
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
      );
    }
    if (!this.body.name || this.body.name.length < 2) {
      this.errors.push('Name must have at least 2 characters.');
    }
  }

  private validateLogin(): void {
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('Please enter a valid email address.');
    }
    if (!this.body.password || this.body.password.length > 50) {
      this.errors.push('Password is required.');
    }
  }

  private async userExists(): Promise<void> {
    const result = await pool.query('SELECT 1 FROM users WHERE email = $1 LIMIT 1', [
      this.body.email,
    ]);
    if (result.rowCount && result.rowCount > 0) {
      this.errors.push('An account with this email already exists.');
    }
  }

  public async register(): Promise<void> {
    this.cleanUp();
    this.validateRegister();
    if (this.errors.length > 0) return;

    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.body.password, salt);

    try {
      const result = await pool.query<UserRow>(
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, password, name',
        [this.body.email, hashedPassword, this.body.name],
      );

      const user = result.rows[0];
      this.user = {
        _id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
      };
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: string }).code === '23505'
      ) {
        this.errors.push('An account with this email already exists.');
        return;
      }
      throw err;
    }
  }

  public async login(): Promise<void> {
    this.cleanUp();
    this.validateLogin();
    if (this.errors.length > 0) return;

    const result = await pool.query<UserRow>(
      'SELECT id, email, password, name FROM users WHERE email = $1 LIMIT 1',
      [this.body.email],
    );

    if (result.rowCount === 0) {
      this.errors.push('No account found with this email address.');
      return;
    }

    const user = result.rows[0];
    const isMatch = await bcryptjs.compare(this.body.password, user.password);
    if (!isMatch) {
      this.errors.push('Incorrect password. Please try again.');
      return;
    }

    this.user = {
      _id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    };
  }
}

export default UserAuth;
