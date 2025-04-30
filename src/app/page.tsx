import "./globals.css";
import Price from "@/components/Price";
import Info from "@/components/Info";
import BalanceInput from "@/components/BalanceInput";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <Price/>
        <Info/>
        <BalanceInput/>
    </div>
  );
}
