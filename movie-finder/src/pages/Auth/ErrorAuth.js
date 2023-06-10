export const translateError = (message) => {
  let errorText;

  let error = message.match(/\((.*?)\)/);
  if(error && error.length >= 2) {
    error = error[1];

    switch(error) {
      case "auth/email-already-in-use":
        errorText = "Esse email já existe.";
        break;
      case "auth/weak-password":
        errorText = "A senha deve ter no mínimo 6 caracteres.";
        break;
      case "auth/invalid-email":
        errorText= "O email inserido é inválido.";
        break;
      case "auth/wrong-password":
        errorText= "Senha incorreta.";
        break;
      case "auth/user-not-found":
        errorText= "Usuário não encontrado.";
        break;
      default:
        errorText = error;
    }
  } else {
    errorText = message;
  }

  return errorText;
}