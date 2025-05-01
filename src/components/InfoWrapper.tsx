import dynamic from 'next/dynamic';

const Info = dynamic(() => import("./Info"), { ssr: true });

export default function InfoWrapper() {
    return <Info />;
}