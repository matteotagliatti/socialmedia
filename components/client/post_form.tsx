"use client";

import user_profile_placeholder_img from "@/assets/img/user-profile-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function PostForm({ submitPost }: { submitPost: any }) {
  const resetRef = useRef<HTMLButtonElement>(null);

  async function handleSubmit(formData: FormData) {
    try {
      const { error } = await submitPost(formData);
      if (error) return toast(error.message);
      toast("Post created successfully");
      resetRef.current?.click();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="p-6 border-b-secondary/20 border-b flex items-between gap-4"
    >
      <div className="shrink-0">
        <Image
          className="rounded-full"
          width={48}
          height={48}
          src={user_profile_placeholder_img}
          alt=""
        />
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <Textarea
          required
          className="text-primary text-base"
          name="post"
          id="post"
        />
        <div className="self-end flex gap-2">
          <Button type="reset" variant={"outline"} ref={resetRef}>
            Reset
          </Button>
          <Button type="submit">Post</Button>
        </div>
      </div>
    </form>
  );
}
