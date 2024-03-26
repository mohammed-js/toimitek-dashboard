import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MySwitch } from "components/my-switch";
import { Box } from "@mui/material";
import axios from "axios";
import { baseUrl, notifySuccess, notifyError } from "../../utils/generalUtils";
import { useTranslation } from "react-i18next";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
const removeTrailingZeros = (numberString) => {
  // Convert the string to a number to remove trailing zeros
  const number = parseFloat(numberString);

  // Convert the number back to a string
  const result = number.toString();

  return result;
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function Form({
  // formOpen,
  setFormOpen,
  setForceUpdate,
  currentItem,
  setCurrentItem,
  // type,
  setIsLoading,
  item,
}) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  console.log("categories=====>", categories);
  const [items, setItems] = useState([]);
  console.log("currentItem=====>", currentItem);
  const downSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: downSm ? 330 : 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    outline: "none",
    border: "none",
    borderRadius: "4px !important",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };
  const submit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    setFormOpen(false);

    // -----
    let method = currentItem.id ? "patch" : "post";
    let body;
    let headers = {
      // in case not image (binary), form-data will cause no issues
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
    };

    if (item === "unit") {
      body = {
        name: currentItem.name,
      };
    }
    if (item === "category") {
      body = {
        name: currentItem.name,
        code: currentItem.code,
        disabled: currentItem.disabled,
        parent_category: currentItem.parent_category?.id,
        purchase_category: currentItem.purchase_category,
        image: currentItem.image,
      };
    }
    if (item === "product") {
      body = {
        name: currentItem.name,
        code: currentItem.code,
        disabled: currentItem.disabled,
        // has_item: currentItem.has_item,
        purchase_price: currentItem.purchase_price,
        sales_price: currentItem.sales_price,
        category: currentItem.category,
        image: currentItem.image,
        product_items: currentItem.product_items,
      };
    }
    if (item === "service") {
      body = {
        name: currentItem.name,
        code: currentItem.code,
        disabled: currentItem.disabled,
        has_item: currentItem.has_item,
        purchase_price: currentItem.purchase_price,
        sales_price: currentItem.sales_price,
        category: currentItem.category,
        image: currentItem.image,
      };
    }
    if (item === "item") {
      body = {
        name: currentItem.name,
        code: currentItem.code,
        disabled: currentItem.disabled,
        price: currentItem.purchase_price,
        quantity: currentItem.quantity,
        min_quantity: currentItem.sales_price,
        category: currentItem.category,
        image: currentItem.image,
      };
    }
    if (!body.image) {
      delete headers["Content-Type"];
      delete body.image;
    } else {
      body.name = JSON.stringify(currentItem.name, null, 2);
      if (body.product_items.length > 0) {
        body.product_items = JSON.stringify(currentItem.product_items, null, 2);
      }
    }
    console.log(body);
    // if (method === "post") {
    //   body.name = JSON.stringify(currentItem.name, null, 2);
    // }
    let endpoint = currentItem.id ? `${item}/${currentItem.id}` : item;

    axios[method](`${baseUrl}/productsServices/${endpoint}`, body, {
      headers,
    })
      .then((res) => {
        setForceUpdate((prev) => !prev);
      })
      .catch((err) => {
        notifyError("Something went wrong!");
        setForceUpdate((prev) => !prev);
      });
    setCurrentItem({});
  };
  useEffect(() => {
    // remove image url for 1st time, as it needed as a binary not url (if present or not, as it will be removed later from headers and body in any case if have no value)
    setCurrentItem((prev) => ({ ...prev, image: "" }));
    if (
      item === "category" ||
      item === "product" ||
      item === "service" ||
      item === "item"
    ) {
      axios
        .get(`${baseUrl}/productsServices/category?parent=false`, {
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
    }
    if (item === "product") {
      axios
        .get(`${baseUrl}/productsServices/items`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
          },
        })
        .then((res) => {
          console.log("zzzzzzzzzzzzz", res.data);
          setItems(res.data);
        })
        .catch((err) => {
          notifyError("Something went wrong!");
        });
    }
  }, []);
  return (
    <Modal
      // open={formOpen}
      open={true}
      onClose={() => {
        setFormOpen(false);
        setCurrentItem({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={submit}>
        <Box sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
          {currentItem.id ? "Update" : "Create"} {item}
        </Box>
        {item === "unit" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <TextField
              label={t("form.enName")}
              id="en_name"
              value={currentItem?.name?.en}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    en: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.arName")}
              id="ar_name"
              value={currentItem?.name?.ar}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    ar: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
              dir="rtl"
            />
          </Box>
        )}
        {item === "category" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <TextField
              label={t("form.enName")}
              id="en_name"
              value={currentItem?.name?.en}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    en: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.arName")}
              id="ar_name"
              value={currentItem?.name?.ar}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    ar: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
              dir="rtl"
            />
            <TextField
              label={t("form.code")}
              id="code"
              value={currentItem?.code}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  code: e.target.value,
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            {/* don't show if it's a parent (has children) */}
            {!currentItem.child_categories?.[0]?.id &&
              categories.length > 0 && (
                <FormControl className="half_width" size="small">
                  <InputLabel>Parent Category</InputLabel>
                  <Select
                    value={currentItem?.parent_category?.id}
                    label="Parent Category"
                    onChange={(e) => {
                      setCurrentItem((prev) => ({
                        ...prev,
                        parent_category: {
                          ...prev.parent_category,
                          id: e.target.value,
                        },
                      }));
                    }}
                  >
                    <MenuItem value="">No Parent Category</MenuItem>
                    {/* {categories
                  ?.filter((category) => category.id !== currentItem.id)
                  ?.map((category) => (
                    <MenuItem value={category.id}>
                      {`category.name.en (${category.code})`}
                    </MenuItem>
                  ))} */}
                    {categories?.map((category) => (
                      <MenuItem value={category.id}>
                        {`category.name.en (${category.code})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            <FormControlLabel
              sx={{
                width: "100%",
                "& span": {
                  fontSize: "14px !important",
                },
              }}
              control={
                <Switch
                  checked={currentItem?.disabled}
                  onChange={(e) => {
                    setCurrentItem((prev) => ({
                      ...prev,
                      disabled: e.target.checked,
                    }));
                  }}
                  color="success"
                />
              }
              label={currentItem?.disabled ? "Disabled" : "Active"}
            />
            <FormControlLabel
              sx={{
                width: "100%",
                "& span": {
                  fontSize: "14px !important",
                },
              }}
              control={
                <Switch
                  checked={currentItem?.purchase_category}
                  onChange={(e) => {
                    setCurrentItem((prev) => ({
                      ...prev,
                      purchase_category: e.target.checked,
                    }));
                  }}
                  color="success"
                />
              }
              label={
                currentItem?.purchase_category
                  ? "Purchase Category"
                  : "Sales Category"
              }
            />
            <Button
              color="secondary"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              size="small"
              sx={{
                border: "1px dashed #8d8d8d",
              }}
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setCurrentItem((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }));
                }}
              />
            </Button>
          </Box>
        )}
        {item === "product" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <TextField
              label={t("form.enName")}
              id="en_name"
              value={currentItem?.name?.en}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    en: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.arName")}
              id="ar_name"
              value={currentItem?.name?.ar}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    ar: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
              dir="rtl"
            />
            <TextField
              label={t("form.code")}
              id="code"
              value={currentItem?.code}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  code: e.target.value,
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.purchase_price")}
              id="purchase price"
              // value={removeTrailingZeros(currentItem?.purchase_price)}
              value={currentItem?.purchase_price}
              onChange={(e) => {
                const regex = /^[0-9.]*$/;
                // If input value matches the regex or it's an empty string, update the state
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCurrentItem((prev) => ({
                    ...prev,
                    purchase_price: e.target.value,
                  }));
                }
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.sales_price")}
              id="sales price"
              // value={removeTrailingZeros(currentItem?.sales_price)}
              value={currentItem?.sales_price}
              onChange={(e) => {
                const regex = /^[0-9.]*$/;
                // If input value matches the regex or it's an empty string, update the state
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCurrentItem((prev) => ({
                    ...prev,
                    sales_price: e.target.value,
                  }));
                }
              }}
              size="small"
              required
              className="half_width"
            />
            <FormControl className="half_width" size="small" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={currentItem?.category}
                label="Category"
                onChange={(e) => {
                  setCurrentItem((prev) => ({
                    ...prev,
                    category: +e.target.value,
                  }));
                }}
              >
                {/* <MenuItem value="">No Category Chosen</MenuItem> */}
                {categories?.map((category) => (
                  <MenuItem value={category.id}>{category.name.en}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{
                width: "100%",
                "& span": {
                  fontSize: "14px !important",
                },
              }}
              control={
                <Switch
                  checked={currentItem?.disabled}
                  onChange={(e) => {
                    setCurrentItem((prev) => ({
                      ...prev,
                      disabled: e.target.checked,
                    }));
                  }}
                  color="success"
                />
              }
              label={t("form.disabled")}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                sx={{
                  "& span": {
                    fontSize: "14px !important",
                  },
                }}
                control={
                  <Switch
                    checked={currentItem?.has_item}
                    onChange={(e) => {
                      setCurrentItem((prev) => ({
                        ...prev,
                        has_item: e.target.checked,
                        product_items: e.target.checked
                          ? [
                              // ...prev.product_items,
                              { item: "", measurement: "" },
                            ]
                          : [],
                      }));
                    }}
                    color="success"
                  />
                }
                label={t("form.has_item")}
              />
              {currentItem?.has_item && (
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  sx={{
                    ml: "auto",
                    p: 0,
                    m: 0,
                  }}
                >
                  <AddCircleIcon
                    color="success"
                    sx={{ fontSize: 30 }}
                    onClick={(e) => {
                      setCurrentItem((prev) => ({
                        ...prev,
                        product_items: [
                          ...prev.product_items,
                          { item: "", measurement: "" },
                        ],
                      }));
                    }}
                  />
                </IconButton>
              )}
            </Box>
            {currentItem.product_items?.length > 0 &&
              currentItem.product_items.map((item, index) => (
                <Box
                  className="full_width"
                  sx={{
                    display: "flex",
                    // justifyContent: "space-between",
                    gap: "14px",
                    alignItems: "center",
                    border: "2px dashed gray",
                    p: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <FormControl className="third_width" size="small" required>
                    <InputLabel>Item</InputLabel>
                    <Select
                      value={item?.item}
                      label="Item"
                      onChange={(e) => {
                        console.log("after");
                        const clonedProductsItems = [
                          ...currentItem.product_items,
                        ];
                        clonedProductsItems[index].item = +e.target.value;
                        setCurrentItem((prev) => ({
                          ...prev,
                          product_items: clonedProductsItems,
                        }));
                      }}
                    >
                      {/* <MenuItem value="">No Category Chosen</MenuItem> */}
                      {items?.results?.map((item) => (
                        <MenuItem value={item.id}>{item.name.en}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    className="third_width"
                    label={"measurement"}
                    id="measurement"
                    value={item?.measurement}
                    onChange={(e) => {
                      const regex = /^[0-9.]*$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        const clonedProductsItems = [
                          ...currentItem.product_items,
                        ];
                        clonedProductsItems[index].measurement =
                          +e.target.value;
                        setCurrentItem((prev) => ({
                          ...prev,
                          product_items: clonedProductsItems,
                        }));
                      }
                    }}
                    size="small"
                    required
                  />
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    sx={{
                      p: 0,
                      m: 0,
                      ml: "auto",
                    }}
                  >
                    <DeleteIcon
                      color="error"
                      sx={{ fontSize: 30 }}
                      onClick={(e) => {
                        const clonedProductsItems = [
                          ...currentItem.product_items,
                        ];
                        clonedProductsItems.splice(index, 1);
                        setCurrentItem((prev) => ({
                          ...prev,
                          product_items: clonedProductsItems,
                        }));
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
            <Button
              color="secondary"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              size="small"
              sx={{
                border: "1px dashed #8d8d8d",
              }}
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setCurrentItem((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }));
                }}
              />
            </Button>
          </Box>
        )}
        {item === "service" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <TextField
              label={t("form.enName")}
              id="en_name"
              value={currentItem?.name?.en}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    en: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.arName")}
              id="ar_name"
              value={currentItem?.name?.ar}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    ar: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
              dir="rtl"
            />
            <TextField
              label={t("form.code")}
              id="code"
              value={currentItem?.code}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  code: e.target.value,
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.purchase_price")}
              id="purchase price"
              // value={removeTrailingZeros(currentItem?.purchase_price)}
              value={currentItem?.purchase_price}
              onChange={(e) => {
                const regex = /^[0-9.]*$/;
                // If input value matches the regex or it's an empty string, update the state
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCurrentItem((prev) => ({
                    ...prev,
                    purchase_price: e.target.value,
                  }));
                }
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.sales_price")}
              id="sales price"
              // value={removeTrailingZeros(currentItem?.sales_price)}
              value={currentItem?.sales_price}
              onChange={(e) => {
                const regex = /^[0-9.]*$/;
                // If input value matches the regex or it's an empty string, update the state
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCurrentItem((prev) => ({
                    ...prev,
                    sales_price: e.target.value,
                  }));
                }
              }}
              size="small"
              required
              className="half_width"
            />
            <FormControl className="half_width" size="small" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={currentItem?.category}
                label="Category"
                onChange={(e) => {
                  setCurrentItem((prev) => ({
                    ...prev,
                    category: +e.target.value,
                  }));
                }}
              >
                {/* <MenuItem value="">No Category Chosen</MenuItem> */}
                {categories?.map((category) => (
                  <MenuItem value={category.id}>{category.name.en}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{
                width: "100%",
                "& span": {
                  fontSize: "14px !important",
                },
              }}
              control={
                <Switch
                  checked={currentItem?.disabled}
                  onChange={(e) => {
                    setCurrentItem((prev) => ({
                      ...prev,
                      disabled: e.target.checked,
                    }));
                  }}
                  color="success"
                />
              }
              label={t("form.disabled")}
            />
            {/* <FormControlLabel
              sx={{
                width: "100%",
                "& span": {
                  fontSize: "14px !important",
                },
              }}
              control={
                <Switch
                  checked={currentItem?.has_item}
                  onChange={(e) => {
                    setCurrentItem((prev) => ({
                      ...prev,
                      has_item: e.target.checked,
                    }));
                  }}
                  color="success"
                />
              }
              label={t("form.has_item")}
            /> */}
            <Button
              color="secondary"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              size="small"
              sx={{
                border: "1px dashed #8d8d8d",
              }}
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setCurrentItem((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }));
                }}
              />
            </Button>
          </Box>
        )}
        {item === "item" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <TextField
              label={t("form.enName")}
              id="en_name"
              value={currentItem?.name?.en}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    en: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label={t("form.arName")}
              id="ar_name"
              value={currentItem?.name?.ar}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    ar: e.target.value,
                  },
                }));
              }}
              size="small"
              required
              className="half_width"
              dir="rtl"
            />
            <TextField
              label={t("form.code")}
              id="code"
              value={currentItem?.code}
              onChange={(e) => {
                setCurrentItem((prev) => ({
                  ...prev,
                  code: e.target.value,
                }));
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label="price"
              id="price"
              value={currentItem?.price}
              onChange={(e) => {
                const regex = /^[0-9.]*$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCurrentItem((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }));
                }
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label="quantity"
              id="quantity"
              value={currentItem?.quantity}
              onChange={(e) => {
                const regex = /^[0-9.]*$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCurrentItem((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }));
                }
              }}
              size="small"
              required
              className="half_width"
            />
            <TextField
              label="min_quantity"
              id="min_quantity"
              value={currentItem?.min_quantity}
              onChange={(e) => {
                const regex = /^[0-9.]*$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setCurrentItem((prev) => ({
                    ...prev,
                    min_quantity: e.target.value,
                  }));
                }
              }}
              size="small"
              required
              className="half_width"
            />

            <FormControl className="half_width" size="small" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={currentItem?.category}
                label="Category"
                onChange={(e) => {
                  setCurrentItem((prev) => ({
                    ...prev,
                    category: +e.target.value,
                  }));
                }}
              >
                {/* <MenuItem value="">No Category Chosen</MenuItem> */}
                {categories?.map((category) => (
                  <MenuItem value={category.id}>{category.name.en}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{
                width: "100%",
                "& span": {
                  fontSize: "14px !important",
                },
              }}
              control={
                <Switch
                  checked={currentItem?.disabled}
                  onChange={(e) => {
                    setCurrentItem((prev) => ({
                      ...prev,
                      disabled: e.target.checked,
                    }));
                  }}
                  color="success"
                />
              }
              label={t("form.disabled")}
            />
            <Button
              color="secondary"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              size="small"
              sx={{
                border: "1px dashed #8d8d8d",
              }}
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setCurrentItem((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }));
                }}
              />
            </Button>
          </Box>
        )}

        {/* <Box
          <Box
            className="input_container_full"
            sx={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
          >
            {["", "", "", ""].map((item, index) => (
              <MySwitch
                user={{ is_active: true }}
                color={currentItem.id ? "primary" : "success"}
              />
            ))}
          </Box>
        </Box> */}

        <Button
          type="submit"
          variant="contained"
          color={currentItem.id ? "primary" : "success"}
          sx={{
            color: "#fff",
            transition: "opacity .3s",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette[currentItem.id ? "primary" : "success"].main,
              opacity: ".8",
            },
          }}
        >
          {currentItem.id ? "Update" : "Create"}
        </Button>
      </Box>
    </Modal>
  );
}
