import welcome from "../assets/welcome.png";
export default function Homepagelayout() {
  return (
    <div className="flex flex-col items-center gap-8">
      <img
        src={welcome}
        alt="Image"
        className="w-[80%]"
      />
    </div>
  );
}