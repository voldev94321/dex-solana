import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div
      className="text-primary cursor-pointer"
      onClick={handleBack}
    >{`<- Back`}</div>
  );
};

export default BackButton;
