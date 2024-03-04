import { useQuery } from "@tanstack/react-query";
import axiosInterface from "../../lib/axios";
async function getTags() {
  try {
    const response = await axiosInterface.get("/tags");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function getTagsQuery() {
  return useQuery({ queryKey: ["tags"], queryFn: getTags });
}
