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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
const ProductsPage = () => {
  const [pageType, setPageType] = useState("product");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentItemInitialValue =
    pageType === "product"
      ? {
          product_items: [],
        }
      : {};
  const [currentItem, setCurrentItem] = useState(currentItemInitialValue);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let queryParams = searchQuery
      ? `page=${page}&paginate=true&search=${searchQuery}`
      : `page=${page}&paginate=true`;
    axios
      .get(
        `${baseUrl}/productsServices/${
          pageType === "product" ? "product" : "service"
        }?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        notifyError("Something went wrong!");
        setIsLoading(false);
        setError(true);
      });
  }, [page, forceUpdate]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/productsServices/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        notifyError("Something went wrong!");
      });
  }, []);
  return (
    <>
      <MyDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setIsLoading={setIsLoading}
        setForceUpdate={setForceUpdate}
        item={pageType === "product" ? "product" : "service"}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      {formOpen && (
        <Form
          setFormOpen={setFormOpen}
          setForceUpdate={setForceUpdate}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          setIsLoading={setIsLoading}
          item={pageType === "product" ? "product" : "service"}
        />
      )}
      <FormControl sx={{ my: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Type</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={pageType}
          label="Type"
          onChange={(e) => {
            setIsLoading(true);
            setData({});
            setPageType(e.target.value);
            setForceUpdate((prev) => !prev);
          }}
        >
          <MenuItem value="product">Product</MenuItem>
          <MenuItem value="service">Service</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
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

      {error && !isLoading && (
        <Box
          component="img"
          src="/error.png"
          sx={{
            height: "300px",
            fontSize: "30px",
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
      {(isLoading || categories.length == 0) && (
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
      {!isLoading && data?.results?.length > 0 && categories.length > 0 && (
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
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Sales Price</StyledTableCell>
                  <StyledTableCell align="center">
                    Purchase Price
                  </StyledTableCell>
                  <StyledTableCell align="center">Image</StyledTableCell>
                  {pageType === "product" && (
                    <StyledTableCell align="center">Has Item?</StyledTableCell>
                  )}
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
                      {
                        categories?.filter(
                          (category) => category.id == item.category
                        )?.[0]?.name?.en
                      }
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.sales_price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.purchase_price}
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
                    {pageType === "product" && (
                      <StyledTableCell align="center">
                        {item.has_item ? (
                          <div className="green">Yes</div>
                        ) : (
                          <div className="red">No</div>
                        )}
                      </StyledTableCell>
                    )}

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

      {Array.isArray(data?.results) &&
        data?.results.length == 0 &&
        !isLoading && (
          <Box
            component="img"
            src="/empty.png"
            sx={{
              height: "300px",
              fontSize: "30px",
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
export default ProductsPage;
