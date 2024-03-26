import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl, notifySuccess, notifyError } from "../../utils/generalUtils";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { Form } from "components/form";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { MyDialog } from "components/myDialog";
import { MySwitch } from "components/my-switch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// ==============================|| Styles ||============================== //
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#0079c8",
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// ==============================|| Component ||============================== //
const CategoriesPage = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState({});
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  // ---
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ---
  useEffect(() => {
    setIsLoading(true);
    let queryParams = searchQuery
      ? `page=${page}&paginate=true&search=${searchQuery}`
      : `page=${page}&paginate=true`;
    axios
      .get(`${baseUrl}/productsServices/category?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        notifyError("Something went wrong!");
        setIsLoading(false);
      });
  }, [page, forceUpdate]);

  return (
    <>
      <MyDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setIsLoading={setIsLoading}
        setForceUpdate={setForceUpdate}
        item="category"
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      {formOpen && (
        <Form
          // formOpen={formOpen}
          setFormOpen={setFormOpen}
          setForceUpdate={setForceUpdate}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          setIsLoading={setIsLoading}
          item="category"
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
        }}
      >
        {data?.results?.length > 0 && (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
              height: 40,
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              borderRadius: "4px !important",
              mb: "10px",
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                border: "none !important",
                outline: "none !important",
                "& :focus": {
                  border: "none !important",
                  outline: "none !important",
                },
              }}
              placeholder="Search by name or code..."
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => {
                setSearchQuery(e.target.value);

                if (e.target.value === "") {
                  setForceUpdate((prev) => !prev);
                }
              }}
              value={searchQuery}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon
                onClick={() => {
                  setForceUpdate((prev) => !prev);
                }}
              />
            </IconButton>
          </Paper>
        )}
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          sx={{
            ml: "auto",
          }}
        >
          <AddCircleIcon
            color="success"
            sx={{ fontSize: 30 }}
            onClick={() => {
              setFormOpen(true);
            }}
          />
        </IconButton>
      </Box>
      {Math.ceil(data.count / 6) > 1 && (
        <Pagination
          variant="outlined"
          color="primary"
          count={Math.ceil(data.count / 6)}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{
            mb: "10px",
          }}
        />
      )}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress size="50px" />
        </Box>
      )}
      {!isLoading && data?.results?.length > 0 && (
        <>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "100%",
              borderRadius: "4px !important",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important",
            }}
          >
            <Table
              sx={{ maxWidth: "100%", p: "10px" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">English Name</StyledTableCell>
                  <StyledTableCell align="center">Arabic Name</StyledTableCell>
                  <StyledTableCell align="center">Active</StyledTableCell>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">
                    Category or Subcategory
                  </StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">
                    Subcategories
                  </StyledTableCell>
                  <StyledTableCell align="center">Image</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "50px" }}>
                    Edit
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "50px" }}>
                    Delete
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((item, i) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell align="center">
                      {item.name.en}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.name.ar}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* <MySwitch
                        item={item}
                        endpoint="/productsServices/category"
                        key="disabled"
                        id={item.id}
                        initialStatus={item.disabled}
                        color="success"
                        // setForceUpdate={setForceUpdate}
                      /> */}
                      {item.disabled ? (
                        <div className="red">No</div>
                      ) : (
                        <div className="green">Yes</div>
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Box className="black">{item.code}</Box>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {/* <MySwitch
                        item={item}
                        endpoint="/productsServices/category"
                        key="disabled"
                        id={item.id}
                        initialStatus={item.purchase_category}
                        color="success"
                        // setForceUpdate={setForceUpdate}
                      /> */}
                      {item.purchase_category ? (
                        <div className="green">Purchase</div>
                      ) : (
                        <div className="red">Sales</div>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.parent_category ? (
                        <Box
                          sx={{
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            borderRadius: "4px",
                            p: "4px",
                          }}
                        >
                          Subcategory
                        </Box>
                      ) : item.child_categories.length > 0 ? (
                        <Box
                          sx={{
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            borderRadius: "4px",
                            p: "4px",
                          }}
                        >
                          Category
                        </Box>
                      ) : (
                        <Box>-</Box>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.parent_category
                        ? item.parent_category.name.en
                        : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.child_categories.length > 0 ? (
                        <>
                          <div>
                            <Button
                              variant="outlined"
                              id="fade-button"
                              aria-controls={open ? "fade-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                              size="small"
                              endIcon={<ArrowDropDownIcon />}
                            >
                              Subcategories
                            </Button>
                            <Menu
                              sx={{ cursor: "default !important" }}
                              id="fade-menu"
                              MenuListProps={{
                                "aria-labelledby": "fade-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              TransitionComponent={Fade}
                            >
                              {item.child_categories?.map((category) => (
                                <MenuItem
                                  value={category.id}
                                  sx={{ cursor: "default !important" }}
                                >
                                  {category.name.en}
                                </MenuItem>
                              ))}
                            </Menu>
                          </div>
                        </>
                      ) : (
                        "-"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.image ? (
                        <Box
                          component="a"
                          href={item.image}
                          target="_blank"
                          sx={{
                            color: "blue",
                          }}
                        >
                          Image
                        </Box>
                      ) : (
                        "-"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        <EditIcon
                          onClick={() => {
                            setFormOpen(true);
                            setCurrentItem(item);
                          }}
                        />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        color="error"
                        aria-label="add to shopping cart"
                      >
                        <DeleteIcon
                          onClick={() => {
                            setDialogOpen(true);
                            setCurrentItem(item);
                          }}
                        />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {Array.isArray(data?.results) && data?.results.length == 0 && (
        <Box
          component="img"
          src="/empty.png"
          sx={{
            height: "300px",
            fontSize: "30px",
            // boxShadow:
            //   "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            borderRadius: "4px !important",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            maxWidth: "100%",
          }}
        />
      )}
    </>
  );
};
export default CategoriesPage;
