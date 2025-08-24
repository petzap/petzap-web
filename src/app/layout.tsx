import "./globals.css";
import { type Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Box, Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Petzap",
  description: "Petzap - Your Pet Social Network",
};

const josefin = Josefin_Sans({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const content = (
    <html lang="en" className={cn(josefin.variable)} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
          }}
        />
        <Theme
          accentColor="blue"
          radius="medium"
          className="flex min-h-[100vh] w-full flex-col"
        >
          <Box>{children}</Box>
        </Theme>
      </body>
    </html>
  );

  return content;
};

export default RootLayout;
