import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSubmissions } from "../../store/taxesSlice";
import { withRouter } from "../../utils/misc";
import Layout from "../../layouts/Layout";
import ModalFilter from "./ModalFilter";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteSubmission, upsertSubmission } from "../../store/taxesSlice";
import UpdateControls from "./UpdateControls";

const Submissions = () => {
  const dispatch = useDispatch();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const allSubmissions = useSelector(selectSubmissions);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateIdx, setUpdateIdx] = useState(0);
  const [updateGlobalIdx, setUpdateGlobalIdx] = useState(0);
  const [filteredSubmissions, setfilteredSubmissions] =
    useState(allSubmissions);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const setFilteredSubm = (newFilteredSubm) =>
    setfilteredSubmissions(newFilteredSubm);

  const handleDelete = (i) => {
    dispatch(deleteSubmission(i));
  };

  const handleUpdate = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    dispatch(upsertSubmission({ id, name, surname, age, updateGlobalIdx }));
    setUpdateOpen(false);
  };

  const handleChange = (row, i) => {
    const idxGlobal = allSubmissions.findIndex((sub) => sub === row);
    console.log("idwGlobal", idxGlobal);
    setUpdateGlobalIdx(idxGlobal);
    setUpdateIdx(i);
    setUpdateOpen(!updateOpen);
    setShowFilterModal(false);
  };

  useEffect(() => {
    setfilteredSubmissions(allSubmissions);
  }, [allSubmissions]);

  return (
    <>
      <Layout title="Submissions">
        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: 800, margin: "auto" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Tax</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Surname</StyledTableCell>
                <StyledTableCell align="right">Age</StyledTableCell>
                <StyledTableCell colSpan="2">
                  <button
                    className="btn btn-success"
                    style={{ backgroundColor: "gold", width: "93px" }}
                    onClick={() => setShowFilterModal(!showFilterModal)}
                  >
                    FILTER
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredSubmissions.map((row, i) => (
                <>
                  <StyledTableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.surname}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.age}</StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="btn btn-success w-40"
                        onClick={() => handleChange(row, i)}
                      >
                        CHANGE
                      </button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <button
                        className="btn btn-danger w-40"
                        onClick={() => handleDelete(i)}
                      >
                        DELETE
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                  {updateOpen && i === updateIdx && (
                    <UpdateControls
                      i={i}
                      filteredSubmissions={filteredSubmissions}
                      handleUpdate={handleUpdate}
                    />
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showFilterModal && (
          <ModalFilter
            data={allSubmissions}
            setFilteredSubm={setFilteredSubm}
          />
        )}
      </Layout>
    </>
  );
};

export default withRouter(Submissions);
