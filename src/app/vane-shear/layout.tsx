import { GridDataProvider } from "@/components/context/gridData";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridDataProvider>{children}</GridDataProvider>
    </>
  );
}
