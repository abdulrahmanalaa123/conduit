function LoginObject(mail, pw) {
  const email = mail ? mail : "";
  const password = pw ? pw : "";

  this.user = { email, password };
}

export default LoginObject;
