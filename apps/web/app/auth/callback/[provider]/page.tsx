import { API_URL } from "@ti/config";

interface ProviderPageProps {
  params: { provider: string };
  searchParams: {
    code: string;
    state: string;
  };
}

export default async function ProviderPage({
  searchParams,
  params: { provider },
}: ProviderPageProps) {
  const search = new URLSearchParams(searchParams).toString();
  const url = `${API_URL}/auth/callback/${provider}?${search}`;

  const response = await fetch(url);
  const user = await response.json();

  // TODO: redirect to authenticated route
  return JSON.stringify(user);
}
