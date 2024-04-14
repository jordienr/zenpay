import { redirect } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  redirect("/app/projects");
};

export default page;
