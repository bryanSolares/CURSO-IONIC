import JWT from "jsonwebtoken";

export default class Token {
  private static seed: string = "misuperclavesecreta";
  private static limitTime: string = "30d";

  constructor() {}

  static getJWTToken(payload: any): string {
    return JWT.sign(
      {
        usuario: payload,
      },
      this.seed,
      { expiresIn: this.limitTime }
    );
  }

  static compareToken(token: string) {
    return new Promise((resolve, reject) => {
      JWT.verify(token, this.seed, (err, decode) => {
        err ? reject(err) : resolve(decode);
      });
    });
  }
}
