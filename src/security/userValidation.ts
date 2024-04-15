export function validateUserInput(username: string, email: string, password: string): void {
    if (!username.trim() || !email.trim() || !password.trim()) {
      throw new Error("Username, email, and password are required.");
    }
  
    const MAX_USERNAME_LENGTH = 255;
    if (username.length > MAX_USERNAME_LENGTH) {
      throw new Error(`Username must be less than ${MAX_USERNAME_LENGTH} characters.`);
    }
  
    const MAX_EMAIL_LENGTH = 255;
    if (email.length > MAX_EMAIL_LENGTH) {
      throw new Error(`Email must be less than ${MAX_EMAIL_LENGTH} characters.`);
    }
  }
  