export const handleError = (err: string) => {
  switch (err) {
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'Email уже зарегистрирован';
    case 'Firebase: Error (auth/user-not-found).':
      return 'Пользователь не найден';
    case 'Firebase: Error (auth/wrong-password).':
      return 'Неверный пароль';
    case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
      return 'Слишком много попыток входа. Повторите позже	';
    case 'Неверный тип пользователя':
      return 'Неверный тип пользователя';
    default:
      return null;
  }
};
