class UserLoginDTO {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

  static validate(data) {
    const errors = [];

    if (typeof data.email !== "string" || !data.email.includes("@")) {
      errors.push({ field: "email", error: "Invalid email format" });
    }

    if (typeof data.password !== "string") {
      errors.push({ field: "password", error: "Password must be a string" });
    }

    return errors;
  }
}

module.exports = UserLoginDTO;
