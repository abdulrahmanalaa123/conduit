import axiosInterface from "../../lib/axios";
import { pageParamsFormatter } from "./paramsFormatter";

export default async function getYourFeed({ page }) {
  try {
    const response = await axiosInterface.get("/articles/feed", {
      params: pageParamsFormatter(page),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
