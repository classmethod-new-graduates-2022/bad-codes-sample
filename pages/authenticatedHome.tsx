import Image from "next/image";
import { signOut } from "next-auth/react";
import { Channel } from "./channel";
import { useSession } from "next-auth/react";

interface Props {
  channels: Channel[];
}

const AuthenticatedHome = ({ channels }: Props) => {
  const session = useSession();
  const user = session.data?.user;

  if (!user) {
    return null;
  }
  return (
    <>
      <div>Signed in as {user.email}</div>
      {user.image && user.name && (
        <Image src={user.image} alt={user.name} width={512} height={512} />
      )}
      <ul>
        {channels &&
          channels.map((channel) => <li key={channel.id}>{channel.name}</li>)}
      </ul>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default AuthenticatedHome;
