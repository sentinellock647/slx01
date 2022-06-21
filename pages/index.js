import dynamic from "next/dynamic";

const Screen = dynamic(() => import("../src/components/HomePage"), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="container px-2 py-4">
      <Screen />
    </div>
  );
};

export default Page;
