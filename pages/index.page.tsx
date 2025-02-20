import GuestLayout from "@/components/GuestLayout/GuestLayout";
import Home from "@/components/HomeContent/index.page";

export default function Index() {
  // If user is authenticated, show loading or route. Otherwise, show the home content.
  return (
    <GuestLayout>
      <Home />
    </GuestLayout>
  );
}
