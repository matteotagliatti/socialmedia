import LoginBanner from "@/components/LoginBanner";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <>
      <LoginBanner />
    </>
  );
}
