import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import sectionFetcher from "../../../services/sectionFetcher";
import plus from "../../../src/assets/plus.svg";
import { TSection } from "../../../src/types/types";
import SearchBar from "../../../src/components/SearchBar";
import SectionSelector from "../../../src/components/SectionSelector";
import ModalOnDelete from "../../../src/components/modal/ModalOnDelete";

function Section() {
  const [section, setSection] = useState<TSection[]>([]);
  const router = useRouter();
  const typeOfSection = localStorage.getItem("sectionName");
  const [itemToDelete, setItemToDelete] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (router.query.section) {
      sectionFetcher
        .getSectionContent(router.query.section)
        .then((response) => {
          setSection(response);
        });
    }
  }, [router]);

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
    setItemToDelete(e.currentTarget.id);
    console.log(router.query.section, itemToDelete);
  };

  const handleDeleteConfirmed = (): void => {
    sectionFetcher
      .deleteSectionById(router.query.section as string, itemToDelete as string)
      .then(() =>
        sectionFetcher
          .getSectionContent(router.query.section as string)
          .then((data) => setSection(data))
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
            {section
              .sort((a, b) => (a.title > b.title ? 1 : -1))
              .filter((item) => {
                switch (localStorage.getItem("sectionName")) {
                  case "Hero Slider":
                    if (item.isHero === true) return true;
                    return false;
                  case "Carrousel Static":
                    if (item.isHero === false) return true;
                    return false;
                  case "Carrousel Dynamic":
                    if (item.isGrid === false) return true;
                    return false;
                  case "Grid Dynamic":
                    if (item.isGrid === true) return true;
                    return false;
                  case "Advertising":
                    return true;
                  default:
                    return false;
                }
              })

              .map((item: TSection) => (
                <tr
                  key={item.id}
                  className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
                >
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    {item.title}
                  </td>
                  <td className="border px-5">{item.description}</td>
                  <td className="border text-center">
                    <a href={`/sections/${item.section}/${item.id}`}>📝</a>
                  </td>
                  <td className="border text-center last:rounded-br-[10px]">
                    <button
                      type="button"
                      id={item.id}
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
        {typeOfSection === "Hero Slider" && (
          <a href="/sections/static-sections/new-hero-slider">
            <Image src={plus} alt="add-button" />
          </a>
        )}
        {typeOfSection === "Carrousel Static" && (
          <a href="/sections/static-sections/new-static-carousel">
            <Image src={plus} alt="add-button" />
          </a>
        )}
        {typeOfSection === "Carrousel Dynamic" && (
          <a href="/sections/new-section">
            <Image src={plus} alt="add-button" />
          </a>
        )}
        {typeOfSection === "Grid Dynamic" && (
          <a href="/sections/new-section">
            <Image src={plus} alt="add-button" />
          </a>
        )}
        {typeOfSection === "Advertising" && (
          <a href="/sections/new-section">
            <Image src={plus} alt="add-button" />
          </a>
        )}
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

export default Section;
