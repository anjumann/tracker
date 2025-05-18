import { User } from "@/type";
import * as React from "react";
import { useLocalStorage } from "./use-localstorage";
import { useEffect } from "react";
import { ulid } from "ulid";

export function useUser() {
  const { getLocal, setLocal } = useLocalStorage<User>("user");
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const userLocal = getLocal();
    if (!userLocal || !userLocal.id) {
      const newUser: User = { ulid: ulid()};
      setLocal(newUser);
      setUser(newUser);
      return
    }
    setUser(userLocal);
  }, [getLocal, setLocal]);

  return user;
}
