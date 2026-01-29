import SideNav from "../ui/sidenav";
import { ClientProvider } from "../context/ClientContext";

export default function DashboardLayout({ children }) {
  return (
    <ClientProvider>
    <div className="flex h-screen bg-gray-50">
      <SideNav className="fixed left-0 top-0 " />
      <main className="flex-1 ml-72 p-6 ">
        {children}
      </main>
    </div>
    </ClientProvider>
  );
}




