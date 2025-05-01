import "./globals.css";
import Price from "@/components/Price";
import InfoToggle from "@/components/InfoToggle";
import Info from "@/components/Info";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <Price/>
        <InfoToggle>
            <Info/>
        </InfoToggle>
    </div>
  );
}
