"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { TSection, TSectionItem } from "../../src/types/types";
import plus from "../../src/assets/plus.svg";
import sectionsTypes from "../../src/types/sectionsTypes";
import sectionFetcher from "../../services/sectionFetcher";
import pageFetcher from "../../services/pageFetcher";

export default function SectionItem() {
  const router = useRouter();
  const [sections, setSections] = useState<Partial<TSection[]>>();
  const [createMode, setCreateMode] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [currentRow, setCurrentRow] = useState<Partial<TSectionItem>>();
  const [rows, setRows] = useState<TSectionItem[]>([]);
  const [rowCounter, setRowCounter] = useState<number>(1);

  const feedSectionSelector = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const type = value.split("/")[0];
    let typeLatest = "";
    switch (type) {
      case "static-sections":
        if (value.split("/")[1] === "true") {
          typeLatest = "Hero Slider";
        } else {
          typeLatest = "Carrousel Static";
        }
        break;
      case "dynamic-sections":
        if (value.split("/")[1] === "true") {
          typeLatest = "Grid Dynamic";
        } else {
          typeLatest = "Carrousel Dynamic";
        }
        break;
      case "advertisings":
        typeLatest = "Advertising";
        break;
      default:
        typeLatest = "";
    }

    const status = /true/.test(value.split("/")[1] as string);
    sectionFetcher
      .getSectionByTypeAndStatus(type as string, status)
      .then((response) => {
        setSections(response);
      });
    setCurrentRow({
      ...currentRow,
      type: type as string,
      typeLatest: typeLatest as string,
    });
  };

  const sectionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCurrentRow({
      ...currentRow,
      sectionId: value.split("/")[0],
      sectionName: value.split("/")[1],
      position: rowCounter,
      sectionCount: rowCounter,
    });
  };

  const rowSave = () => {
    if (currentRow?.type !== undefined && currentRow?.sectionId !== undefined) {
      setCreateMode(!createMode);
      setRows([...rows, currentRow as TSectionItem]);
      console.log(...rows);
    }
  };

  const moveRowUp = (row: TSectionItem) => {
    const index = rows.indexOf(row);
    if (index > 0) {
      const temp = rows[index - 1];
      const tempPosition = rows[index - 1].position;
      rows[index - 1] = rows[index];
      rows[index - 1].position = tempPosition;
      rows[index] = temp;
      rows[index].position = index + 1;
      setRows([...rows]);
    }
  };

  const moveRowDown = (row: TSectionItem) => {
    const index = rows.indexOf(row);
    if (index < rows.length - 1) {
      const temp = rows[index + 1];
      const tempPosition = rows[index + 1].position;
      rows[index + 1] = rows[index];
      rows[index + 1].position = tempPosition;
      rows[index] = temp;
      rows[index].position = index + 1;
      setRows([...rows]);
    }
  };

  const refreshRowPosition = () => {
    rows.forEach((row, index) => {
      const updatedRow = { ...row };
      updatedRow.position = index + 1;
      rows[index] = updatedRow;
    });
    setRows([...rows]);
  };

  const deleteRow = (row: TSectionItem) => {
    const index = rows.indexOf(row);
    rows.splice(index, 1);
    refreshRowPosition();
    setRows([...rows]);
    setRowCounter(rows.length + 1);
  };

  const handleItemToCreate = () => {
    const pagesSectionsStaticData: { id: string; position: number }[] = [];
    const pagesSectionsDynamicData: { id: string; position: number }[] = [];
    const pagesAdvertisingsData: { id: string; position: number }[] = [];
    rows.forEach((row) => {
      if (row.type === "static-sections") {
        pagesSectionsStaticData.push({
          id: row.sectionId,
          position: row.position,
        });
      }
      if (row.type === "dynamic-sections") {
        pagesSectionsDynamicData.push({
          id: row.sectionId,
          position: row.position,
        });
      }
      if (row.type === "advertisings") {
        pagesAdvertisingsData.push({
          id: row.sectionId,
          position: row.position,
        });
      }
    });
    const page = {
      title,
      pagesSectionsStaticData,
      pagesSectionsDynamicData,
      pagesAdvertisingsData,
    };
    if (
      page.title === "" ||
      page.pagesAdvertisingsData.length +
        page.pagesSectionsDynamicData.length +
        page.pagesSectionsStaticData.length ===
        0
    ) {
      alert("Please fill the title and at least one section");
      return;
    }
    pageFetcher.createPage(page);
    router.push("/pages");
  };

  const handleItemToCancel = () => {
    setCreateMode(!createMode);
  };

  return (
    <div>
      <div className="container-fields ml-[5%] mt-[5%]">
        <label htmlFor="title" className="title-field">
          Page title
          <input
            className="input-field"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div className="w-full bg-lightgrey">
        <div className="rounded-xl">
          <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
            <thead className="h-[50px] rounded-t-[10px]">
              <tr>
                <th>Type</th>
                <th>Section</th>
                <th>Position</th>
                <th>Move</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="rounded-b-[10px]">
              {rows &&
                rows.map((row) => (
                  <tr className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]">
                    <td className="border border-black px-5 last:rounded-bl-[10px]">
                      <p className="w-full">{row.typeLatest}</p>
                    </td>
                    <td className="border border-black px-5 last:rounded-bl-[10px]">
                      <p className="w-full">{row.sectionName}</p>
                    </td>
                    <td className="border text-center">{row.position}</td>
                    <td className="h-full w-full border-t flex justify-around items-center">
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowUp(row)}
                      >
                        ⬆️
                      </button>
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowDown(row)}
                      >
                        ⬇️
                      </button>
                    </td>
                    <td className="px-2 border text-center">
                      <button
                        className="w-full h-full bg-red"
                        type="button"
                        onClick={() => deleteRow(row)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}

              {createMode && (
                <tr className="h-[45px] odd:bg-lightgrey even:bg-white">
                  <td className="border border-black px-5">
                    <select
                      className="w-full"
                      onChange={(e) => feedSectionSelector(e)}
                    >
                      <option className="w-full" value="0">
                        Select section type
                      </option>
                      {sectionsTypes
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((type) => (
                          <option
                            className="w-full"
                            key={type.id}
                            value={`${type.section}/${
                              type.isHero || type.isGrid || false
                            }`}
                          >
                            {type.name}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    <select
                      className="w-full"
                      onChange={(e) => sectionSelect(e)}
                    >
                      <option className="w-full" value="0">
                        Select section
                      </option>
                      {sections &&
                        sections
                          .sort((a, b) => (a.title > b.title ? 1 : -1))
                          .map((section) => (
                            <option
                              className="w-full"
                              key={section.id}
                              value={`${section.id}/${section.title}`}
                            >
                              {section.title}
                            </option>
                          ))}
                    </select>
                  </td>
                  <td className="border text-center">{rowCounter}</td>
                  {!createMode && (
                    <td className="h-full w-full border-t flex justify-around items-center">
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowUp(row)}
                      >
                        ⬆️
                      </button>
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowDown(row)}
                      >
                        ⬇️
                      </button>
                    </td>
                  )}
                  <td className="px-2 border text-center bg-[#008000]">
                    <button
                      className="w-full h-full"
                      type="button"
                      onClick={rowSave}
                    >
                      SAVE
                    </button>
                  </td>
                  <td className="px-2 border text-center bg-[#FF0000]">
                    <button
                      className="w-full h-full bg-red"
                      type="button"
                      onClick={handleItemToCancel}
                    >
                      CANCEL
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex w-[full mt-[1em] ml-[5%]">
          <button
            className="mr-10"
            type="button"
            onClick={() => {
              setCurrentRow({});
              setSections([]);
              setRowCounter(rows.length + 1);
              setCreateMode(!createMode);
            }}
          >
            <Image src={plus} width={50} height={50} alt="logo-plus" />
          </button>
        </div>
        <div className="flex justify-around w-full">
          <input
            className="submit-btn"
            type="submit"
            onClick={() => handleItemToCreate()}
          />
        </div>
      </div>
    </div>
  );
}
