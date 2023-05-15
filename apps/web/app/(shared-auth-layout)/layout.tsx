import { API_URL } from "@ti/config";
import { BgFancy } from "@ti/ui";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <BgFancy>
      <div>
        <form action={API_URL + "/auth/google"}>
          <button>Google</button>
        </form>
        <form action={API_URL + "/auth/microsoft"}>
          <button>Microsoft</button>
        </form>
      </div>

      {children}
    </BgFancy>
  );
}
