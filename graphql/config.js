import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-ap-northeast-1.graphcms.com/v2/ckvp68jbn380601xk3afk756o/master",
  cache: new InMemoryCache(),
});

export default client;
