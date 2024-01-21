"use client";

import { getFamily } from "@/utils/api/data";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const Family = () => {
  const router = useRouter();
  const { familyId } = useParams<{ familyId: string }>();
  const { data: family, error } = useSWR("family", () => getFamily(familyId));

  return <div>Hi {family?.name}</div>;
};

export default Family;
