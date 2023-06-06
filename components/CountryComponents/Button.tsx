import { useRouter } from "next/router";
import { ReactNode } from "react";

interface IButtonComponent {
  text: string;
  children?: ReactNode;
}

export default function Button({ text, children }: IButtonComponent) {
  const router = useRouter();
  return (
    <button className="button" onClick={() => router.push("/")}>
      {children}
      <span>{text}</span>
    </button>
  );
}
