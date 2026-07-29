import axios from "axios";

const ContactUs = async (formData) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/contact",
    formData
  );

  return response.data;
};

export default ContactUs;