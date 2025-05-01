import "./globals.css";
import Price from "@/components/Price";
import InfoToggle from "@/components/InfoToggle";

export default function Home() {


  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <Price/>
        <InfoToggle/>
    </div>
  );
}
