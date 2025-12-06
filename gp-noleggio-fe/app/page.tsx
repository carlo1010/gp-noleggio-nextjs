import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D22000] font-sans dark:bg-black">
     Home
        <Button>
            cliccami !
        </Button>
    </div>
  );
}
