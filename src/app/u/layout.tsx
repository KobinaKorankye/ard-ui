import SideNav from "@/components/navigation/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideNav>
      {children}
    </SideNav>
  );
}
