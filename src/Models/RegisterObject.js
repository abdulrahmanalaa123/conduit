function RegisterObject(username, email, password) {
  this.username = username ? username : "";
  this.password = password ? password : "";
  this.email = email ? email : "";
}

export default RegisterObject;
