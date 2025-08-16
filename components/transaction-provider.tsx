// src/providers/TransactionProvider.tsx
"use client";

import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { makeStore, AppDispatch } from "../store/store";
import { fetchTransactions } from "@/features/transactionSlice";

const store = makeStore();

interface Props {
  children: ReactNode;
}

const InitTransactions: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return <>{children}</>;
};

export const TransactionProvider: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <InitTransactions>{children}</InitTransactions>
    </Provider>
  );
};
