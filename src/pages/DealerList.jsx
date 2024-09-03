import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DealerList = () => {
  const [dealers, setDealers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getDealers = async () => {
      try {
        const res = await axiosInstance({
          url: "/dealer/get-dealers",
          method: "GET",
        });
        const dlsData = await res.data;
        setDealers(dlsData);
      } catch (error) {
        console.error("Error fetching dealers:", error);
      }
    };
    getDealers();
  }, []);

  return (
    <div className="relative p-3"> {/* Wrap with relative positioning */}
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="absolute top-4 left-4 rounded-md bg-blue-500 px-4 py-2 text-white cursor-pointer hover:bg-blue-600 transition-colors z-10"
      >
        Go Back
      </button>

      {/* Table Container */}
      <TableContainer className="mt-12"> {/* Ensure some margin from the top */}
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
                    onClick={async () => {
                      try {
                        const res = await axiosInstance({
                          url: `/dealer/delete-dealer/${dealer._id}`,
                          method: "DELETE",
                        });
                        const data = await res.data;
                        console.log(data);
                        if (data === "removed successfully") {
                          // Update state to remove dealer from the list
                          setDealers((prevDealers) =>
                            prevDealers.filter((d) => d._id !== dealer._id)
                          );
                        }
                      } catch (error) {
                        console.error("Error removing dealer:", error);
                      }
                    }}
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
                            window.location.reload();
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