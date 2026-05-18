export default function LandingPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Добро пожаловать в Quote App!</h1>
      <p>Это лендинг страница (SSR)</p>
      <div>
        <a href="/login">Войти</a> | <a href="/register">Зарегистрироваться</a>
      </div>
    </div>
  );
}