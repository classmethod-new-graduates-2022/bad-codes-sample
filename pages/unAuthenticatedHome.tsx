import { signIn } from "next-auth/react";

const UnAuthenticatedHome = () => {
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default UnAuthenticatedHome;
