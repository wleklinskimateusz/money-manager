import { navigation } from "@/navigation/url";
import Link from "next/link";

export default function BondsPage() {
  return (
    <div>
      <ul>
        <li>
          <Link href={navigation.bondsNewPurchase}>New Bond</Link>
        </li>
      </ul>
    </div>
  );
}
