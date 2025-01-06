import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Defina que a aplicação foi montada após o primeiro render
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Após a montagem do componente e layout, navegue
    if (isMounted && router) {
      router.replace("/login");
    }
  }, [isMounted, router]);

  return null;
}