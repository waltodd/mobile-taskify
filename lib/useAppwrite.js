import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
