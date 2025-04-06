import type { Metadata } from "next"
import AccountsClientPage from "./accounts-client-page"

export const metadata: Metadata = {
  title: "Accounts | Hamilton Bank",
  description: "Manage your bank accounts",
}

export default function AccountsPage() {
  return <AccountsClientPage />
}

