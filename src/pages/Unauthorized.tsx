import { Button } from "@/components/ui/button";
import { RssIcon } from "lucide-react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RssIcon className="w-10 h-10" />
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-gray-500">You are not authorized to access this page</p>
      <Button asChild>
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  );
};

export default Unauthorized;