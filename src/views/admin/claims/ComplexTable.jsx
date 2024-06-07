import React, { useMemo, useState, useEffect } from "react";
import Card from "../../../components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdAssignmentInd,
} from "react-icons/md";
import { BiDetail } from "react-icons/bi";

import Progress from "../../../components/progress";
import { agents } from "../Agents/variabels/agents";
import Modal from "react-modal";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import ClaimModal from "./ClaimModal";

const ComplexTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const { Option } = Select;

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 1000;

  const [assignedAgents, setAssignedAgents] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentClaim, setCurrentClaim] = useState(null);
  const [open, setOpen] = useState(false);
  const [assignAgentModal, setAssignAgentModal] = useState(false);

  const handleAgentChange = (claimId, agentId) => {
    setAssignedAgents((prev) => ({
      ...prev,
      [claimId]: agentId,
    }));
  };
  const handleDetailClick = (row) => {
    console.log(row.original);
    setCurrentClaim(row.original);
    setOpen(true);
    console.log(open);
  };
  const showAssignAgentModal = () => {
    setAssignAgentModal(true);
    console.log(assignAgentModal);
  };
  const handleOk = () => {
    setAssignAgentModal(false);
  };
  const handleCancel = () => {
    setAssignAgentModal(false);
  };
  // useEffect(() => {
  //   // This function will be called after every render
  //   console.log(tableData);
  // }, [currentClaim]);
  const openModal = (claim) => {
    setCurrentClaim(claim);
    console.log(currentClaim);
    setOpen(true);
    console.log(open);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentClaim((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setCurrentClaim((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    // Logic to save changes
    closeModal();
  };

  const onClose = () => {
    setModalIsOpen(false);
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className=" absolute"></div>
      {/* Tabel Titile */}
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Claims Table
        </div>
      </div>
      {/* claim tabel */}
      <div className="mt-8 overflow-x-scroll ">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
                <th className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    ASSIGN AGENT
                  </p>
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "CLAIM ID") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "POLICY HOLDER ID") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "CLAIMANT NAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className="rounded-full text-xl">
                            {cell.value === "Approved" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Pending" ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : cell.value === "Rejected" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === "In Review" ? (
                              <MdOutlineError className="text-yellow-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "INCIDENT TYPE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "Actions") {
                      data = (
                        <p className="text-lg font-bold text-navy-700 dark:text-white">
                          <BiDetail
                            className="text-orange-500"
                            onClick={() => openModal(row.original)}
                          />
                        </p>
                      );
                    } else if (cell.column.Header === "Assign Agent") {
                      data = (
                        <p className="text-lg font-bold text-navy-700 dark:text-white">
                          <MdAssignmentInd
                            onClick={() => showAssignAgentModal()}
                          />
                        </p>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px] cursor-pointer"
                        {...cell.getCellProps()}
                        key={index}
                        // onClick={() => openModal(row.original)}
                      >
                        {data}
                      </td>
                    );
                  })}
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <select
                      value={assignedAgents[row.original.claim_id] || ""}
                      onChange={(e) =>
                        handleAgentChange(row.original.claim_id, e.target.value)
                      }
                      className="text-sm font-bold text-navy-700 dark:text-white bg-white dark:bg-navy-700"
                    >
                      <option value="">Select Agent</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
