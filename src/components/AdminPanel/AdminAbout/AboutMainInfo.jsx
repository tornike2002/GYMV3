import { useContext, useState } from "react";
import { useCertification } from "../../../hooks/useCertification";
import { useFetchAbout } from "../../../hooks/useFetchAbout";
import { Mycontext } from "../../../context/Context";
import useEditAbout from "../../../hooks/useEditAbout";
import UpdateButton from "./UpdateButton";
import CertificateAddModal from "./CertificateAddModal";
import useAddCertification from "../../../hooks/useAddCertification";
import { useDeleteCertification } from "../../../hooks/useDeleteCertificate";
import EditCertification from "./EditCertification";
import AboutHeader from "./AboutHeader";
import Skeleton from "react-loading-skeleton";

export default function AboutMainInfo() {
  const [certificateText, setCertificateText] = useState("");
  const [certificateStart, setCertificateStart] = useState("");
  const [certificateEnd, setCertificateEnd] = useState("");
  const {openCertificateModal,setOpenCertificateModal,selectedCertificateId,setSelectedCertificateId,isOpenModalCertificate, setIsOpenModalCertificate} = useContext(Mycontext);
  const { data, isLoading, error, isError } = useFetchAbout();
  const { data: certifications } = useCertification();
  const { mutate: deleteCertification } = useDeleteCertification();
  const { addCertificateInfo } = useAddCertification();
  const editAbout = useEditAbout()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mt-[1.87rem]">

      <div className="w-full">
        <Skeleton height={40} width={200} className="mb-4" />
        <Skeleton height={40} width={150} />
      </div>
      <div className="w-full">
        <Skeleton height={40} width={200} className="mb-4" />
        <Skeleton height={40} width={150} />
      </div>
      <div className="w-full">
        <Skeleton height={40} width={200} className="mb-4" />
        <Skeleton height={40} borderRadius={20} className="mb-4" />
        <Skeleton height={200} className="mb-4" />
        <Skeleton height={40} width={150} />
        <Skeleton height={40} className="mb-4" />
        <Skeleton height={200} className="mb-4" />
        <Skeleton height={200} className="mb-4" />
      </div>
    </div>)
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  function aboutFormAction(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formAction = Object.fromEntries(formData);
    
    const updatedAbout = {
      story: formAction.story,
      experience: formAction.experience,
    };
    

    editAbout.mutate(
      { id: data.about[0].id, updatedAbout },
      {
        onSuccess: () => {
          console.log("About info updated successfully!");
        },
        onError: (error) => {
          console.error("Failed to update about info:", error.message);
        },
      }
    )
    if (selectedCertificateId) {
    }

    if (certificateText.trim() != "") {
      try {
        addCertificateInfo({
          name: certificateText,
          startDate: certificateStart,
          endDate: certificateEnd
        });
        setCertificateText("");
        setOpenCertificateModal(false)
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleCertificationEdit = (id) => {
    setSelectedCertificateId(id)
    setIsOpenModalCertificate(true)
  }

  const handleOpenCertificateModal = (id) => {
    setOpenCertificateModal(true);
  };
  const handleCloseCertificateModal = (id) => {
    setOpenCertificateModal(false);
  };

  const handleDelete = (id) => {
    deleteCertification(id);
  };

  const { story, experience } = data.about[0];
  const certification = certifications?.data;

  return (
    <div className="flex flex-col gap-3 mt-[1.87rem]">
      <AboutHeader />
      <form onSubmit={aboutFormAction}>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col w-full gap-3">
            <p className="text-white">Share your story</p>
            <textarea
              className="placeholder:w-[34rem] w-full p-[0.625rem] rounded-2xl bg-[#323232] text-white font-light placeholder:text-[#C4C4C4]"
              placeholder="Hi, I'm Tuna, a personal trainer dedicated to helping people transform through fitness. My journey began when I overcame my own struggles with body confidence and health. Now, I use my experience to empower others to achieve their fitness goals..."
              name="story"
              cols="30"
              rows="7"
              defaultValue={story}
            ></textarea>
          </div>

          <div>
            <p className="text-white">Experience</p>
            <input
              type="number"
              name="experience"
              placeholder="add your experience"
              className="placeholder:w-[34rem] w-full p-[0.625rem] rounded-2xl bg-[#323232] text-white font-light placeholder:text-[#C4C4C4]"
              defaultValue={experience}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 ">
              <label className="text-white">Certification</label>
              {certification?.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#323232] p-[0.625rem] shadow-lg rounded-lg"
                >
                  <div className="w-full flex items-center justify-between  rounded-2xl bg-[#323232] text-white font-light placeholder:text-[#C4C4C4]">
                    <p name="certification">{item.name}</p>
                    <div className="flex gap-6 items-center">

                    <div onClick={() => handleCertificationEdit(item.id)} className="bg-[#D7FD44] w-[2.375rem] h-[2.375rem] rounded-full flex items-center justify-center cursor-pointer">
                    <img
                        className="w-[1rem] h-[1rem]"
                        src="/pen.png"
                        alt="Edit"
                      />
                    </div>
                    <img
                      src="/delete.png"
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center justify-between py-6 bg-transparent rounded-lg ">
                    <div className="flex flex-col">
                      <label className="text-green-300">Start Date:</label>
                      <input
                        type="text"
                        defaultValue={item.startDate}
                        className="px-4 py-2 border border-gray-300 bg-[#323232] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Start Date"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <label className="text-red-300">End Date:</label>
                      <input
                        type="text"
                        defaultValue={item.endDate}
                        className="px-4 py-2 border border-gray-300 bg-[#323232] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {openCertificateModal && (
              <CertificateAddModal
                certificateText={certificateText}
                setCertificateText={setCertificateText}
                certificateStart={certificateStart}
                setCertificateStart={setCertificateStart}
                certificateEnd={certificateEnd}
                setCertificateEnd={setCertificateEnd}
              />
            )}
            <div className="flex justify-center items-center py-4 gap-4">
              <div
                className="border-[1px] border-[#D7FD44] flex gap-[0.62rem] px-10 py-2 rounded-3xl cursor-pointer max-w-[15.1875rem]"
                onClick={() => handleOpenCertificateModal(null)}
              >
                <p className="w-3 h-3 text-[#D7FD44]">+</p>
                <p className="text-[#D7FD44]">Add Experience</p>
              </div>
              {openCertificateModal && <div
                className="border-[1px] border-[#D7FD44] flex gap-[0.62rem] px-10 py-2 rounded-3xl cursor-pointer max-w-[15.1875rem]"
                onClick={() => handleCloseCertificateModal(null)}
              >
                <p className="text-[#D7FD44]">Cancel</p>
              </div>}
            </div>
          </div>
        </div>
        <UpdateButton />
      </form>
      {isOpenModalCertificate && selectedCertificateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditCertification />
        </div>
      )}
    </div>
  );
}
