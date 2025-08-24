import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ label = "" }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-gray-600">Loading {label}...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
