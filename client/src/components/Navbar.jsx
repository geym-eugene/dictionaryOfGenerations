export default function NavigationBar({ user }) {
  return (
    <p>{user?.id ? `Привет, ${user.name}` : 'Гостевой аккаунт'}</p>
  )
}