import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDarkMode } from "../../Offers/DarkModeContext";
import "./CreateOrderForm.scss";

const CreateOfferDialog = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [vatInvoice, setVatInvoice] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    province: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isDarkMode } = useDarkMode();
  const isSmallScreen = window.innerWidth <= 800;

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.startsWith("+") ? phone : `+${phone}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    const isAddressComplete =
      address.street && address.city && address.postalCode && address.province;

    if (!formattedPhoneNumber && !isAddressComplete) {
      setError("Either a valid phone number or a complete address is required.");
      setLoading(false);
      return;
    }

    const offerPayload = {
      title,
      description,
      vatInvoice,
      price: parseFloat(price),
      status,
      location: isAddressComplete ? address : null,
      phoneNumber: formattedPhoneNumber || null,
    };

    console.log("Sending Offer Payload:", JSON.stringify(offerPayload, null, 2));

    try {
      const response = await fetch("http://localhost:3000/api/offers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API error");
      }

      const result = await response.json();
      console.log("Offer created successfully:", result);

      setTitle("");
      setDescription("");
      setPrice("");
      setStatus(1);
      setVatInvoice(false);
      setPhoneNumber("");
      setAddress({ street: "", city: "", postalCode: "", province: "" });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isSmallScreen}
      className={`create-offer-dialog ${isSmallScreen ? "full-screen" : ""}`}
      PaperProps={{
        style: {
          borderRadius: 20,
          backgroundColor: "black"
        },
      }}
    >
      <div className={`create-offer-header ${isDarkMode ? "dark-mode" : ""}`}>
        <h2>Create New Offer</h2>
        <IconButton onClick={onClose} className={`create-offer-close-button ${isDarkMode ? "dark-mode" : ""}`}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent className={`create-offer-content ${isDarkMode ? "dark-mode" : ""}`}>
        <form onSubmit={handleSubmit} className="form-container">
          {/* Section 1: Basic Details */}
          <div className="offer-section basic-details">
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`input-field ${isDarkMode ? "dark-mode" : ""}`}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`input-field ${isDarkMode ? "dark-mode" : ""}`}
            />
            <div className="form-item full-width">
              <TextareaAutosize
                placeholder="Description"
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`fancy-textarea ${isDarkMode ? "dark-mode" : ""}`}
              />
            </div>
          </div>

          {/* Section 2: Contact & Address */}
          <div className="offer-section contact-details">
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              size="small"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`input-field ${isDarkMode ? "dark-mode" : ""}`}
            />
            {["street", "city", "postalCode", "province"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                variant="outlined"
                fullWidth
                size="small"
                value={address[field]}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, [field]: e.target.value }))
                }
                className={`input-field ${isDarkMode ? "dark-mode" : ""}`}
              />
            ))}
          </div>

          {/* Section 3: Additional Options */}
          <div className="offer-section additional-options">
            <FormControl
              fullWidth
              size="small"
              className={`input-field ${isDarkMode ? "dark-mode" : ""}`}
            >
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Select>
            </FormControl>
            <div className={`invoice-switch ${isDarkMode ? "dark-mode" : ""}`}>
              <FormControlLabel
                className="invoice-switch-label"
                control={
                  <Switch
                    checked={vatInvoice}
                    onChange={(e) => setVatInvoice(e.target.checked)}
                    className="invoice-switch"
                  />
                }
                label={
                  <Typography className="invoice-switch-label-text" style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                    Invoice
                  </Typography>
                }
              />
              <RequestQuoteOutlinedIcon />
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
      </DialogContent>
      <DialogActions className={`create-offer-footer ${isDarkMode ? "dark-mode" : ""}`}>
        <Button variant="contained" color="error" onClick={onClose} startIcon={<CloseIcon />} className="filter-button">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          startIcon={<DoneIcon />}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Offer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOfferDialog;
