import { UserButton } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
// import { Sidebar } from "@/components/sidebar";
// import { checkSubscription } from "@/lib/subscription";

const RootLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  

  return ( 
    <div className="h-full">
      <Navbar  />
    
      <main className="md:pl-20 pt-16 h-full">
        {children}
      </main>
    </div>
   );
}
 
export default RootLayout;