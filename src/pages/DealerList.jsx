
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { axiosInstance } from "../config/axiosInstance";

const DealerList = () => {
  const [dealers, setDealers] = useState("");

  useEffect(() => {
    const getDealers = async () => {
      const res = await axiosInstance({
        url:"/dealer/get-dealers",
        method:"GET",
    });
      const dlsData = await res.data;
      setDealers(dlsData);
    };
    getDealers();
  }, []);

  return (
    <div className="m-3 border ">
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Dealer Name</Th>
              <Th>Email</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dealers &&
              dealers.map((dealer, index) => (
                <>
                  <Tr key={index}>
                    <Th>{dealer.name}</Th>
                    <Th>{dealer.email}</Th>
                    <Th>
                      <button
                        onClick={async () => {
                          const res = await axiosInstance({
                           url:`/dealer/delete-dealer/${dealer._id}`,
                            method:"DELETE",
                        });
                          const data = await res.data;
                          console.log(data);
                          if (data === "removed sucessfully") {
                            //window.location.reload();
                           
                          }
                        }}
                        className="rounded-md bg-red-500 px-2 py-1 text-white"
                      >
                        Remove
                      </button>
                    </Th>
                  </Tr>
                </>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DealerList;