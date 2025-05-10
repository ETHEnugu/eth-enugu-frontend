import Container from "@/layout/container";
import Footer from "@/layout/footer";
import Navbar from "@/layout/navbar";
import { ReactNode } from "react";

export default function WebLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Container>
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
}
