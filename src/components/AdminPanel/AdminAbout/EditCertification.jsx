import React, { useContext, useState } from "react";
import useEditCertification from "../../../hooks/useEditCertification";
import { useCertification } from "../../../hooks/useCertification";
import { Mycontext } from "../../../context/Context";
import { useCertificationId } from "../../../hooks/useCertificationId";
import Cancel from "/cancel.svg";

export default function EditCertification() {
  const [certificateText, setCertificateText] = useState("");
  const [certificateStart, setCertificateStart] = useState("");
  const { selectedCertificateId,isOpenModalCertificate, setIsOpenModalCertificate } = useContext(Mycontext);
  const { data: certificationId, isError : isErrorCert, error : errorCert, isLoading: isLoadingCert } = useCertificationId(selectedCertificateId);
  const { mutate: editCertification,isPending,isError,error } = useEditCertification();

  if (isPending) {
    return <p>Pending...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isLoadingCert) {
    return <p>Loading...</p>;
  }

  if (isErrorCert) {
    return <p>{errorCert.message}</p>;
  }

  const { id, name, endDate, startDate } = certificationId?.about[0] || {};

  function certificateSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name")
    const startDate = formData.get("startDate")
    const endDate = formData.get("endDate")
    // console.log(formAction);

    editCertification({id, name, startDate, endDate});

    setIsOpenModalCertificate(!isOpenModalCertificate)
  }

  return (
    <div className="p-[2.56rem] bg-[#323232] flex items-center justify-center w-[55rem] rounded-[1.25rem]">
      <div className="px-[1.375rem] bg-black rounded-lg w-full py-[2.56rem]">
        <div className="flex w-full items-center justify-between pb-[2.56rem]">
          <div className="flex flex-col gap-4">
            <p className="uppercase font-bold text-[1.5rem] text-white">
              Edit Certification
            </p>
            <p className="text-white">Edit Certification you provide</p>
          </div>
          <div
            onClick={() => setIsOpenModalCertificate(!isOpenModalCertificate)}
            className="bg-[#D7FD44] flex py-4 px-4 items-center justify-center rounded-full cursor-pointer"
          >
            <img src={Cancel} alt="Close" />
          </div>
        </div>
        <form onSubmit={certificateSubmit}>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <h2 className="text-white">Input Certification Title</h2>
            </div>
            <div className="flex flex-col ml-[1.44rem]">
              <input
                type="text"
                className="w-full bg-[#323232] rounded-lg h-11 pl-[1.44rem] text-white"
                placeholder="Weight Loss"
                name="name"
                defaultValue={name}
              />
            </div>
            <div className="flex flex-col ml-[1.44rem]">
              <input
                type="text"
                className="w-full bg-[#323232] rounded-lg h-11 pl-[1.44rem] text-white"
                placeholder="Weight Loss"
                name="startDate"
                defaultValue={startDate}
              />
            </div>
            <div className="flex flex-col ml-[1.44rem]">
              <input
                type="text"
                className="w-full bg-[#323232] rounded-lg h-11 pl-[1.44rem] text-white"
                placeholder="Weight Loss"
                name="endDate"
                defaultValue={endDate}
              />
            </div>
          </div>
          <button className="flex items-center justify-center mt-[3.81rem] ">
            <div className="border-[1px] border-[#D7FD44] flex gap-[0.62rem] px-10 py-2 rounded-3xl cursor-pointer">
              <p className="w-3 h-3 text-[#D7FD44]">+</p>
              <p className="text-[#D7FD44]">Edit Certificate</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

// {certification?.map((item) => (
//   <div
//     key={item.id}
//     className="bg-[#323232] p-[0.625rem] shadow-lg rounded-lg"
//   >
//     <div className="w-full flex items-center justify-between   rounded-2xl bg-[#323232] text-white font-light placeholder:text-[#C4C4C4]">
//       <input
//         name="certification"
//         className="placeholder:w-[34rem] w-[70%]  rounded-2xl bg-[#323232] text-white font-light placeholder:text-[#C4C4C4]"
//         defaultValue={item.name}
//       />
//       <p onClick={() => handleCertificationEdit(item.id)}>Edit</p>
//       <img
//         src="/delete.png"
//         className="w-4 h-4"
//         onClick={() => handleDelete(item.id)}
//       />
//     </div>
//     <div className="flex gap-4 items-center justify-between py-6 bg-transparent rounded-lg ">
//       <div className="flex flex-col">
//         <label className="text-green-300">Start Date:</label>
//         <input
//           type="text"
//           defaultValue={item.startDate}
//           className="px-4 py-2 border border-gray-300 bg-[#323232] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
//           placeholder="Start Date"
//         />
//       </div>
//       <div className="flex flex-col ">
//         <label className="text-red-300">End Date:</label>
//         <input
//           type="text"
//           defaultValue={item.endDate}
//           className="px-4 py-2 border border-gray-300 bg-[#323232] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
//           placeholder="End Date"
//         />
//       </div>
//     </div>
//   </div>
// ))}
