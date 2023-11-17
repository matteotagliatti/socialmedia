import Link from "next/link";
import Button from "./Button";

export default async function LoginBanner() {
  return (
    <section className="fixed bg-background border-t border-t-secondary/20 bottom-0 w-full h-10 flex justify-between items-center p-8 text-sm">
      <div>
        <span className="font-semibold text-primary">Social</span>, a community
        app.
      </div>
      <div className="flex gap-2 items-center justify-end">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button outline={true}>Sign up</Button>
        </Link>
      </div>
    </section>
  );
}
