import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "@uidotdev/usehooks";
import { contactSchema } from "./ContactSchema"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactUs = () => {
  const isMobile = useMediaQuery("only screen and (max-width: 769px)");
  const form = useRef();
  
  const [errors, setErrors] = useState({});
  
  const sendEmail = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);
    const values = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      user_phone: formData.get("user_phone"),
      message: formData.get("message"),
    };

    try {
      await contactSchema.validate(values, { abortEarly: false });
      setErrors({}); 
      
      await emailjs.sendForm("service_85q5ouv", "template_ijxyy2w", form.current, {
        publicKey: "J0AOn-bhbOtNNwZ-d",
      });
      
      toast.success("Message sent successfully!")
      e.target.reset();
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className={` ${isMobile ? " items-center" : "max-w-2xl"} w-[1000px] shadow-lg rounded-lg px-10 pt-10 pb-[10.5rem] `}>
      <h2 className="gradient-text font-nunito text-[0.875rem] font-bold uppercase mb-4">Contact</h2>

      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div>
          <input
            type="text"
            name="user_name"
            className={`mt-1 px-3 py-2 bg-transparent text-white placeholder:text-[#C4C4C499] border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.user_name ? 'border-red-500' : 'border-[#4D4D4D]'} focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Full Name"
            required
          />
          {errors.user_name && <p className="text-red-500 text-sm mt-2">{errors.user_name}</p>}
        </div>
        <div>
          <input
            type="text"
            name="user_email"
            className={`mt-1 px-3 py-2 bg-transparent text-white placeholder:text-[#C4C4C499] border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.user_email ? 'border-red-500' : 'border-[#4D4D4D]'} focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Email"
            required
          />
          {errors.user_email && <p className="text-red-500 text-sm mt-2">{errors.user_email}</p>}
        </div>
        <div>
          <input
            type="number"
            name="user_phone"
            className={`mt-1 px-3 py-2 bg-transparent text-white placeholder:text-[#C4C4C499] border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.user_phone ? 'border-red-500' : 'border-[#4D4D4D]'} focus:ring-blue-500 focus:border-blue-500 no-arrows`}
            placeholder="Phone number"
            required
          />
          {errors.user_phone && <p className="text-red-500 text-sm mt-2">{errors.user_phone}</p>}
        </div>
        <div>
          <textarea
            name="message"
            className={`mt-1 px-3 py-2 bg-transparent text-white placeholder:text-[#C4C4C499] border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500' : 'border-[#4D4D4D]'} focus:ring-blue-500 focus:border-blue-500`}
            rows="5"
            placeholder="Write your message"
            required
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        <div className="flex justify-end">
          <input
            type="submit"
            value="Send"
            className="px-4 py-2 border-[#4D4D4D] border-[1px] text-[#C4C4C499] w-[35%] rounded-lg  hover:text-black  duration-700 hover:bg-[#D7FD44] hover:scale-105 hover:transition-transform cursor-pointer"
          />
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};
