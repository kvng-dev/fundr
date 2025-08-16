"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const TransactionCard = () => {
  const { list, error } = useSelector((state: RootState) => state.transactions);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {list.slice(0, 2).map((item) => (
        <div
          key={item.id}
          className="border border-gray-300 rounded-sm my-3 pl-3 py-2 text-xs uppercase text-gray-600"
        >
          <div className="flex items-center justify-between border-b p-3">
            <p>amount:</p>
            <p>${item.amount}</p>
          </div>
          <div className="flex items-center justify-between border-b p-3">
            <p>transaction type:</p>
            <p>{item.transaction_type}</p>
          </div>
          <div className="flex items-center justify-between border-b p-3">
            <p>date:</p>
            <p>
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center justify-between  p-3 ">
            <p>status:</p>
            <p>
              <span
                className={`px-3 py-1 rounded-full text-xs border flex items-center gap-2 w-fit font-medium text-[9px] ${
                  item.status
                    ? "bg-[#5DC090]/10 text-[#144909] border-[#5DC090]"
                    : "bg-[#F14156]/10 border-[#F14156] text-[#740613]"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full  ${
                    item.status ? "bg-[#92EF80]" : "bg-red-500"
                  }`}
                />
                {item.status ? "Processed" : "Failed"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TransactionCard;
