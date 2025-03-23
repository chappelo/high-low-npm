import { useQuery } from "@tanstack/react-query";
import { POPULAR_PACKAGES } from "./packages";

type Props = {
  packageName: string;
};

interface NpmApiResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export const getRandomPackage = (exclude: string[] = []): string => {
  let randomPackage: string;
  do {
    randomPackage =
      POPULAR_PACKAGES[Math.floor(Math.random() * POPULAR_PACKAGES.length)];
  } while (exclude.includes(randomPackage));

  return randomPackage;
};

const PERIOD = "last-month";

async function fetchPackage({ packageName }: Props): Promise<NpmApiResponse> {
  const res = await fetch(
    `https://api.npmjs.org/downloads/point/${PERIOD}/${packageName}`
  ).then((res) => res.json());

  return res;
}

export function useFetchPackage({ packageName }: Props) {
  return useQuery({
    queryKey: ["package", packageName],
    queryFn: () => fetchPackage({ packageName }),
  });
}
