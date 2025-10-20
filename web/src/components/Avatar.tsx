interface AvatarProps {
  user: string | undefined;
}

function Avatar({ user }: AvatarProps) {
  return <>{user}</>;
}

export default Avatar;
