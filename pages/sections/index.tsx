import React, { useState, useEffect } from "react";
import Image from "next/image";
import sectionFetcher from "../../services/sectionFetcher";
import plus from "../../src/assets/plus.svg";
import { TSection } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import SectionSelector from "../../src/components/SectionSelector";
import ModalOnDelete from "../../src/components/modal/ModalOnDelete";

function Sections() {
  const [sections, setSections] = useState<TSection[]>([]);
  const [sectionType, setSectionType] = useState<string>();
  const [itemToDelete, setItemToDelete] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sectionFetcher.getSections().then((response) => {
      setSections(response);
    });
  }, []);

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
    setItemToDelete(e.currentTarget.id.split("/").pop());
    setSectionType(e.currentTarget.id.split("/").shift());
  };

  const handleDeleteConfirmed = (): void => {
    sectionFetcher
      .deleteSectionById(sectionType as string, itemToDelete as string)
      .then(() =>
        sectionFetcher.getSections().then((data) => setSections(data))
      );
    setShowModal(false);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar />
      <SectionSelector />
      <div className="rounded-xl">
        <table className="w-[90%] h-[50px] mt-4 ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <thead className="h-[50px] rounded-t-[10px]">
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody className="rounded-b-[10px]">
            {sections
              .sort((a, b) => (a.title > b.title ? 1 : -1))
              .map((section) => (
                <tr
                  key={section.id}
                  className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
                >
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    {section.title}
                  </td>
                  <td className="border px-5">{section.description}</td>
                  <td className="border text-center">
                    <a href={`/sections/${section.section}/${section.id}`}>
                      📝
                    </a>
                  </td>
                  <td className="border text-center last:rounded-br-[10px]">
                    <button
                      type="button"
                      id={`${section.section}/${section.id}`}
                      onClick={handleItemToDelete}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <a href="/sections/new-section">
          <Image src={plus} alt="logo-plus" />
        </a>
      </div>
      {showModal && (
        <ModalOnDelete
          handleDeleteConfirmed={handleDeleteConfirmed}
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
    </div>
  );
}

export default Sections;
