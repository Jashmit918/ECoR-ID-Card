import React from "react";

export default function FormTitle({ desg }) {
  return (
    <div className="w-full bg-blue-500 p-4 pb-8 rounded-t-sm text-white font-medium flex items-center justify-start">
      Employee Registration Form ( {desg} )
    </div>
  );
}
