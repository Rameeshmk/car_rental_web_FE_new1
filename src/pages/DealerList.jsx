import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { axiosInstance } from "../config/axiosInstance";

const DealerList = () => {
  const [dealers, setDealers] = useState([]);

  // Function to fetch dealers
  const getDealers = async () => {
    try {
      const res = await axiosInstance({
        url: "/dealer/get-dealers",
        method: "GET",
      });
      const dlsData = res.data;
      setDealers(dlsData);
    } catch (error) {
      console.error("Failed to fetch dealers", error);
    }
  };

  // Fetch dealers on component mount
  useEffect(() => {
    getDealers();
  }, []);

  // Function to handle dealer deletion
  const handleDelete = async (dealerId) => {
    try {
      const res = await axiosInstance({
        url: `/dealer/delete-dealer/${dealerId}`,
        method: "DELETE",
      });
      const data = res.data;
      console.log(data);
      if (data === "removed sucessfully") {
        // Refresh the dealer list
        getDealers();
      } else {
        console.error("Failed to remove dealer");
      }
    } catch (error) {
      console.error("Failed to delete dealer", error);
    }
  };

  return (
    <div className="m-3 border">
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
            {dealers.map((dealer) => (
              <Tr key={dealer._id}>
                <Th>{dealer.name}</Th>
                <Th>{dealer.email}</Th>
                <Th>
                  <button
                    onClick={() => handleDelete(dealer._id)}
                    className="rounded-md bg-red-500 px-2 py-1 text-white"
                  >
                    Remove
                  </button>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DealerList;









{/*import axios from "axios";
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
    //getDealers();
  //}, []);


  useEffect(() => {
    getDealers();
  }, []);


  const handleDelete = async (dealerId) => {
    try {
      const res = await axiosInstance({
        url: `/dealer/delete-dealer/${dealerId}`,
        method: "DELETE",
      });
      getDealers();
      const data = res.data;
      console.log(data);
      if (data === "removed sucessfully") {
        
        
      } else {
        console.error("Failed to remove dealer");
      }
    } catch (error) {
      console.error("Failed to delete dealer", error);
    }
  };


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
                    onClick={() => handleDelete(dealer._id)}
                    className="rounded-md bg-red-500 px-2 py-1 text-white"
                  >
                    Remove
                  </button>




                     {/*} <button
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

export default DealerList;*/}