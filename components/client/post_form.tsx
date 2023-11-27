"use client";

import user_profile_placeholder_img from "@/assets/img/user-profile-placeholder.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PostForm({ submitPost }: { submitPost: any }) {
  return (
    <form
      action={submitPost}
      className="p-6 border-b-secondary/20 border-b flex items-between gap-4"
    >
      <div className="shrink-0">
        <Image
          className="rounded-full "
          width={48}
          height={48}
          src={user_profile_placeholder_img}
          alt=""
        />
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <input
          required
          className="mt-3 w-full"
          type="textarea"
          name="post"
          id="post"
        />
        <Button type="submit" className="self-end">
          Post
        </Button>
      </div>
    </form>
  );
}
