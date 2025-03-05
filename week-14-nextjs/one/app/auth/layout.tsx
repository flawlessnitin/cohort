import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div>
        <h1 className="w-full bg-blue-300 text-center">
          {" "}
          20% off for the next 3 days
        </h1>
        {children}
      </div>
    </>
  );
};

export default layout;
