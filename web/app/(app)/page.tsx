import { redirect } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  redirect("/projects");
};

export default page;
