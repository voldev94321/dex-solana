"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const pageShow = [5, 10, 25, 100];

const Pagination = () => {
  return (
    <div className="flex items-center gap-12">
      <div className="flex items-center">
        <div>Rows per page</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="px-2 py-1 bg-gray-50 rounded-xl ml-2 border-2 border-gray-100">
              10 ▽
            </div>
            {/* {balance ? (
                    <div>{toFixed(balance, 2)} SOL</div>
                  ) : (
                    <div>0 SOL</div>
                  )} */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            {pageShow.map((page) => (
              <DropdownMenuItem key={page} className="flex !px-2 bg-white hover:bg-gray-100 py-1">
                <div>{page}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>Page 1 of 1</div>
      <div>{`⟪`}</div>
      <div>{`⟨`}</div>
      <div>{`⟩`}</div>
      <div>{`⟫`}</div>
    </div>
  );
};

export default Pagination;
