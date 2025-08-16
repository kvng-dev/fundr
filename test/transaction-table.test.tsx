import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer, {
  TransactionsState,
} from "../features/transactionSlice";
import TransactionsTable from "@/app/transactions/_components/transaction-table";

// Utility to wrap component with store
const renderWithStore = (
  ui: React.ReactNode,
  preloadedState?: { transactions: TransactionsState }
) => {
  const store = configureStore({
    reducer: {
      transactions: transactionsReducer,
    },
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("TransactionTable", () => {
  it("renders transactions from store", () => {
    renderWithStore(<TransactionsTable />, {
      transactions: {
        list: [
          {
            created_at: "2025-08-15T08:55:39.690Z",
            transaction_type: "invoice",
            amount: "384.65",
            date: "2025-03-25T16:50:56.683Z",
            time: "2025-08-15T11:30:32.913Z",
            status: true,
            transaction_id: "8ca7e2e5f1bd11a2e7e8c384",
            id: "1",
          },
        ],
        loading: false,
        error: null,
      },
    });

    expect(screen.getByText(/invoice/i)).toBeInTheDocument();
    expect(screen.getByText(/384.65/i)).toBeInTheDocument();
  });
});
