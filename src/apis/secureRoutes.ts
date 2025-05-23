import { ApiEndpotins } from "@/constants/endpoints";

enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export const secureRoutes = [
  { method: Method.POST, url: ApiEndpotins.SIGN_UP },
  { method: Method.GET, url: ApiEndpotins.ME },
  { method: Method.POST, url: ApiEndpotins.CLUB },
];
