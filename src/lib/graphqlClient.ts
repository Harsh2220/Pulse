import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://indexer.bigdevenergy.link/cd22985/v1/graphql",
  cache: new InMemoryCache(),
});

export default client;
