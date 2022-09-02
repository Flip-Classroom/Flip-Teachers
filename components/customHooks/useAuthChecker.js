import React from "react";
import { gql, useQuery } from "@apollo/client";

const Auth = gql`
  query Query {
    auth
  }
`;

function useAuthChecker() {
  const { data, error, loading, refetch } = useQuery(Auth, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  if (data) {
    return data;
  }
}

export default useAuthChecker;
