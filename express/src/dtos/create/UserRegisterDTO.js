class UserRegisterDTO {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }

  static validate(data) {
    const errors = [];

    if (typeof data.username !== "string") {
      errors.push({ field: "username", error: "Username must be a string" });
    }

    if (typeof data.email !== "string" || !data.email.includes("@")) {
      errors.push({ field: "email", error: "Invalid email format" });
    }

    if (typeof data.password !== "string") {
      errors.push({ field: "password", error: "Password must be a string" });
    }

    if (data.bio !== undefined && typeof data.bio !== "string") {
      errors.push({ field: "bio", error: "Bio must be a string" });
    }

    if (data.image !== undefined && typeof data.image !== "string") {
      errors.push({ field: "image", error: "Image must be a string" });
    }

    return errors;
  }
}

module.exports = UserRegisterDTO;
