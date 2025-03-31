import {useConvexAuth} from "convex/react";
import {MapPinIcon} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Logo() {
  const {isAuthenticated} = useConvexAuth();
  const router = useRouter();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/");
    }
  };

  return (
    <div className="hidden md:flex gap-10 items-center justify-start flex-1">
      <div onClick={handleClick} className="cursor-pointer">
        <div className="flex gap-1 justify-center items-center">
          <MapPinIcon className="h-10 w-10 text-blue-500" />
          <div className="flex flex-col leading-5 font-bold text-xl">
            <span>Plan</span>
            <span>
              My
              <span className="text-blue-500 ml-0.5">Trip</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
