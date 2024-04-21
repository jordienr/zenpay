import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const EmptyState = (props: Props) => {
  return (
    <div className="flex flex-col p-12 justify-center items-center text-center">
      <div className="mb-1 text-gray-300 [&_svg]:size-8">{props.icon}</div>
      <h2 className="font-medium">{props.title}</h2>
      <p className="text-zinc-500 max-w-xs text-sm tracking-tight">
        {props.description}
      </p>
      {props.children}
    </div>
  );
};

export default EmptyState;
