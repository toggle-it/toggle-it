import { API_URL } from "@ti/config";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <form action={API_URL + "/auth/google"}>
          <button>Google</button>
        </form>
        <form action={API_URL + "/auth/microsoft"}>
          <button>Microsoft</button>
        </form>
      </div>

      {children}
    </div>
  );
}
